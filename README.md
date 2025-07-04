# Drug Interaction Checker

A comprehensive web application for checking drug interactions using AI-powered analysis and FDA database integration.

## 🌟 Features

### Core Functionality
- **AI-Powered Analysis**: Multiple AI providers (OpenAI, Claude, Perplexity, Gemini)
- **FDA Database Integration**: Real-time drug information from FDA API
- **Bilingual Support**: Korean and English versions
- **Mobile Responsive**: Optimized for all device sizes
- **Dark Mode Support**: Automatic theme switching

### One-Time API Key System 🆕
- **Free Access**: Generate one-time API keys for free usage
- **Daily Limits**: 5 uses per day per key
- **24-Hour Validity**: Keys expire after 24 hours
- **Secure**: Server-side validation and rate limiting
- **Easy Integration**: Automatically fills API key fields

### Security Features
- **CSRF Protection**: Built-in CSRF token validation
- **Rate Limiting**: Prevents abuse and ensures fair usage
- **Input Sanitization**: XSS protection for all user inputs
- **Secure Storage**: Encrypted local storage for sensitive data
- **API Key Masking**: Secure display of API keys

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd drug-interaction-checker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file:
   ```env
   PERPLEXITY_API_KEY=your_perplexity_api_key_here
   PORT=3000
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Access the application**
   - English version: `http://localhost:3000`
   - Korean version: `http://localhost:3000/약물상호작용검사기/`

## 📋 API Key Setup

### Option 1: One-Time API Key (Recommended for New Users)
1. Open the settings modal (⚙️ button)
2. Scroll to the "One-time API Key" section
3. Click "Generate One-time API Key"
4. The key will be automatically filled in the Perplexity field
5. You can use it for 5 interactions per day

### Option 2: Your Own API Keys
1. **OpenAI**: Get from [OpenAI Platform](https://platform.openai.com/api-keys)
2. **Claude**: Get from [Anthropic Console](https://console.anthropic.com/)
3. **Perplexity**: Get from [Perplexity Settings](https://www.perplexity.ai/settings/api)
4. **Gemini**: Get from [Google AI Studio](https://aistudio.google.com/app/apikey)

## 🔧 Configuration

### Server Configuration
The application includes a Node.js server for the one-time API key system:

```javascript
// server.js
const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:5500'],
  credentials: true
}));
```

### Security Features
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **API Key Validation**: Server-side validation for all API calls
- **Usage Tracking**: Automatic tracking of API key usage
- **Expiration Management**: Automatic cleanup of expired keys

## 🛡️ Security Implementation

### Frontend Security
```javascript
// Input sanitization
const sanitizedInput = SecurityUtils.sanitizeInput(userInput);

// CSRF protection
const csrfToken = generateCSRFToken();

// Rate limiting
if (!SecurityUtils.checkRateLimit('api_call')) {
    throw new Error('Rate limit exceeded');
}
```

### Backend Security
```javascript
// API key validation
function validateApiKey(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || !apiKeys.has(apiKey)) {
        return res.status(401).json({ error: 'Invalid API key' });
    }
    next();
}

// Usage tracking
const usage = usageTracker.get(apiKey) || 0;
if (usage >= 5) {
    return res.status(429).json({ error: 'Daily limit exceeded' });
}
```

## 📊 Usage Statistics

The application tracks various metrics:
- Daily search count
- API usage statistics
- DUR (Drug Utilization Review) checks
- Error rates and performance metrics

## 🌐 Deployment

### Production Setup
1. **Environment Variables**
   ```env
   NODE_ENV=production
   PORT=3000
   PERPLEXITY_API_KEY=your_production_key
   CORS_ORIGIN=https://your-domain.com
   ```

2. **Security Headers**
   ```javascript
   app.use(helmet({
     contentSecurityPolicy: {
       directives: {
         defaultSrc: ["'self'"],
         scriptSrc: ["'self'", "'unsafe-inline'"],
         styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
         connectSrc: ["'self'", "https://api.fda.gov", "https://api.perplexity.ai"]
       }
     }
   }));
   ```

3. **Rate Limiting**
   ```javascript
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100, // limit each IP to 100 requests per windowMs
     message: 'Too many requests from this IP'
   });
   ```

## 🔍 API Endpoints

### One-Time API Key System
- `POST /api/generate-key` - Generate new one-time API key
- `GET /api/key-status` - Check API key usage and validity
- `POST /api/check-interaction` - Check drug interactions (requires API key)

### Health Check
- `GET /api/health` - Server health status

## 📱 Mobile Optimization

The application is fully responsive with:
- Touch-friendly interface
- Optimized loading times
- Progressive Web App features
- Offline capability for basic functions

## 🎨 UI/UX Features

### Animations
- Smooth scroll animations
- Loading states with spinners
- Hover effects and transitions
- Progressive disclosure

### Accessibility
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- High contrast mode support

## 🚨 Error Handling

### Frontend Error Handling
```javascript
try {
    const result = await checkInteraction();
    displayResults(result);
} catch (error) {
    utils.showAlert(`Error: ${error.message}`, 'error');
    console.error('Interaction check failed:', error);
}
```

### Backend Error Handling
```javascript
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
});
```

## 📈 Performance Optimization

### Frontend
- Lazy loading of components
- Debounced search inputs
- Optimized images and assets
- Service worker for caching

### Backend
- Connection pooling
- Response caching
- Database query optimization
- Memory management for API keys

## 🔄 Updates and Maintenance

### Regular Tasks
- Clean up expired API keys (hourly)
- Monitor usage statistics
- Update drug database
- Security patches

### Monitoring
- Server health checks
- API response times
- Error rate monitoring
- Usage analytics

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Email: pisotlinkr@icloud.com
- GitHub Issues: [Create an issue](https://github.com/your-repo/issues)

## 🔗 Links

- **FDA Database**: https://api.fda.gov/drug/label.json
- **Korean FDA**: https://www.mfds.go.kr
- **Drug Info**: https://www.druginfo.co.kr
- **Health Insurance**: https://www.hira.or.kr

---

**⚠️ Medical Disclaimer**: This tool is for educational and informational purposes only. It does not replace professional medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals before making decisions about medication. 