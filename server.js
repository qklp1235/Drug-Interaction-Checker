const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 보안 미들웨어
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:5500', 'https://your-domain.com'],
  credentials: true
}));

// 기본 rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100, // IP당 최대 100개 요청
  message: 'Too many requests from this IP'
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// 메모리 기반 API 키 저장소 (실제 운영에서는 Redis나 DB 사용 권장)
const apiKeys = new Map();
const usageTracker = new Map();

// API 키 생성 함수
function generateApiKey() {
  return 'di_' + crypto.randomBytes(32).toString('hex');
}

// API 키 검증 미들웨어
function validateApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;
  
  if (!apiKey) {
    return res.status(401).json({ error: 'API key is required' });
  }
  
  const keyData = apiKeys.get(apiKey);
  if (!keyData) {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  
  // 사용량 확인
  const usage = usageTracker.get(apiKey) || 0;
  if (usage >= 5) {
    return res.status(429).json({ 
      error: 'Daily usage limit exceeded (5 requests per day)',
      remaining: 0
    });
  }
  
  req.apiKey = apiKey;
  req.keyData = keyData;
  next();
}

// 일회성 API 키 생성 엔드포인트
app.post('/api/generate-key', (req, res) => {
  try {
    const apiKey = generateApiKey();
    const createdAt = new Date();
    
    // API 키 정보 저장
    apiKeys.set(apiKey, {
      id: uuidv4(),
      createdAt: createdAt,
      expiresAt: new Date(createdAt.getTime() + 24 * 60 * 60 * 1000), // 24시간 후 만료
      isActive: true
    });
    
    // 사용량 추적 초기화
    usageTracker.set(apiKey, 0);
    
    res.json({
      success: true,
      apiKey: apiKey,
      expiresAt: new Date(createdAt.getTime() + 24 * 60 * 60 * 1000),
      dailyLimit: 5,
      message: 'API key generated successfully. Valid for 24 hours with 5 requests per day.'
    });
  } catch (error) {
    console.error('Error generating API key:', error);
    res.status(500).json({ error: 'Failed to generate API key' });
  }
});

// API 키 상태 확인
app.get('/api/key-status', validateApiKey, (req, res) => {
  const usage = usageTracker.get(req.apiKey) || 0;
  const keyData = req.keyData;
  
  res.json({
    apiKey: req.apiKey,
    usage: usage,
    remaining: Math.max(0, 5 - usage),
    expiresAt: keyData.expiresAt,
    isActive: keyData.isActive
  });
});

// Perplexity API 프록시 (보안 강화)
app.post('/api/check-interaction', validateApiKey, async (req, res) => {
  try {
    const { drugs } = req.body;
    
    if (!drugs || !Array.isArray(drugs) || drugs.length === 0) {
      return res.status(400).json({ error: 'Drugs array is required' });
    }
    
    // 사용량 증가
    const currentUsage = usageTracker.get(req.apiKey) || 0;
    usageTracker.set(req.apiKey, currentUsage + 1);
    
    // Perplexity API 호출
    const perplexityResponse = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [{
          role: 'user',
          content: `Check for potential drug interactions between these medications: ${drugs.join(', ')}. Provide a detailed analysis including severity levels, potential side effects, and recommendations.`
        }],
        max_tokens: 1000,
        temperature: 0.1
      })
    });
    
    if (!perplexityResponse.ok) {
      throw new Error(`Perplexity API error: ${perplexityResponse.status}`);
    }
    
    const data = await perplexityResponse.json();
    
    res.json({
      success: true,
      interaction: data.choices[0].message.content,
      usage: usageTracker.get(req.apiKey),
      remaining: Math.max(0, 5 - usageTracker.get(req.apiKey))
    });
    
  } catch (error) {
    console.error('Error checking interaction:', error);
    res.status(500).json({ error: 'Failed to check drug interaction' });
  }
});

// 만료된 API 키 정리 (매일 실행)
setInterval(() => {
  const now = new Date();
  for (const [key, data] of apiKeys.entries()) {
    if (data.expiresAt < now) {
      apiKeys.delete(key);
      usageTracker.delete(key);
    }
  }
}, 60 * 60 * 1000); // 1시간마다 실행

// 상태 확인 엔드포인트
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    activeKeys: apiKeys.size,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Key system active with ${process.env.PERPLEXITY_API_KEY ? 'Perplexity API' : 'NO API KEY'} configured`);
}); 