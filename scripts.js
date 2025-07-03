// API 설정 (한국 의약품 정보는 로컬 데이터베이스 사용)
const MFDS_API_KEY = 'XpFChqnfI9z5KAjCqKY9tQXg2kPHCXn44BkVmvZcnYLHXkGKyl/4ahto+Hfai99wBMxog5Jm0OwBG0yJLJfPgg==';

// 한국 의약품 정보 데이터베이스 (실제 운영시에는 외부 파일에서 로드)
const KOREAN_DRUG_DATABASE = {
    // 진통제/해열제/소염제
    '아스피린': {
        name: '아스피린',
        englishName: 'Aspirin',
        category: '진통제/해열제/소염제',
        manufacturer: '바이엘코리아',
        description: '해열, 진통, 소염 작용을 하는 의약품입니다.',
        indications: '두통, 치통, 생리통, 관절염, 발열 등의 증상 완화',
        warnings: '위장 출혈 위험이 있으니 주의하세요. 임신 말기에는 복용을 피하세요.',
        interactions: ['와파린', '메토트렉세이트', '리튬'],
        dosage: '성인 기준 1회 500mg, 1일 3-4회',
        sideEffects: '위장 장애, 출혈, 알레르기 반응'
    },
    '타이레놀': {
        name: '타이레놀',
        englishName: 'Acetaminophen',
        category: '진통제/해열제',
        manufacturer: '한국얀센',
        description: '해열 진통제로 널리 사용되는 안전한 의약품입니다.',
        indications: '두통, 치통, 생리통, 발열, 감기몸살',
        warnings: '간 기능 장애가 있는 경우 주의하세요. 알코올과 함께 복용하지 마세요.',
        interactions: ['와파린', '페니토인'],
        dosage: '성인 기준 1회 500-1000mg, 1일 3-4회',
        sideEffects: '간 독성 (과량 복용시), 알레르기 반응'
    },
    '이부프로펜': {
        name: '이부프로펜',
        englishName: 'Ibuprofen',
        category: '소염진통제',
        manufacturer: '부광약품',
        description: '비스테로이드성 소염진통제입니다.',
        indications: '관절염, 근육통, 두통, 생리통, 발열',
        warnings: '위장 출혈 위험, 심혈관 질환자 주의',
        interactions: ['아스피린', '와파린', 'ACE억제제'],
        dosage: '성인 기준 1회 200-400mg, 1일 3-4회',
        sideEffects: '위장 장애, 부종, 혈압 상승'
    },
    
    // 고혈압약
    '암로디핀': {
        name: '암로디핀',
        englishName: 'Amlodipine',
        category: '고혈압치료제',
        manufacturer: '화이자',
        description: '칼슘채널차단제로 혈압을 낮춥니다.',
        indications: '고혈압, 협심증',
        warnings: '급격한 혈압 하강 주의, 임산부 사용 금기',
        interactions: ['심바스타틴', '딜티아젬'],
        dosage: '성인 기준 1일 1회 5-10mg',
        sideEffects: '부종, 어지러움, 피로감'
    },
    '로사르탄': {
        name: '로사르탄',
        englishName: 'Losartan',
        category: '고혈압치료제',
        manufacturer: 'MSD',
        description: '안지오텐신 수용체 차단제입니다.',
        indications: '고혈압, 당뇨병성 신병증',
        warnings: '임신 중 금기, 신기능 장애시 주의',
        interactions: ['리튬', 'NSAIDs'],
        dosage: '성인 기준 1일 1회 50-100mg',
        sideEffects: '어지러움, 기립성 저혈압'
    },
    
    // 당뇨약
    '메트포르민': {
        name: '메트포르민',
        englishName: 'Metformin',
        category: '당뇨병치료제',
        manufacturer: '한국머크',
        description: '제2형 당뇨병의 1차 치료약물입니다.',
        indications: '제2형 당뇨병',
        warnings: '신기능 장애시 금기, 조영제 사용시 중단',
        interactions: ['요오드 조영제', '알코올'],
        dosage: '성인 기준 1일 2-3회, 식사와 함께',
        sideEffects: '위장 장애, 젖산산증 (드물게)'
    },
    
    // 소화기약
    '오메프라졸': {
        name: '오메프라졸',
        englishName: 'Omeprazole',
        category: '위산억제제',
        manufacturer: '애보트',
        description: '위산 분비를 억제하는 양성자펌프억제제입니다.',
        indications: '위궤양, 십이지장궤양, 역류성 식도염',
        warnings: '장기 복용시 비타민 B12 결핍 주의',
        interactions: ['와파린', '클로피도그렐'],
        dosage: '성인 기준 1일 1회 20mg, 아침 식전',
        sideEffects: '두통, 설사, 복통'
    },
    
    // 항생제
    '아목시실린': {
        name: '아목시실린',
        englishName: 'Amoxicillin',
        category: '항생제',
        manufacturer: '한국글락소스미스클라인',
        description: '페니실린계 항생제입니다.',
        indications: '세균 감염증',
        warnings: '페니실린 알레르기가 있는 경우 금기',
        interactions: ['와파린', '경구피임약'],
        dosage: '성인 기준 1회 250-500mg, 1일 3회',
        sideEffects: '알레르기 반응, 설사, 복통'
    },
    
    // 정신과약
    '디아제팜': {
        name: '디아제팜',
        englishName: 'Diazepam',
        category: '신경안정제',
        manufacturer: '로슈',
        description: '벤조디아제핀계 신경안정제입니다.',
        indications: '불안장애, 근육경련, 간질',
        warnings: '의존성 위험, 알코올과 병용 금기',
        interactions: ['알코올', '중추신경억제제'],
        dosage: '성인 기준 1회 2-10mg, 1일 2-4회',
        sideEffects: '졸음, 어지러움, 의존성'
    },
    
    // 심혈관약
    '와파린': {
        name: '와파린',
        englishName: 'Warfarin',
        category: '항응고제',
        manufacturer: '한국오가논',
        description: '혈액 응고를 방지하는 항응고제입니다.',
        indications: '혈전색전증 예방 및 치료',
        warnings: '출혈 위험 증가, 정기적인 혈액검사 필요',
        interactions: ['아스피린', '항생제', '비타민K'],
        dosage: '개인별 맞춤 용량 (INR 수치에 따라)',
        sideEffects: '출혈, 멍, 탈모'
    }
};

// 한국 의약품 상호작용 데이터베이스
const KOREAN_DRUG_INTERACTIONS = {
    '아스피린-와파린': {
        severity: 'major',
        description: '심각한 출혈 위험이 있습니다. 병용시 혈액응고 수치를 자주 모니터링해야 합니다.',
        recommendation: '가능하면 병용을 피하고, 불가피한 경우 의료진의 엄격한 관리하에 사용하세요.'
    },
    '타이레놀-와파린': {
        severity: 'moderate',
        description: '타이레놀이 와파린의 효과를 증강시킬 수 있습니다.',
        recommendation: '정기적인 INR 검사를 받으시고, 의사와 상담하세요.'
    },
    '이부프로펜-아스피린': {
        severity: 'moderate',
        description: '위장 출혈 위험이 증가할 수 있습니다.',
        recommendation: '병용 사용을 피하고, 필요시 의사와 상담하세요.'
    },
    '암로디핀-심바스타틴': {
        severity: 'moderate',
        description: '심바스타틴의 혈중 농도가 증가할 수 있습니다.',
        recommendation: '심바스타틴 용량 조절이 필요할 수 있습니다.'
    },
    '메트포르민-요오드조영제': {
        severity: 'major',
        description: '젖산산증의 위험이 있습니다.',
        recommendation: '조영제 검사 전후 48시간 동안 메트포르민 복용을 중단하세요.'
    },
    '오메프라졸-클로피도그렐': {
        severity: 'moderate',
        description: '클로피도그렐의 효과가 감소할 수 있습니다.',
        recommendation: '다른 위산억제제 사용을 고려하세요.'
    },
    '디아제팜-알코올': {
        severity: 'major',
        description: '중추신경계 억제 효과가 가중됩니다.',
        recommendation: '알코올 섭취를 완전히 피하세요.'
    }
};

// AI 서비스 설정
const AI_CONFIGS = {
    openai: {
        name: 'OpenAI',
        baseUrl: 'https://api.openai.com/v1/chat/completions',
        model: 'gpt-4o-mini',
        icon: '🤖'
    },
    claude: {
        name: 'Claude',
        baseUrl: 'https://api.anthropic.com/v1/messages',
        model: 'claude-3-haiku-20240307',
        icon: '🧠'
    },
    perplexity: {
        name: 'Perplexity',
        baseUrl: 'https://api.perplexity.ai/chat/completions',
        model: 'llama-3.1-sonar-small-128k-online',
        icon: '🔮'
    },
    gemini: {
        name: 'Gemini',
        baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
        model: 'gemini-1.5-flash',
        icon: '✨'
    }
};

// 보안 설정
const SECURITY_CONFIG = {
    maxInputLength: 100,
    rateLimit: {
        maxRequests: 10,
        timeWindow: 60000, // 1분
        requests: new Map()
    },
    csrfToken: generateCSRFToken(),
    allowedDomains: [
        'api.fda.gov',
        'api.openai.com',
        'api.anthropic.com', 
        'api.perplexity.ai',
        'generativelanguage.googleapis.com'
    ]
};

// 보안 유틸리티 함수들
const SecurityUtils = {
    // HTML 이스케이프 함수 (XSS 방지)
    escapeHtml(text) {
        if (typeof text !== 'string') return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    // 입력 검증 및 sanitization (한국어 지원)
    sanitizeInput(input, maxLength = SECURITY_CONFIG.maxInputLength) {
        if (typeof input !== 'string') return '';
        
        // 길이 제한
        let sanitized = input.slice(0, maxLength);
        
        // 위험한 문자 제거 (XSS 방지)
        sanitized = sanitized.replace(/[<>\"']/g, '');
        
        // SQL 인젝션 방지
        sanitized = sanitized.replace(/(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|SCRIPT)\b)/gi, '');
        
        // 허용된 문자만 유지 (영어, 숫자, 한글, 공백, 하이픈, 점, 괄호)
        // \u3131-\u318E: 한글 자모
        // \uAC00-\uD7A3: 한글 완성형
        // \u1100-\u11FF: 한글 자모 확장
        sanitized = sanitized.replace(/[^\w\s\-\.\(\)\u3131-\u318E\uAC00-\uD7A3\u1100-\u11FF]/g, '');
        
        return sanitized.trim();
    },

    // Rate Limiting 체크
    checkRateLimit(identifier = 'global') {
        const now = Date.now();
        const config = SECURITY_CONFIG.rateLimit;
        
        if (!config.requests.has(identifier)) {
            config.requests.set(identifier, []);
        }
        
        const userRequests = config.requests.get(identifier);
        
        // 시간 윈도우 밖의 요청 제거
        const validRequests = userRequests.filter(timestamp => 
            now - timestamp < config.timeWindow
        );
        
        if (validRequests.length >= config.maxRequests) {
            this.logSecurityEvent('RATE_LIMIT_EXCEEDED', { identifier, count: validRequests.length });
            return false;
        }
        
        validRequests.push(now);
        config.requests.set(identifier, validRequests);
        return true;
    },

    // CSRF 토큰 검증
    validateCSRFToken(token) {
        return token === SECURITY_CONFIG.csrfToken;
    },

    // URL 검증
    validateURL(url) {
        try {
            const urlObj = new URL(url);
            return SECURITY_CONFIG.allowedDomains.some(domain => 
                urlObj.hostname === domain || urlObj.hostname.endsWith('.' + domain)
            );
        } catch {
            return false;
        }
    },

    // API 키 마스킹 (로깅용)
    maskApiKey(key) {
        if (!key || typeof key !== 'string') return '***';
        if (key.length <= 8) return '***';
        return key.slice(0, 4) + '***' + key.slice(-4);
    },

    // 보안 이벤트 로깅
    logSecurityEvent(event, details = {}) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            event: event,
            details: details,
            userAgent: navigator.userAgent.slice(0, 100), // 제한된 정보만
            url: window.location.pathname
        };
        
        console.warn('🔒 Security Event:', logEntry);
        
        // 개발자 모드에서 콘솔에 표시
        if (typeof state !== 'undefined' && state.developerMode && typeof utils !== 'undefined' && utils.logToDevConsole) {
            utils.logToDevConsole(`🔒 Security: ${event} - ${JSON.stringify(details)}`, 'warning');
        }
    },

    // DOM 조작 보안 검사
    validateDOMOperation(element, operation) {
        if (!element || !element.nodeType) {
            this.logSecurityEvent('INVALID_DOM_OPERATION', { operation });
            return false;
        }
        
        // 스크립트 태그 삽입 방지
        if (operation === 'innerHTML' && /<script/i.test(element)) {
            this.logSecurityEvent('SCRIPT_INJECTION_ATTEMPT', { operation });
            return false;
        }
        
        return true;
    },

    // 안전한 localStorage 접근
    secureLocalStorage: {
        setItem(key, value) {
            try {
                if (typeof key !== 'string' || key.length > 50) {
                    SecurityUtils.logSecurityEvent('INVALID_STORAGE_KEY', { key: key?.slice(0, 20) });
                    return false;
                }
                
                const sanitizedValue = typeof value === 'string' ? 
                    value.slice(0, 10000) : JSON.stringify(value).slice(0, 10000);
                
                localStorage.setItem(key, sanitizedValue);
                return true;
            } catch (error) {
                SecurityUtils.logSecurityEvent('STORAGE_ERROR', { error: error.message });
                return false;
            }
        },

        getItem(key) {
            try {
                if (typeof key !== 'string') return null;
                return localStorage.getItem(key);
            } catch (error) {
                SecurityUtils.logSecurityEvent('STORAGE_READ_ERROR', { error: error.message });
                return null;
            }
        },

        removeItem(key) {
            try {
                if (typeof key !== 'string') return false;
                localStorage.removeItem(key);
                return true;
            } catch (error) {
                SecurityUtils.logSecurityEvent('STORAGE_REMOVE_ERROR', { error: error.message });
                return false;
            }
        }
    }
};

// CSRF 토큰 생성
function generateCSRFToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// 보안 초기화
function initSecurity() {
    // 콘솔 경고 메시지
    console.warn(`
    🔒 SECURITY NOTICE 🔒
    
    This application implements multiple security measures:
    - Content Security Policy (CSP)
    - XSS Protection
    - Input Sanitization
    - Rate Limiting
    - CSRF Protection
    
    보안 조치를 우회하려고 시도하지 마십시오.
    Report security issues responsibly.
    `);

    // 개발자 도구 감지 (기본적인 수준)
    let devtools = {open: false, orientation: null};
    setInterval(() => {
        if (window.outerHeight - window.innerHeight > 200 || 
            window.outerWidth - window.innerWidth > 200) {
            if (!devtools.open) {
                devtools.open = true;
                SecurityUtils.logSecurityEvent('DEVTOOLS_OPENED');
            }
        } else {
            devtools.open = false;
        }
    }, 1000);

    // 우클릭 방지 (개발자 모드가 아닐 때)
    document.addEventListener('contextmenu', (e) => {
        if (typeof state !== 'undefined' && !state.developerMode) {
            e.preventDefault();
            SecurityUtils.logSecurityEvent('CONTEXT_MENU_BLOCKED');
        }
    });

    // 키보드 단축키 보안 (F12, Ctrl+Shift+I 등)
    document.addEventListener('keydown', (e) => {
        if (typeof state !== 'undefined' && !state.developerMode) {
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) ||
                (e.ctrlKey && e.key === 'U')) {
                e.preventDefault();
                SecurityUtils.logSecurityEvent('DEVTOOLS_SHORTCUT_BLOCKED', { key: e.key });
            }
        }
    });
}

// API 키 관리 (보안 강화된 localStorage 접근)
const getAPIKey = (provider) => {
    if (!provider || typeof provider !== 'string') {
        SecurityUtils.logSecurityEvent('INVALID_API_PROVIDER', { provider });
        return null;
    }
    return SecurityUtils.secureLocalStorage.getItem(`${provider}_api_key`) || null;
};

const getSelectedProvider = () => SecurityUtils.secureLocalStorage.getItem('selected_ai_provider') || 'auto';
const getOpenAIKey = () => getAPIKey('openai'); // 하위 호환성

// 전역 상태 관리
const state = {
    currentDrug1: null,
    currentDrug2: null,
    searchTimeout: null,
    isLoading: false,
    recentSearches: JSON.parse(SecurityUtils.secureLocalStorage.getItem('recentDrugs') || '[]'),
    drugCache: new Map(),
    developerMode: SecurityUtils.secureLocalStorage.getItem('developer_mode') === 'true'
};

// 개발자 모드 설정
const DEVELOPER_CODES = ['dev_2024', 'developer', 'debug', 'dev_mode'];
let lastSearchTerm = '';

// 확장된 한국어-영문 약물명 매핑 (오타 및 다양한 표기법 포함)
const drugNameMapping = {
    // === 진통제/해열제/소염제 ===
    '아스피린': 'Aspirin',
    '타이레놀': 'Acetaminophen',
    '아세트아미노펜': 'Acetaminophen',
    '이부프로펜': 'Ibuprofen',
    '부루펜': 'Ibuprofen',
    '낙센': 'Naproxen',
    '낙센프록센': 'Naproxen',
    '디클로페낙': 'Diclofenac',
    '볼타렌': 'Diclofenac',
    '셀레콕시브': 'Celecoxib',
    '세레브렉스': 'Celecoxib',
    '멜록시캄': 'Meloxicam',
    '모빅': 'Meloxicam',
    '에토리콕시브': 'Etoricoxib',
    '아르코시아': 'Etoricoxib',
    '인도메타신': 'Indomethacin',
    '케토프로펜': 'Ketoprofen',
    '피록시캄': 'Piroxicam',
    '페닐부타존': 'Phenylbutazone',
    '트라마돌': 'Tramadol',
    '콜히친': 'Colchicine',
    
    // === 고혈압약/심혈관약 ===
    '암로디핀': 'Amlodipine',
    '노바스크': 'Amlodipine',
    '리시노프릴': 'Lisinopril',
    '로사르탄': 'Losartan',
    '코자': 'Losartan',
    '발사르탄': 'Valsartan',
    '디오반': 'Valsartan',
    '텔미사르탄': 'Telmisartan',
    '미카르디스': 'Telmisartan',
    '칸데사르탄': 'Candesartan',
    '어택크': 'Candesartan',
    '아테놀롤': 'Atenolol',
    '테놀민': 'Atenolol',
    '메토프롤롤': 'Metoprolol',
    '셀로켄': 'Metoprolol',
    '프로프라놀롤': 'Propranolol',
    '딜티아젬': 'Diltiazem',
    '헤르벤': 'Diltiazem',
    '베라파밀': 'Verapamil',
    '이소핀': 'Verapamil',
    '니페디핀': 'Nifedipine',
    '아달라트': 'Nifedipine',
    '하이드로클로로티아지드': 'Hydrochlorothiazide',
    '히드로클로로치아지드': 'Hydrochlorothiazide',
    '푸로세미드': 'Furosemide',
    '라식스': 'Furosemide',
    '스피로놀락톤': 'Spironolactone',
    '알닥톤': 'Spironolactone',
    
    // === 당뇨약 ===
    '메트포르민': 'Metformin',
    '글루코파지': 'Metformin',
    '글리메피라이드': 'Glimepiride',
    '아마릴': 'Glimepiride',
    '글리클라자이드': 'Gliclazide',
    '다이아미크롱': 'Gliclazide',
    '글리부라이드': 'Glyburide',
    '시타글립틴': 'Sitagliptin',
    '자누비아': 'Sitagliptin',
    '빌다글립틴': 'Vildagliptin',
    '갈버스': 'Vildagliptin',
    '인슐린': 'Insulin',
    '피오글리타존': 'Pioglitazone',
    '액토스': 'Pioglitazone',
    '로시글리타존': 'Rosiglitazone',
    '아반디아': 'Rosiglitazone',
    
    // === 소화기약 ===
    '오메프라졸': 'Omeprazole',
    '로섹': 'Omeprazole',
    '란소프라졸': 'Lansoprazole',
    '란스톤': 'Lansoprazole',
    '에소메프라졸': 'Esomeprazole',
    '넥시움': 'Esomeprazole',
    '판토프라졸': 'Pantoprazole',
    '판시드': 'Pantoprazole',
    '라니티딘': 'Ranitidine',
    '잔탁': 'Ranitidine',
    '파모티딘': 'Famotidine',
    '가스터': 'Famotidine',
    '시메티딘': 'Cimetidine',
    '시메박스': 'Cimetidine',
    '돔페리돈': 'Domperidone',
    '모틸리움': 'Domperidone',
    '메토클로프라미드': 'Metoclopramide',
    '프림페란': 'Metoclopramide',
    '로페라미드': 'Loperamide',
    '후나신': 'Loperamide',
    
    // === 항생제 ===
    '아목시실린': 'Amoxicillin',
    '목시실린': 'Amoxicillin',
    '암피실린': 'Ampicillin',
    '페니실린': 'Penicillin',
    '아목시클라브': 'Amoxicillin-Clavulanate',
    '아우구멘틴': 'Amoxicillin-Clavulanate',
    '세팔렉신': 'Cephalexin',
    '셉할렉신': 'Cephalexin',
    '세프트리악손': 'Ceftriaxone',
    '로세핀': 'Ceftriaxone',
    '세파졸린': 'Cefazolin',
    '시프로플록사신': 'Ciprofloxacin',
    '씨프로바이': 'Ciprofloxacin',
    '레보플록사신': 'Levofloxacin',
    '크라비트': 'Levofloxacin',
    '아지스로마이신': 'Azithromycin',
    '지스로맥': 'Azithromycin',
    '클라리스로마이신': 'Clarithromycin',
    '클래리시드': 'Clarithromycin',
    '에리스로마이신': 'Erythromycin',
    '독시사이클린': 'Doxycycline',
    '비브라마이신': 'Doxycycline',
    '테트라사이클린': 'Tetracycline',
    '반코마이신': 'Vancomycin',
    
    // === 호흡기약 ===
    '살부타몰': 'Salbutamol',
    '벤톨린': 'Salbutamol',
    '테르부탈린': 'Terbutaline',
    '브리카닐': 'Terbutaline',
    '이프라트로피움': 'Ipratropium',
    '아트로벤트': 'Ipratropium',
    '티오트로피움': 'Tiotropium',
    '스피리바': 'Tiotropium',
    '부데소니드': 'Budesonide',
    '풀미코트': 'Budesonide',
    '플루티카손': 'Fluticasone',
    '플릭소타이드': 'Fluticasone',
    '덱사메타손': 'Dexamethasone',
    '덱사메드': 'Dexamethasone',
    '프레드니솔론': 'Prednisolone',
    '솔루프레드': 'Prednisolone',
    '프레드니손': 'Prednisone',
    '몬테루카스트': 'Montelukast',
    '싱귤레어': 'Montelukast',
    '테오필린': 'Theophylline',
    '유니필': 'Theophylline',
    
    // === 정신과약/신경과약 ===
    '디아제팜': 'Diazepam',
    '발륨': 'Diazepam',
    '로라제팜': 'Lorazepam',
    '아티반': 'Lorazepam',
    '클로나제팜': 'Clonazepam',
    '리보트릴': 'Clonazepam',
    '알프라졸람': 'Alprazolam',
    '자낙스': 'Alprazolam',
    '졸피뎀': 'Zolpidem',
    '스틸녹스': 'Zolpidem',
    '조피클론': 'Zopiclone',
    '이모반': 'Zopiclone',
    '에스조피클론': 'Eszopiclone',
    '루네스타': 'Eszopiclone',
    '플루옥세틴': 'Fluoxetine',
    '프로작': 'Fluoxetine',
    '세르트랄린': 'Sertraline',
    '졸로프트': 'Sertraline',
    '파록세틴': 'Paroxetine',
    '팍실': 'Paroxetine',
    '에스시탈로프람': 'Escitalopram',
    '렉사프로': 'Escitalopram',
    '시탈로프람': 'Citalopram',
    '셀렉사': 'Citalopram',
    '리스페리돈': 'Risperidone',
    '리스달': 'Risperidone',
    '올란자핀': 'Olanzapine',
    '자이프렉사': 'Olanzapine',
    '퀘티아핀': 'Quetiapine',
    '세로쿠엘': 'Quetiapine',
    '할로페리돌': 'Haloperidol',
    '하돌': 'Haloperidol',
    '레보도파': 'Levodopa',
    '시네메트': 'Levodopa',
    '페니토인': 'Phenytoin',
    '딜란틴': 'Phenytoin',
    '카르바마제핀': 'Carbamazepine',
    '테그레톨': 'Carbamazepine',
    '발프로산': 'Valproic acid',
    '데파킨': 'Valproic acid',
    '라모트리진': 'Lamotrigine',
    '라믹탈': 'Lamotrigine',
    
    // === 심혈관약/항응고제 ===
    '와파린': 'Warfarin',
    '쿠마딘': 'Warfarin',
    '헤파린': 'Heparin',
    '클로피도그렐': 'Clopidogrel',
    '플라빅스': 'Clopidogrel',
    '아스피린': 'Aspirin',
    '아스트릭스': 'Aspirin',
    '디곡신': 'Digoxin',
    '디고신': 'Digoxin',
    '니트로글리세린': 'Nitroglycerin',
    '니트로': 'Nitroglycerin',
    '이소소르비드': 'Isosorbide',
    '이소켓': 'Isosorbide',
    
    // === 콜레스테롤약 ===
    '심바스타틴': 'Simvastatin',
    '조코': 'Simvastatin',
    '아토르바스타틴': 'Atorvastatin',
    '리피토': 'Atorvastatin',
    '로수바스타틴': 'Rosuvastatin',
    '크레스토': 'Rosuvastatin',
    '프라바스타틴': 'Pravastatin',
    '메바로친': 'Pravastatin',
    '로바스타틴': 'Lovastatin',
    '메바코': 'Lovastatin',
    '피타바스타틴': 'Pitavastatin',
    '리바로': 'Pitavastatin',
    
    // === 항알레르기약 ===
    '세티리진': 'Cetirizine',
    '지르텍': 'Cetirizine',
    '로라타딘': 'Loratadine',
    '클라리틴': 'Loratadine',
    '펙소페나딘': 'Fexofenadine',
    '알레그라': 'Fexofenadine',
    '레보세티리진': 'Levocetirizine',
    '지르텍': 'Levocetirizine',
    '데스로라타딘': 'Desloratadine',
    '에어리우스': 'Desloratadine',
    '클로르페니라민': 'Chlorpheniramine',
    '페니라민': 'Chlorpheniramine',
    
    // === 갑상선약 ===
    '레보티록신': 'Levothyroxine',
    '신지로이드': 'Levothyroxine',
    '리오티로닌': 'Liothyronine',
    '메티마졸': 'Methimazole',
    '메르카졸': 'Methimazole',
    '프로필티오우라실': 'Propylthiouracil',
    'PTU': 'Propylthiouracil',
    
    // === 기타 중요한 약물 ===
    '메토트렉세이트': 'Methotrexate',
    '리우마트렉스': 'Methotrexate',
    '프레드니솔론': 'Prednisolone',
    '솔루프레드': 'Prednisolone',
    '사이클로포스파미드': 'Cyclophosphamide',
    '엔독산': 'Cyclophosphamide',
    '리시노프릴': 'Lisinopril',
    '프린일': 'Lisinopril',
    '안지오텐신': 'Enalapril',
    '에나프릴': 'Enalapril',
    '비아그라': 'Sildenafil',
    '실데나필': 'Sildenafil',
    '시알리스': 'Tadalafil',
    '타달라필': 'Tadalafil',
    '알로퓨리놀': 'Allopurinol',
    '지로릭': 'Allopurinol',
    '콜히친': 'Colchicine',
    '콜크리스': 'Colchicine',
    
    // === 상품명/일반명 추가 매핑 ===
    '게보린': 'Acetaminophen',
    '낙센': 'Naproxen',
    '낙센이브': 'Naproxen',
    '낙센에스': 'Naproxen',
    '낙센프록센': 'Naproxen',
    '더페인': 'Ibuprofen',
    '부루펜': 'Ibuprofen',
    '애드빌': 'Ibuprofen',
    '펜잘': 'Diclofenac',
    '볼타렌': 'Diclofenac',
    '카로펜': 'Ketoprofen',
    '프로토픽': 'Tacrolimus',
    '타크로리무스': 'Tacrolimus',
    '사이클로스포린': 'Cyclosporine',
    '네오랄': 'Cyclosporine',
    
    // === 오타 및 다양한 표기법 ===
    '아스파린': 'Aspirin',
    '아세타미노펜': 'Acetaminophen',
    '아세트아미노팬': 'Acetaminophen',
    '타이레놀': 'Acetaminophen',
    '이부프로팬': 'Ibuprofen',
    '이부프로핀': 'Ibuprofen',
    '부르펜': 'Ibuprofen',
    '메트포민': 'Metformin',
    '메드포르민': 'Metformin',
    '글루코파지': 'Metformin',
    '오메프라졸': 'Omeprazole',
    '로섹': 'Omeprazole',
    '란소프라졸': 'Lansoprazole',
    '란스톤': 'Lansoprazole',
    
    // === 영문 소문자 매핑 ===
    'aspirin': 'Aspirin',
    'ibuprofen': 'Ibuprofen',
    'acetaminophen': 'Acetaminophen',
    'metformin': 'Metformin',
    'omeprazole': 'Omeprazole',
    'simvastatin': 'Simvastatin',
    'atorvastatin': 'Atorvastatin',
    'warfarin': 'Warfarin',
    'lisinopril': 'Lisinopril',
    'losartan': 'Losartan',
    'amlodipine': 'Amlodipine',
    'furosemide': 'Furosemide',
    'clopidogrel': 'Clopidogrel',
    'methotrexate': 'Methotrexate',
    'prednisolone': 'Prednisolone',
    'prednisone': 'Prednisone',
    'dexamethasone': 'Dexamethasone',
    'diazepam': 'Diazepam',
    'lorazepam': 'Lorazepam',
    'clonazepam': 'Clonazepam',
    'alprazolam': 'Alprazolam',
    'zolpidem': 'Zolpidem',
    'zopiclone': 'Zopiclone',
    'eszopiclone': 'Eszopiclone',
    'fluoxetine': 'Fluoxetine',
    'sertraline': 'Sertraline',
    'paroxetine': 'Paroxetine',
    'escitalopram': 'Escitalopram',
    'citalopram': 'Citalopram',
    'risperidone': 'Risperidone',
    'olanzapine': 'Olanzapine',
    'quetiapine': 'Quetiapine',
    'haloperidol': 'Haloperidol',
    'levodopa': 'Levodopa',
    'phenytoin': 'Phenytoin',
    'carbamazepine': 'Carbamazepine',
    'lamotrigine': 'Lamotrigine',
    'digoxin': 'Digoxin',
    'nitroglycerin': 'Nitroglycerin',
    'isosorbide': 'Isosorbide',
    'cetirizine': 'Cetirizine',
    'loratadine': 'Loratadine',
    'fexofenadine': 'Fexofenadine',
    'levothyroxine': 'Levothyroxine',
    'methimazole': 'Methimazole',
    'propylthiouracil': 'Propylthiouracil',
    'sildenafil': 'Sildenafil',
    'tadalafil': 'Tadalafil',
    'allopurinol': 'Allopurinol',
    'colchicine': 'Colchicine'
};

// Utility functions
const utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    showLoading(message = '처리 중...') {
        const overlay = document.getElementById('loadingOverlay');
        const text = document.getElementById('loadingText');
        text.textContent = message;
        overlay.classList.add('show');
        state.isLoading = true;
    },

    hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        overlay.classList.remove('show');
        state.isLoading = false;
    },

    showAlert(message, type = 'info') {
        const alert = document.getElementById('alertMessage');
        alert.className = `alert alert-${type} show`;
        alert.innerHTML = `<span>${message}</span>`;
        
        // 드래그 기능 추가
        this.addDragToAlert(alert);
        
        // 자동 사라지기 (3초 후)
        const autoHideTimeout = setTimeout(() => {
            this.hideAlert(alert);
        }, 3000);
        
        // 타임아웃을 알림에 저장 (드래그로 사라질 경우 취소하기 위해)
        alert.autoHideTimeout = autoHideTimeout;
    },

    addDragToAlert(alert) {
        let startY = 0;
        let currentY = 0;
        let isDragging = false;
        let initialTop = 80; // CSS에서 설정한 top 값

        // 마우스 및 터치 이벤트 핸들러
        const startDrag = (e) => {
            isDragging = true;
            startY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
            alert.classList.add('dragging');
            
            // 자동 숨기기 타임아웃 취소
            if (alert.autoHideTimeout) {
                clearTimeout(alert.autoHideTimeout);
            }

            e.preventDefault();
        };

        const drag = (e) => {
            if (!isDragging) return;
            
            currentY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
            const deltaY = currentY - startY;
            
            // 위쪽으로만 드래그 허용 (deltaY < 0)
            if (deltaY < 0) {
                const newTop = initialTop + deltaY;
                alert.style.top = `${Math.max(newTop, -100)}px`;
                
                // 투명도 조절 (더 위로 드래그할수록 투명해짐)
                const opacity = Math.max(1 + (deltaY / 100), 0);
                alert.style.opacity = opacity;
            }

            e.preventDefault();
        };

        const endDrag = (e) => {
            if (!isDragging) return;
            
            isDragging = false;
            alert.classList.remove('dragging');
            
            const deltaY = currentY - startY;
            
            // 50px 이상 위로 드래그했으면 사라지게 하기
            if (deltaY < -50) {
                this.hideAlert(alert);
            } else {
                // 원래 위치로 되돌리기
                alert.style.top = '';
                alert.style.opacity = '';
            }

            e.preventDefault();
        };

        // 이벤트 리스너 추가
        alert.addEventListener('mousedown', startDrag);
        alert.addEventListener('touchstart', startDrag, { passive: false });
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag, { passive: false });
        
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);
        
        // 알림이 사라질 때 이벤트 리스너 정리
        alert.addEventListener('transitionend', () => {
            if (!alert.classList.contains('show')) {
                document.removeEventListener('mousemove', drag);
                document.removeEventListener('touchmove', drag);
                document.removeEventListener('mouseup', endDrag);
                document.removeEventListener('touchend', endDrag);
            }
        });
    },

    hideAlert(alert) {
        alert.classList.add('dismissing');
        setTimeout(() => {
            alert.classList.remove('show', 'dismissing');
            alert.style.top = '';
            alert.style.opacity = '';
            
            // 자동 숨기기 타임아웃 정리
            if (alert.autoHideTimeout) {
                clearTimeout(alert.autoHideTimeout);
                alert.autoHideTimeout = null;
            }
        }, 600); // CSS transition 시간과 동일
    },

    // Body scroll management for modals
    disableBodyScroll() {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '0px'; // Prevent layout shift
    },

    enableBodyScroll() {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    },

    // 개발자 모드 관련 기능들
    checkDeveloperCode(searchTerm) {
        const term = searchTerm.trim().toLowerCase();
        if (DEVELOPER_CODES.includes(term)) {
            this.toggleDeveloperMode();
            return true;
        }
        return false;
    },

    toggleDeveloperMode() {
        state.developerMode = !state.developerMode;
        SecurityUtils.secureLocalStorage.setItem('developer_mode', state.developerMode.toString());
        
        if (state.developerMode) {
            this.showAlert('개발자 모드가 활성화되었습니다!', 'success');
            this.createDeveloperPanel();
        } else {
            this.showAlert('개발자 모드가 비활성화되었습니다', 'info');
            this.removeDeveloperPanel();
        }
        
        document.getElementById('drugSearch').value = '';
    },

    createDeveloperPanel() {
        if (document.getElementById('developerPanel')) return;
        
        const panel = document.createElement('div');
        panel.id = 'developerPanel';
        panel.className = 'developer-panel scroll-slide-right';
        panel.innerHTML = `
            <div class="dev-header">
                <h3>🔧 Developer Panel</h3>
                <button onclick="utils.toggleDeveloperMode()" class="dev-close">×</button>
            </div>
            <div class="dev-content">
                <div class="dev-section">
                    <h4>📊 System Status</h4>
                    <div class="dev-stats">
                        <div class="stat-item">
                            <span>Cache Size:</span> 
                            <span id="cacheSize">${state.drugCache.size}</span>
                        </div>
                        <div class="stat-item">
                            <span>Recent Searches:</span> 
                            <span>${state.recentSearches.length}</span>
                        </div>
                        <div class="stat-item">
                            <span>Loading State:</span> 
                            <span id="loadingState">${state.isLoading ? 'Active' : 'Idle'}</span>
                        </div>
                        <div class="stat-item">
                            <span>API Keys:</span> 
                            <span id="apiKeyCount">${this.getAvailableProviders().length}</span>
                        </div>
                    </div>
                </div>
                
                <div class="dev-section">
                    <h4>🛠️ Actions</h4>
                    <div class="dev-actions">
                        <button onclick="devTools.clearCache()" class="dev-btn">Clear Cache</button>
                        <button onclick="devTools.clearStorage()" class="dev-btn">Clear Storage</button>
                        <button onclick="devTools.exportLogs()" class="dev-btn">Export Logs</button>
                        <button onclick="devTools.testAllAPIs()" class="dev-btn">Test APIs</button>
                        <button onclick="devTools.testFDAAPI()" class="dev-btn">Test FDA API</button>
                        <button onclick="devTools.testAllDatabases()" class="dev-btn">Test Databases</button>
                        <button onclick="devTools.showDebugInfo()" class="dev-btn">Debug Info</button>
                        <button onclick="devTools.performanceTest()" class="dev-btn">Performance</button>
                    </div>
                </div>

                <div class="dev-section">
                    <h4>📝 Console</h4>
                    <div class="dev-console" id="devConsole">
                        <div class="console-line">Developer mode activated at ${new Date().toLocaleTimeString()}</div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
        
        // 패널 애니메이션 적용
        setTimeout(() => {
            panel.classList.add('scroll-visible');
        }, 50);
        
        // 실시간 업데이트
        setInterval(() => {
            if (state.developerMode) {
                document.getElementById('cacheSize').textContent = state.drugCache.size;
                document.getElementById('loadingState').textContent = state.isLoading ? 'Active' : 'Idle';
                document.getElementById('apiKeyCount').textContent = this.getAvailableProviders().length;
            }
        }, 1000);
    },

    removeDeveloperPanel() {
        const panel = document.getElementById('developerPanel');
        if (panel) {
            panel.classList.add('closing');
            
            setTimeout(() => {
                panel.remove();
            }, 400); // CSS transition 시간과 동일
        }
    },

    logToDevConsole(message, type = 'info') {
        if (!state.developerMode) return;
        
        const console = document.getElementById('devConsole');
        if (console) {
            const line = document.createElement('div');
            line.className = `console-line console-${type} scroll-fade`;
            line.innerHTML = `[${new Date().toLocaleTimeString()}] ${message}`;
            console.appendChild(line);
            
            // 새 로그 라인에 애니메이션 적용
            setTimeout(() => {
                line.classList.add('scroll-visible');
            }, 50);
            
            console.scrollTop = console.scrollHeight;
            
            // 최대 50줄만 유지
            while (console.children.length > 50) {
                console.removeChild(console.firstChild);
            }
        }
    },

    convertSearchTerm(term) {
        const lowerTerm = term.toLowerCase().trim();
        
        // 빈 문자열 체크
        if (!lowerTerm) return term;
        
        // 1. 정확한 매치 확인 (최우선)
        if (drugNameMapping[lowerTerm]) {
            return drugNameMapping[lowerTerm];
        }
        
        // 2. 대소문자 구분 없는 정확한 매치
        for (const [korean, english] of Object.entries(drugNameMapping)) {
            if (korean.toLowerCase() === lowerTerm) {
                return english;
            }
        }
        
        // 3. 부분 문자열 매치 (Korean → English)
        const partialMatches = [];
        for (const [korean, english] of Object.entries(drugNameMapping)) {
            const koreanLower = korean.toLowerCase();
            
            // 정확히 포함되는 경우
            if (koreanLower.includes(lowerTerm) || lowerTerm.includes(koreanLower)) {
                const similarity = this.calculateSimilarity(koreanLower, lowerTerm);
                partialMatches.push({ korean, english, similarity, type: 'korean' });
            }
        }
        
        // 4. 부분 문자열 매치 (English → English)
        const englishNames = [...new Set(Object.values(drugNameMapping))];
        for (const englishName of englishNames) {
            const englishLower = englishName.toLowerCase();
            
            if (englishLower.includes(lowerTerm) || lowerTerm.includes(englishLower)) {
                const similarity = this.calculateSimilarity(englishLower, lowerTerm);
                partialMatches.push({ korean: '', english: englishName, similarity, type: 'english' });
            }
        }
        
        // 5. 유사도 기반 매치 (오타 허용)
        if (partialMatches.length === 0 && lowerTerm.length >= 3) {
            for (const [korean, english] of Object.entries(drugNameMapping)) {
                const koreanSimilarity = this.calculateSimilarity(korean.toLowerCase(), lowerTerm);
                const englishSimilarity = this.calculateSimilarity(english.toLowerCase(), lowerTerm);
                
                // 유사도가 70% 이상인 경우만 포함
                if (koreanSimilarity >= 0.7) {
                    partialMatches.push({ korean, english, similarity: koreanSimilarity, type: 'korean_fuzzy' });
                }
                if (englishSimilarity >= 0.7) {
                    partialMatches.push({ korean, english, similarity: englishSimilarity, type: 'english_fuzzy' });
                }
            }
        }
        
        // 6. 단어별 매치 (띄어쓰기로 구분된 경우)
        if (partialMatches.length === 0 && lowerTerm.includes(' ')) {
            const words = lowerTerm.split(/\s+/).filter(word => word.length >= 2);
            
            for (const [korean, english] of Object.entries(drugNameMapping)) {
                const koreanLower = korean.toLowerCase();
                const englishLower = english.toLowerCase();
                
                // 모든 단어가 포함되는지 확인
                const allWordsInKorean = words.every(word => koreanLower.includes(word));
                const allWordsInEnglish = words.every(word => englishLower.includes(word));
                
                if (allWordsInKorean || allWordsInEnglish) {
                    partialMatches.push({ korean, english, similarity: 0.8, type: 'word_match' });
                }
            }
        }
        
        // 7. 결과 정렬 및 반환
        if (partialMatches.length > 0) {
            // 유사도가 높은 순으로 정렬
            partialMatches.sort((a, b) => {
                // 타입별 우선순위: korean > english > korean_fuzzy > english_fuzzy > word_match
                const typeOrder = { korean: 5, english: 4, korean_fuzzy: 3, english_fuzzy: 2, word_match: 1 };
                
                if (typeOrder[a.type] !== typeOrder[b.type]) {
                    return typeOrder[b.type] - typeOrder[a.type];
                }
                
                return b.similarity - a.similarity;
            });
            
            // 개발자 모드에서 매칭 정보 로그
            if (state.developerMode) {
                this.logToDevConsole(`약물명 변환: "${term}" → "${partialMatches[0].english}" (유사도: ${(partialMatches[0].similarity * 100).toFixed(1)}%, 타입: ${partialMatches[0].type})`, 'info');
            }
            
            return partialMatches[0].english;
        }
        
        // 8. 매치되지 않은 경우 원본 반환
        return term;
    },

    // 향상된 유사도 계산 (Jaro-Winkler 거리 사용)
    calculateSimilarity(str1, str2) {
        if (str1 === str2) return 1;
        if (str1.length === 0 || str2.length === 0) return 0;

        // Levenshtein 거리 기반 유사도 (기존 방식 개선)
        const matrix = Array(str2.length + 1).fill().map(() => Array(str1.length + 1).fill(0));
        
        for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
        for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

        for (let j = 1; j <= str2.length; j++) {
            for (let i = 1; i <= str1.length; i++) {
                const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
                matrix[j][i] = Math.min(
                    matrix[j - 1][i] + 1,     // deletion
                    matrix[j][i - 1] + 1,     // insertion
                    matrix[j - 1][i - 1] + cost  // substitution
                );
            }
        }

        const maxLen = Math.max(str1.length, str2.length);
        return (maxLen - matrix[str2.length][str1.length]) / maxLen;
    },

    // 지능적 약물명 검색 함수
    searchDrugNames(searchTerm, limit = 10) {
        const results = [];
        const lowerTerm = searchTerm.toLowerCase().trim();
        
        if (!lowerTerm || lowerTerm.length < 2) return results;
        
        // 모든 약물명 수집 (한국어 + 영어)
        const allDrugs = new Set();
        
        // 한국어 약물명 추가
        Object.keys(drugNameMapping).forEach(korean => {
            allDrugs.add(korean);
        });
        
        // 영어 약물명 추가 (중복 제거)
        Object.values(drugNameMapping).forEach(english => {
            allDrugs.add(english);
        });
        
        // 검색 및 점수 계산
        for (const drugName of allDrugs) {
            const drugLower = drugName.toLowerCase();
            let score = 0;
            let matchType = '';
            
            // 1. 정확한 매치 (최고 점수)
            if (drugLower === lowerTerm) {
                score = 100;
                matchType = 'exact';
            }
            // 2. 시작 부분 매치
            else if (drugLower.startsWith(lowerTerm)) {
                score = 90;
                matchType = 'prefix';
            }
            // 3. 포함 매치
            else if (drugLower.includes(lowerTerm)) {
                score = 80 - (drugLower.indexOf(lowerTerm) * 5); // 앞에 있을수록 높은 점수
                matchType = 'contains';
            }
            // 4. 유사도 매치 (오타 허용)
            else {
                const similarity = this.calculateSimilarity(drugLower, lowerTerm);
                if (similarity >= 0.6) {
                    score = similarity * 70; // 최대 70점
                    matchType = 'fuzzy';
                }
            }
            
            if (score > 0) {
                results.push({
                    name: drugName,
                    englishName: drugNameMapping[drugName] || drugName,
                    score: score,
                    matchType: matchType
                });
            }
        }
        
        // 점수순으로 정렬하고 상위 결과만 반환
        return results
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    },

    saveRecentSearch(term) {
        state.recentSearches = [term, ...state.recentSearches.filter(t => t !== term)].slice(0, 5);
        SecurityUtils.secureLocalStorage.setItem('recentDrugs', JSON.stringify(state.recentSearches));
        updateRecentSearches();
    },

    async translateToKorean(text) {
        // Google translation disabled - return original text
        return text;
    },

    // Flexible search query generation
    generateFlexibleQueries(searchTerm) {
        const queries = [];
        const term = searchTerm.toLowerCase().trim();
        
        // 1. Exact match (highest priority)
        queries.push(`openfda.brand_name:"${searchTerm}"+OR+openfda.generic_name:"${searchTerm}"`);
        
        // 2. Partial substring search (case-insensitive)
        if (term.length >= 3) {
            queries.push(`openfda.brand_name:${term}+OR+openfda.generic_name:${term}`);
        }
        
        // 3. Wildcard search (allow different characters before and after)
        if (term.length >= 3) {
            queries.push(`openfda.brand_name:*${term}*+OR+openfda.generic_name:*${term}*`);
        }
        
        // 4. Word-by-word search (separated by spaces)
        const words = term.split(/\s+/).filter(word => word.length >= 2);
        if (words.length > 1) {
            const wordQuery = words.map(word => 
                `openfda.brand_name:*${word}*+OR+openfda.generic_name:*${word}*`
            ).join('+AND+');
            queries.push(wordQuery);
        }
        
        // 5. Allow typos search (similar words)
        if (term.length >= 4) {
            const fuzzyTerms = this.generateFuzzyTerms(term);
            if (fuzzyTerms.length > 0) {
                const fuzzyQuery = fuzzyTerms.map(fuzzyTerm => 
                    `openfda.brand_name:${fuzzyTerm}+OR+openfda.generic_name:${fuzzyTerm}`
                ).join('+OR+');
                queries.push(fuzzyQuery);
            }
        }
        
        return queries;
    },

    // Generate fuzzy terms for typos
    generateFuzzyTerms(term) {
        const fuzzyTerms = new Set();
        
        // Common typos patterns
        const commonMistakes = {
            'ph': 'f', 'f': 'ph',
            'th': 't', 't': 'th',
            'c': 'k', 'k': 'c',
            'z': 's', 's': 'z',
            'i': 'y', 'y': 'i'
        };
        
        Object.entries(commonMistakes).forEach(([from, to]) => {
            if (term.includes(from)) {
                fuzzyTerms.add(term.replace(new RegExp(from, 'g'), to));
            }
        });
        
        return Array.from(fuzzyTerms);
    },



    // Deduplicate and sort by relevance
    deduplicateAndSort(results, searchTerm) {
        if (!results.results || results.results.length === 0) {
            return results;
        }

        const uniqueDrugs = new Map();
        const searchLower = searchTerm.toLowerCase();

        results.results.forEach(drug => {
            if (!drug.openfda) return;
            
            const brandNames = drug.openfda.brand_name || [];
            const genericNames = drug.openfda.generic_name || [];
            
            [...brandNames, ...genericNames].forEach(name => {
                const nameLower = name.toLowerCase();
                
                if (!uniqueDrugs.has(nameLower)) {
                    // Calculate relevance score
                    let relevanceScore = 0;
                    
                    // Exact match
                    if (nameLower === searchLower) {
                        relevanceScore = 100;
                    }
                    // Start character match
                    else if (nameLower.startsWith(searchLower)) {
                        relevanceScore = 90;
                    }
                    // Include relationship
                    else if (nameLower.includes(searchLower)) {
                        relevanceScore = 80;
                    }
                    // Similarity-based
                    else {
                        const similarity = this.calculateSimilarity(nameLower, searchLower);
                        relevanceScore = similarity * 70;
                    }

                    uniqueDrugs.set(nameLower, {
                        name,
                        type: brandNames.includes(name) ? 'Brand' : 'Generic',
                        manufacturer: drug.openfda.manufacturer_name?.[0] || 'No info',
                        drugData: drug,
                        relevanceScore
                    });
                }
            });
        });

        // Sort by relevance
        const sortedDrugs = Array.from(uniqueDrugs.values())
            .sort((a, b) => b.relevanceScore - a.relevanceScore)
            .slice(0, 15); // Top 15 only

        return {
            results: sortedDrugs.map(item => item.drugData)
        };
    },

    // Check available AI services
    getAvailableProviders() {
        const available = [];
        for (const [provider, config] of Object.entries(AI_CONFIGS)) {
            const apiKey = getAPIKey(provider);
            if (apiKey && apiKey !== 'your_api_key_here') {
                available.push(provider);
            }
        }
        return available;
    },

    // Select the best AI service
    selectBestProvider() {
        const selected = getSelectedProvider();
        
        if (selected !== 'auto') {
            const apiKey = getAPIKey(selected);
            if (apiKey && apiKey !== 'your_api_key_here') {
                return selected;
            }
        }
        
        // Auto-select - Priority: OpenAI > Claude > Perplexity > Gemini
        const priority = ['openai', 'claude', 'perplexity', 'gemini'];
        for (const provider of priority) {
            const apiKey = getAPIKey(provider);
            if (apiKey && apiKey !== 'your_api_key_here') {
                return provider;
            }
        }
        
        throw new Error('사용 가능한 AI API 키가 없습니다. 설정에서 API 키를 입력해주세요.');
    },

    // OpenAI API call
    async callOpenAI(messages, options = {}) {
        const apiKey = getAPIKey('openai');
        
        if (!apiKey) {
            throw new Error('OpenAI API key is not set.');
        }

        const response = await fetch(AI_CONFIGS.openai.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: options.model || AI_CONFIGS.openai.model,
                messages: messages,
                temperature: options.temperature || 0.3,
                max_tokens: options.max_tokens || 1500,
                ...options
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    },

    // Claude API call
    async callClaude(messages, options = {}) {
        const apiKey = getAPIKey('claude');
        
        if (!apiKey) {
            throw new Error('Claude API 키가 설정되지 않았습니다.');
        }

        // 시스템 메시지 분리
        const systemMessage = messages.find(m => m.role === 'system');
        const userMessages = messages.filter(m => m.role !== 'system');

        const response = await fetch(AI_CONFIGS.claude.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: options.model || AI_CONFIGS.claude.model,
                system: systemMessage?.content || '',
                messages: userMessages,
                max_tokens: options.max_tokens || 1500,
                temperature: options.temperature || 0.3
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Claude API error: ${error.error?.message || response.statusText}`);
        }

        const data = await response.json();
        return data.content[0].text;
    },

    // Perplexity API call
    async callPerplexity(messages, options = {}) {
        const apiKey = getAPIKey('perplexity');
        
        if (!apiKey) {
            throw new Error('Perplexity API key is not set.');
        }

        const response = await fetch(AI_CONFIGS.perplexity.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: options.model || AI_CONFIGS.perplexity.model,
                messages: messages,
                temperature: options.temperature || 0.3,
                max_tokens: options.max_tokens || 1500
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Perplexity API error: ${error.error?.message || response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    },

    // Gemini API call
    async callGemini(messages, options = {}) {
        const apiKey = getAPIKey('gemini');
        
        if (!apiKey) {
            throw new Error('Gemini API key is not set.');
        }

        // Gemini 형식으로 메시지 변환
        const contents = [];
        for (const message of messages) {
            if (message.role === 'system') {
                // System messages are included in the first user message
                continue;
            }
            
            const role = message.role === 'assistant' ? 'model' : 'user';
            let content = message.content;
            
            // If there is a system message, include it in the first user message
            if (role === 'user' && contents.length === 0) {
                const systemMessage = messages.find(m => m.role === 'system');
                if (systemMessage) {
                    content = `${systemMessage.content}\n\n${content}`;
                }
            }
            
            contents.push({
                role: role,
                parts: [{ text: content }]
            });
        }

        const url = `${AI_CONFIGS.gemini.baseUrl}?key=${apiKey}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: contents,
                generationConfig: {
                    temperature: options.temperature || 0.3,
                    maxOutputTokens: options.max_tokens || 1500
                }
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Gemini API error: ${error.error?.message || response.statusText}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    },

    // Combined AI call function
    async callAI(messages, options = {}) {
        const provider = this.selectBestProvider();
        const config = AI_CONFIGS[provider];
        
        console.log(`🤖 ${config.name} AI analysis in progress...`);
        
        try {
            let result;
            switch (provider) {
                case 'openai':
                    result = await this.callOpenAI(messages, options);
                    break;
                case 'claude':
                    result = await this.callClaude(messages, options);
                    break;
                case 'perplexity':
                    result = await this.callPerplexity(messages, options);
                    break;
                case 'gemini':
                    result = await this.callGemini(messages, options);
                    break;
                default:
                    throw new Error(`Unsupported AI service: ${provider}`);
            }
            
            return { result, provider: config.name };
        } catch (error) {
            console.error(`${config.name} API error:`, error);
            throw error;
        }
    },

    // MFDS API 호출 함수
    async searchMFDS(searchTerm, limit = 10) {
        try {
            // MFDS API는 CORS 정책으로 직접 호출이 제한될 수 있으므로 
            // 대체 방법으로 한국 의약품 데이터베이스 검색
            const koreanResults = this.searchKoreanDrugs(searchTerm, limit);
            
            // 실제 MFDS API 호출 (프록시 서버 필요시)
            /*
            const response = await fetch(`${API_CONFIGS.mfds.searchUrl}?drugNm=${encodeURIComponent(searchTerm)}&pageNo=1&numOfRows=${limit}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`MFDS API error: ${response.statusText}`);
            }
            
            const data = await response.json();
            return this.processMFDSResults(data);
            */
            
            return koreanResults;
        } catch (error) {
            console.warn('MFDS API 호출 실패, 로컬 한국 의약품 데이터 사용:', error);
            return this.searchKoreanDrugs(searchTerm, limit);
        }
    },

    // 한국 의약품 데이터베이스 검색
    searchKoreanDrugs(searchTerm, limit = 10) {
        const results = [];
        const searchLower = searchTerm.toLowerCase();
        
        // 한국 의약품 데이터베이스에서 검색
        for (const [koreanName, englishName] of Object.entries(drugNameMapping)) {
            const koreanLower = koreanName.toLowerCase();
            const englishLower = englishName.toLowerCase();
            
            let score = 0;
            let matchType = '';
            
            // 정확한 매치
            if (koreanLower === searchLower || englishLower === searchLower) {
                score = 100;
                matchType = 'exact';
            }
            // 시작 부분 매치
            else if (koreanLower.startsWith(searchLower) || englishLower.startsWith(searchLower)) {
                score = 90;
                matchType = 'prefix';
            }
            // 포함 매치
            else if (koreanLower.includes(searchLower) || englishLower.includes(searchLower)) {
                score = 80;
                matchType = 'contains';
            }
            
            if (score > 0) {
                results.push({
                    koreanName: koreanName,
                    englishName: englishName,
                    score: score,
                    matchType: matchType,
                    source: 'mfds',
                    openfda: {
                        brand_name: [koreanName],
                        generic_name: [englishName],
                        manufacturer_name: ['한국 제약회사'],
                        route: ['경구'],
                        substance_name: [englishName]
                    },
                    description: [`${koreanName}(${englishName})은 한국에서 승인된 의약품입니다.`],
                    _korean_info: {
                        koreanName: koreanName,
                        englishName: englishName,
                        category: '전문의약품',
                        manufacturer: '한국 제약회사',
                        description: `${koreanName}는 ${englishName}의 한국명으로, 식품의약품안전처에서 허가받은 의약품입니다.`
                    }
                });
            }
        }
        
        return {
            results: results
                .sort((a, b) => b.score - a.score)
                .slice(0, limit)
        };
    },

    // FDA API 호출 함수 (기존 기능 개선)
    async searchFDA(searchTerm, limit = 10) {
        try {
            // FDA API 호출 전 디버깅 로그
            console.log('🇺🇸 FDA API 검색 시작:', searchTerm);
            
            const queries = this.generateFlexibleQueries(searchTerm);
            let allResults = [];
            
            for (const query of queries) {
                try {
                    // FDA API URL 구성
                    const baseUrl = 'https://api.fda.gov/drug/label.json';
                    const params = new URLSearchParams({
                        search: query,
                        limit: limit.toString()
                    });
                    const url = `${baseUrl}?${params.toString()}`;
                    
                    console.log('📡 FDA API 요청 URL:', url);
                    
                    // FDA API 호출 (CORS 및 에러 처리 강화)
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        mode: 'cors', // CORS 모드 명시
                        cache: 'default'
                    });
                    
                    console.log('📡 FDA API 응답 상태:', response.status, response.statusText);
                    
                    if (response.ok) {
                        const data = await response.json();
                        console.log('✅ FDA API 응답 데이터:', data);
                        
                        if (data.results && data.results.length > 0) {
                            // FDA 결과에 소스 마킹 추가
                            const markedResults = data.results.map(result => ({
                                ...result,
                                source: 'fda',
                                _korean_info: this.findKoreanInfo(result)
                            }));
                            allResults = allResults.concat(markedResults);
                            console.log(`✅ FDA에서 ${markedResults.length}개 결과 추가`);
                        } else {
                            console.log('ℹ️ FDA API 응답에 결과 없음');
                        }
                    } else {
                        // HTTP 에러 상세 정보
                        const errorText = await response.text();
                        console.error(`❌ FDA API HTTP 에러 (${response.status}):`, errorText);
                        
                        if (response.status === 404) {
                            console.log('ℹ️ FDA API: 해당 약물 정보를 찾을 수 없음');
                        } else if (response.status === 429) {
                            console.error('⚠️ FDA API: Rate limit 초과, 잠시 후 다시 시도');
                            throw new Error('FDA API Rate limit exceeded');
                        } else if (response.status >= 500) {
                            console.error('⚠️ FDA API: 서버 오류 발생');
                            throw new Error('FDA API Server error');
                        }
                    }
                    
                    if (allResults.length >= limit) break;
                } catch (fetchError) {
                    console.error(`❌ FDA API 쿼리 실패 ("${query}"):`, fetchError);
                    
                    // CORS 에러인지 확인
                    if (fetchError.name === 'TypeError' && fetchError.message.includes('fetch')) {
                        console.error('🚫 CORS 정책으로 인한 FDA API 접근 차단 가능성');
                    }
                    
                    continue; // 다음 쿼리 시도
                }
            }
            
            console.log(`🎯 FDA API 검색 완료: 총 ${allResults.length}개 결과`);
            
            return {
                results: this.deduplicateAndSort({ results: allResults }, searchTerm).results
            };
        } catch (error) {
            console.error('💥 FDA API 호출 전체 실패:', error);
            
            // 사용자에게 친화적인 에러 메시지
            if (error.message.includes('CORS') || error.message.includes('fetch')) {
                console.warn('🔄 FDA API CORS 문제 감지, 로컬 데이터로 대체');
                // CORS 문제인 경우 로컬 데이터로 대체
                return this.searchLocalFallback(searchTerm, limit);
            }
            
            return { results: [] };
        }
    },

    // FDA API 대체 로컬 검색 (CORS 문제 시 사용)
    searchLocalFallback(searchTerm, limit = 10) {
        console.log('🔄 FDA API 대체 로컬 검색 시작:', searchTerm);
        
        // 영어 약물명 매핑에서 검색
        const results = [];
        const searchLower = searchTerm.toLowerCase();
        
        for (const [korean, english] of Object.entries(drugNameMapping)) {
            const englishLower = english.toLowerCase();
            
            if (englishLower.includes(searchLower) || searchLower.includes(englishLower)) {
                results.push({
                    openfda: {
                        brand_name: [english],
                        generic_name: [english],
                        manufacturer_name: ['International Manufacturer'],
                        route: ['Oral'],
                        substance_name: [english]
                    },
                    description: [`${english} is an internationally recognized medication. For detailed information, consult healthcare professionals.`],
                    indications_and_usage: ['Consult healthcare professionals for proper usage.'],
                    warnings: ['Consult healthcare professionals before use.'],
                    dosage_and_administration: ['Follow healthcare professional guidance.'],
                    drug_interactions: ['Check with healthcare professionals for interactions.'],
                    source: 'fda-fallback',
                    _korean_info: {
                        koreanName: korean,
                        englishName: english,
                        category: '의약품',
                        manufacturer: 'International',
                        description: `${english}는 국제적으로 인정받는 의약품입니다. 상세 정보는 의료진과 상담하세요.`
                    }
                });
            }
        }
        
        console.log(`📋 로컬 대체 검색 결과: ${results.length}개`);
        
        return {
            results: results.slice(0, limit)
        };
    },

    // 통합 검색 함수
    async searchIntegrated(searchTerm, limit = 15) {
        const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(searchTerm);
        
        try {
            // 병렬로 두 API 호출 (타임아웃 설정)
            const searchPromises = [
                Promise.race([
                    this.searchFDA(searchTerm, Math.ceil(limit / 2)),
                    new Promise((_, reject) => 
                        setTimeout(() => reject(new Error('FDA API timeout')), 5000)
                    )
                ]),
                this.searchMFDS(searchTerm, Math.ceil(limit / 2))
            ];
            
            const [fdaResults, mfdsResults] = await Promise.allSettled(searchPromises);
            
            let combinedResults = [];
            
            // FDA 결과 처리
            if (fdaResults.status === 'fulfilled' && fdaResults.value.results) {
                combinedResults = combinedResults.concat(fdaResults.value.results.map(result => ({
                    ...result,
                    source: 'fda',
                    sourceLabel: 'FDA Database'
                })));
            } else if (fdaResults.status === 'rejected') {
                console.warn('FDA API 검색 실패:', fdaResults.reason?.message);
                // FDA API 실패를 개발자 모드에서 로깅
                if (state.developerMode) {
                    utils.logToDevConsole(`⚠️ FDA API 실패: ${fdaResults.reason?.message}`, 'warning');
                }
            }
            
            // MFDS 결과 처리
            if (mfdsResults.status === 'fulfilled' && mfdsResults.value.results) {
                combinedResults = combinedResults.concat(mfdsResults.value.results.map(result => ({
                    ...result,
                    source: 'mfds',
                    sourceLabel: 'MFDS 의약품안전나라'
                })));
            }
            
            // 한국어 검색인 경우 MFDS 결과 우선, 영어 검색인 경우 FDA 결과 우선
            combinedResults.sort((a, b) => {
                if (isKorean) {
                    if (a.source === 'mfds' && b.source === 'fda') return -1;
                    if (a.source === 'fda' && b.source === 'mfds') return 1;
                } else {
                    if (a.source === 'fda' && b.source === 'mfds') return -1;
                    if (a.source === 'mfds' && b.source === 'fda') return 1;
                }
                
                // 점수로 정렬
                const scoreA = a.score || this.calculateRelevanceScore(a, searchTerm);
                const scoreB = b.score || this.calculateRelevanceScore(b, searchTerm);
                return scoreB - scoreA;
            });
            
            return {
                results: combinedResults.slice(0, limit),
                sources: {
                    fda: fdaResults.status === 'fulfilled' ? fdaResults.value.results?.length || 0 : 0,
                    mfds: mfdsResults.status === 'fulfilled' ? mfdsResults.value.results?.length || 0 : 0
                },
                apiStatus: {
                    fda: fdaResults.status === 'fulfilled' ? 'success' : 'failed',
                    fdaError: fdaResults.status === 'rejected' ? fdaResults.reason?.message : null,
                    mfds: mfdsResults.status === 'fulfilled' ? 'success' : 'failed'
                }
            };
        } catch (error) {
            console.error('통합 검색 실패:', error);
            // 폴백으로 FDA만 검색
            return await this.searchFDA(searchTerm, limit);
        }
    },

    // 한국 의약품 정보 찾기
    findKoreanInfo(fdaResult) {
        if (!fdaResult.openfda) return null;
        
        const brandNames = fdaResult.openfda.brand_name || [];
        const genericNames = fdaResult.openfda.generic_name || [];
        
        for (const name of [...brandNames, ...genericNames]) {
            const koreanName = Object.keys(drugNameMapping).find(
                korean => drugNameMapping[korean].toLowerCase() === name.toLowerCase()
            );
            
            if (koreanName) {
                return {
                    koreanName: koreanName,
                    englishName: name,
                    category: '전문의약품',
                    manufacturer: fdaResult.openfda.manufacturer_name?.[0] || 'Unknown',
                    description: `${koreanName}는 ${name}의 한국명입니다.`
                };
            }
        }
        
        return null;
    },

    // 관련성 점수 계산
    calculateRelevanceScore(result, searchTerm) {
        if (!result.openfda) return 0;
        
        const searchLower = searchTerm.toLowerCase();
        const brandNames = result.openfda.brand_name || [];
        const genericNames = result.openfda.generic_name || [];
        
        let maxScore = 0;
        
        [...brandNames, ...genericNames].forEach(name => {
            const nameLower = name.toLowerCase();
            let score = 0;
            
            if (nameLower === searchLower) score = 100;
            else if (nameLower.startsWith(searchLower)) score = 90;
            else if (nameLower.includes(searchLower)) score = 80;
            else score = this.calculateSimilarity(nameLower, searchLower) * 70;
            
            maxScore = Math.max(maxScore, score);
        });
        
        return maxScore;
    },

    // Drug interaction AI analysis
    async analyzeInteraction(drug1, drug2, interactions1, interactions2, drug1Info, drug2Info) {
        // 한국 의약품 상호작용 데이터베이스에서 기존 상호작용 확인
        const interactionKey1 = `${drug1}-${drug2}`;
        const interactionKey2 = `${drug2}-${drug1}`;
        const knownInteraction = KOREAN_DRUG_INTERACTIONS[interactionKey1] || KOREAN_DRUG_INTERACTIONS[interactionKey2];
        
        // 한국 의약품 정보 추출
        const drug1KoreanInfo = drug1Info._korean_info || {};
        const drug2KoreanInfo = drug2Info._korean_info || {};
        
        const prompt = `
당신은 한국의 임상약학 전문가입니다. 두 의약품 간의 상호작용을 분석하고 환자가 이해하기 쉽게 설명해주세요.

**의약품 정보:**
- 의약품 1: ${drug1} (${drug1KoreanInfo.englishName || ''})
- 의약품 2: ${drug2} (${drug2KoreanInfo.englishName || ''})

**한국 의약품 데이터베이스 상호작용 정보:**
${knownInteraction ? `
알려진 상호작용: ${knownInteraction.description}
심각도: ${knownInteraction.severity}
권장사항: ${knownInteraction.recommendation}
` : '특별한 상호작용 정보가 등록되지 않음'}

**개별 의약품 상호작용 주의사항:**
${interactions1 ? `${drug1} 관련: ${interactions1.substring(0, 500)}` : `${drug1}: 특별한 상호작용 정보 없음`}
${interactions2 ? `${drug2} 관련: ${interactions2.substring(0, 500)}` : `${drug2}: 특별한 상호작용 정보 없음`}

**기본 의약품 정보:**
${drug1}: ${drug1KoreanInfo.description || drug1Info.description?.[0]?.substring(0, 400) || '정보 없음'}
제조사: ${drug1KoreanInfo.manufacturer || '정보 없음'}
분류: ${drug1KoreanInfo.category || '정보 없음'}

${drug2}: ${drug2KoreanInfo.description || drug2Info.description?.[0]?.substring(0, 400) || '정보 없음'} 
제조사: ${drug2KoreanInfo.manufacturer || '정보 없음'}
분류: ${drug2KoreanInfo.category || '정보 없음'}

다음 형식으로 분석해주세요:

## 🔍 상호작용 분석 요약

### 📊 위험도 평가
[낮음/보통/높음/매우 높음] - 간단한 이유

### ⚠️ 주요 위험 요소
- 핵심 위험 요소 1-3가지 (있는 경우)

### 💊 작용 기전
- 두 약물이 어떻게 상호작용하는지 간단히 설명

### 🏥 권장사항
- 환자가 취해야 할 구체적인 조치
- 의료진 상담 필요성
- 모니터링 포인트

### 🚨 응급 징후
- 즉시 병원 방문이 필요한 증상들

한국어로 작성하고, 의학 전문용어보다는 일반인이 이해하기 쉬운 용어를 사용해주세요.
한국의 의료 환경과 실정을 고려하여 조언해주세요.
`;

        const messages = [
            {
                role: "system",
                content: "당신은 한국의 임상약학 전문가로서 정확하고 신뢰할 수 있는 의약품 상호작용 정보를 제공합니다. 환자 안전이 최우선이며, 항상 의료진과의 상담을 권장합니다. 한국의 의료 환경과 식약처 승인 의약품을 기반으로 조언합니다."
            },
            {
                role: "user",
                content: prompt
            }
        ];

        const response = await this.callAI(messages, {
            temperature: 0.1, // Lower temperature for more accurate medical information
            max_tokens: 2000
        });

        return response;
    }
};

// Drug search function (flexible search)
async function searchDrug(query = null) {
    // 보안 검증
    if (!SecurityUtils.checkRateLimit('search')) {
        utils.showAlert('요청이 너무 많습니다. 잠시 기다려주세요.', 'warning');
        return;
    }

    let searchInput = query || document.getElementById('drugSearch').value.trim();
    if (!searchInput) {
        const searchContainer = document.getElementById('searchResults');
        document.getElementById('searchResultsContent').innerHTML = '';
        searchContainer.classList.remove('show');
        return;
    }

    // 입력값 sanitization
    searchInput = SecurityUtils.sanitizeInput(searchInput, 50);
    if (!searchInput) {
                    utils.showAlert('잘못된 검색어가 입력되었습니다.', 'warning');
        SecurityUtils.logSecurityEvent('INVALID_SEARCH_INPUT', { originalInput: query });
        return;
    }

    // 개발자 코드 체크
    if (utils.checkDeveloperCode(searchInput)) {
        return; // 개발자 모드 토글 후 종료
    }

    // 보안 이벤트 로깅
    SecurityUtils.logSecurityEvent('SEARCH_PERFORMED', { 
        term: SecurityUtils.escapeHtml(searchInput),
        length: searchInput.length
    });

    // 개발자 모드 로그
    if (state.developerMode) {
        utils.logToDevConsole(`🔍 Searching for: "${SecurityUtils.escapeHtml(searchInput)}"`, 'info');
    }

    const resultsDiv = document.getElementById('searchResultsContent');
    const searchContainer = document.getElementById('searchResults');
    
    // 검색 중일 때도 검색 결과 영역 표시
    searchContainer.classList.add('show');
    resultsDiv.innerHTML = '<div class="loading-spinner" style="margin: 20px auto;"></div>';

    try {
        const searchQuery = utils.convertSearchTerm(searchInput);
        const cacheKey = `search_${searchQuery}`;
        
        // Check cache
        if (state.drugCache.has(cacheKey)) {
            displaySearchResults(state.drugCache.get(cacheKey));
            return;
        }

        // 통합 검색 실행 (FDA + MFDS)
        if (state.developerMode) {
            utils.logToDevConsole(`🔄 Converted: "${SecurityUtils.escapeHtml(searchInput)}" → "${SecurityUtils.escapeHtml(searchQuery)}"`, 'info');
            utils.logToDevConsole(`🌐 Starting integrated search (FDA + MFDS)`, 'info');
        }

        // 통합 검색 수행
        let combinedResults = await utils.searchIntegrated(searchQuery, 20);
        
        if (state.developerMode) {
            const fdaCount = combinedResults.sources?.fda || 0;
            const mfdsCount = combinedResults.sources?.mfds || 0;
            utils.logToDevConsole(`✅ Integrated search completed: FDA(${fdaCount}) + MFDS(${mfdsCount}) = ${combinedResults.results.length} total`, 'success');
        }
        
        // Save to cache
        state.drugCache.set(cacheKey, combinedResults);
        // 검색 소스 정보 추가
        const sourceInfo = combinedResults.sources ? `
            <div class="search-source-info">
                <span class="source-badge fda ${combinedResults.apiStatus?.fda === 'failed' ? 'api-failed' : ''}">
                    🇺🇸 FDA: ${combinedResults.sources.fda}개
                    ${combinedResults.apiStatus?.fda === 'failed' ? ' ⚠️' : ''}
                </span>
                <span class="source-badge mfds">🇰🇷 MFDS: ${combinedResults.sources.mfds}개</span>
                <span class="total-results">총 ${combinedResults.results.length}개 결과</span>
                ${combinedResults.apiStatus?.fdaError ? `
                    <div class="api-status-warning">
                        <small>⚠️ FDA API: ${combinedResults.apiStatus.fdaError.includes('CORS') ? 'CORS 제한으로 로컬 데이터 사용' : combinedResults.apiStatus.fdaError}</small>
                    </div>
                ` : ''}
            </div>
        ` : '';
        
        displaySearchResults(combinedResults, sourceInfo);
        
        utils.saveRecentSearch(searchInput);
        incrementSearchCount(); // 푸터 검색 카운트 증가
        
        if (state.developerMode) {
            const totalResults = combinedResults.results.length;
            utils.logToDevConsole(`🎯 Search completed: ${totalResults} total results`, 'success');
        }
    } catch (error) {
        console.error('Search error:', error);
        
        SecurityUtils.logSecurityEvent('SEARCH_ERROR', { 
            error: error.message,
            term: SecurityUtils.escapeHtml(searchInput)
        });
        
        if (state.developerMode) {
            utils.logToDevConsole(`💥 Search error: ${error.message}`, 'error');
        }
        
        // 에러가 발생해도 검색 결과 영역은 표시
        searchContainer.classList.add('show');
        resultsDiv.innerHTML = `
            <div style="text-align: center; color: var(--text-secondary); padding: 20px;">
                <p>An error occurred while searching.</p>
                <p style="font-size: 0.9em;">Try a different search term.</p>
            </div>
        `;
    }
}

// Real-time search handler
const realTimeSearchHandler = utils.debounce(async function() {
    const searchInput = document.getElementById('drugSearch').value.trim();
    if (searchInput.length < 2) {
        const searchContainer = document.getElementById('searchResults');
        document.getElementById('searchResultsContent').innerHTML = '';
        searchContainer.classList.remove('show');
        return;
    }
    await searchDrug(searchInput);
}, 300);

// Display search results (integrated FDA + MFDS results)
function displaySearchResults(data, sourceInfo = '') {
    const resultsDiv = document.getElementById('searchResultsContent');
    const searchContainer = document.getElementById('searchResults');
    const searchTerm = document.getElementById('drugSearch').value.trim().toLowerCase();
    
    // 검색 결과 영역 표시
    searchContainer.classList.add('show');
    
    if (!data.results || data.results.length === 0) {
        resultsDiv.innerHTML = `
            <div class="scroll-fade" style="text-align: center; color: var(--text-secondary); padding: 20px;">
                <p>No search results found.</p>
                <p style="font-size: 0.9em;">Try a different search term or similar words.</p>
                <div style="margin-top: 12px; font-size: 0.85em;">
                    💡 Tip: Partial search is also possible (e.g., "aspir" → "Aspirin")
                </div>
            </div>
        `;
        
        // 새로 추가된 요소에 애니메이션 적용
        setTimeout(() => {
            const fadeElements = resultsDiv.querySelectorAll('.scroll-fade');
            fadeElements.forEach(el => el.classList.add('scroll-visible'));
            
            // 빈 결과일 때도 스크롤 상태 초기화
            setInitialScrollState(searchContainer);
        }, 50);
        
        return;
    }

    const uniqueDrugs = new Map();
    data.results.forEach(drug => {
        if (!drug.openfda) return;
        
        const brandNames = drug.openfda.brand_name || [];
        const genericNames = drug.openfda.generic_name || [];
        
        [...brandNames, ...genericNames].forEach(name => {
            const nameLower = name.toLowerCase();
            
            if (!uniqueDrugs.has(nameLower)) {
                // Calculate relevance score
                let relevanceScore = 0;
                let matchType = '';
                
                if (nameLower === searchTerm) {
                    relevanceScore = 100;
                    matchType = '정확한 일치';
                } else if (nameLower.startsWith(searchTerm)) {
                    relevanceScore = 90;
                    matchType = 'Start match';
                } else if (nameLower.includes(searchTerm)) {
                    relevanceScore = 80;
                    matchType = 'Partial match';
                } else {
                    const similarity = utils.calculateSimilarity(nameLower, searchTerm);
                    relevanceScore = similarity * 70;
                    matchType = 'Similar match';
                }

                uniqueDrugs.set(nameLower, {
                    name,
                    type: brandNames.includes(name) ? 'Brand' : 'Generic',
                    manufacturer: drug.openfda.manufacturer_name?.[0] || 'No info',
                    drugData: drug,
                    relevanceScore,
                    matchType
                });
            }
        });
    });

    // Sort by relevance
    const sortedDrugs = Array.from(uniqueDrugs.values())
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, 12);

    // 소스 정보가 있으면 먼저 표시
    let htmlContent = sourceInfo ? sourceInfo : '';
    
    htmlContent += sortedDrugs.map((drug, index) => {
        const isExactMatch = drug.relevanceScore >= 90;
        const matchIcon = isExactMatch ? '🎯' : drug.relevanceScore >= 80 ? '✨' : '🔍';
        
        // 소스 배지 생성
        const sourceBadge = drug.drugData.source === 'fda' ? 
            '<span class="source-badge-small fda-badge">🇺🇸 FDA</span>' : 
            drug.drugData.source === 'mfds' ? 
            '<span class="source-badge-small mfds-badge">🇰🇷 MFDS</span>' : '';
        
        // 한국 의약품 정보가 있으면 표시
        const koreanInfo = drug.drugData._korean_info;
        const displayName = koreanInfo ? 
            `${drug.name} ${koreanInfo.englishName !== drug.name ? `(${koreanInfo.englishName})` : ''}` : 
            drug.name;
        
        return `
            <div class="drug-item scroll-hidden scroll-delay-${Math.min(index % 4 + 1, 4)} ${isExactMatch ? 'exact-match' : ''}" 
                 onclick="showDrugDetail('${drug.name}', this)" 
                 data-drug='${JSON.stringify(drug.drugData).replace(/'/g, "&apos;")}'>
                <div class="drug-item-name">
                    ${matchIcon} ${displayName}
                    ${index < 3 && drug.relevanceScore >= 80 ? '<span class="top-result">TOP</span>' : ''}
                    ${sourceBadge}
                </div>
                <div class="drug-item-info">
                    ${drug.type} · ${drug.manufacturer}
                    <span class="match-type">${drug.matchType}</span>
                </div>
            </div>
        `;
    }).join('');
    
    resultsDiv.innerHTML = htmlContent;
    
    // 새로 추가된 요소들에 애니메이션 적용
    setTimeout(() => {
        const newElements = resultsDiv.querySelectorAll('.scroll-hidden');
        newElements.forEach(el => el.classList.add('scroll-visible'));
        
        // 검색 결과 컨테이너에 스크롤 그라데이션 적용
        setTimeout(() => {
            setInitialScrollState(searchContainer);
            
            // 스크롤 이벤트 리스너가 없다면 추가
            if (!searchContainer.hasAttribute('data-scroll-listener')) {
                searchContainer.addEventListener('scroll', () => handleElementScroll(searchContainer), { passive: true });
                searchContainer.setAttribute('data-scroll-listener', 'true');
            }
            
            // 스크롤 가능 여부에 따른 그라데이션 미리보기
            if (searchContainer.scrollHeight > searchContainer.clientHeight) {
                searchContainer.classList.add('has-scroll');
                // 미리보기용 애니메이션 후 클래스 제거
                setTimeout(() => {
                    searchContainer.classList.remove('has-scroll');
                }, 3000);
            } else {
                searchContainer.classList.remove('has-scroll');
            }
        }, 100);
    }, 50);
}

// Display drug detail information
async function showDrugDetail(drugName, element = null) {
    // 보안 검증
    if (!SecurityUtils.checkRateLimit('drugDetail')) {
        utils.showAlert('요청이 너무 많습니다. 잠시 기다려주세요.', 'warning');
        return;
    }

    // 입력값 sanitization
    const sanitizedDrugName = SecurityUtils.sanitizeInput(drugName, 100);
    if (!sanitizedDrugName) {
        SecurityUtils.logSecurityEvent('INVALID_DRUG_NAME', { originalName: drugName });
                    utils.showAlert('잘못된 약물명이 입력되었습니다.', 'warning');
        return;
    }

    const modal = document.getElementById('drugDetailModal');
    const title = document.getElementById('drugDetailTitle');
    const body = document.getElementById('drugDetailBody');
    
    // DOM 조작 보안 검사
    if (!SecurityUtils.validateDOMOperation(title, 'textContent') || 
        !SecurityUtils.validateDOMOperation(body, 'innerHTML')) {
        return;
    }
    
    // Disable body scroll when modal opens
    utils.disableBodyScroll();
    
    modal.classList.add('show');
    title.textContent = SecurityUtils.escapeHtml(sanitizedDrugName);
    body.innerHTML = '<div class="loading-spinner" style="margin: 40px auto;"></div>';
    
    // 모달 콘텐츠에 스크롤 그라데이션 적용
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        setInitialScrollState(modalContent);
        
        // 스크롤 이벤트 리스너가 없다면 추가
        if (!modalContent.hasAttribute('data-scroll-listener')) {
            modalContent.addEventListener('scroll', () => handleElementScroll(modalContent), { passive: true });
            modalContent.setAttribute('data-scroll-listener', 'true');
        }
    }

    // 보안 이벤트 로깅
    SecurityUtils.logSecurityEvent('DRUG_DETAIL_VIEWED', { 
        drugName: SecurityUtils.escapeHtml(sanitizedDrugName)
    });

    try {
        let drugData;
        if (element && element.dataset.drug) {
            try {
                drugData = JSON.parse(element.dataset.drug.replace(/&apos;/g, "'"));
            } catch (parseError) {
                SecurityUtils.logSecurityEvent('INVALID_DRUG_DATA', { 
                    error: parseError.message,
                    drugName: SecurityUtils.escapeHtml(sanitizedDrugName)
                });
                throw new Error('Invalid drug data format');
            }
        } else {
            // 한국 의약품 데이터베이스에서 직접 검색
            const koreanDrug = KOREAN_DRUG_DATABASE[sanitizedDrugName];
            if (koreanDrug) {
                drugData = {
                    openfda: {
                        brand_name: [koreanDrug.name],
                        generic_name: [koreanDrug.englishName],
                        manufacturer_name: [koreanDrug.manufacturer],
                        route: [koreanDrug.category]
                    },
                    description: [koreanDrug.description],
                    indications_and_usage: [koreanDrug.indications],
                    warnings: [koreanDrug.warnings],
                    dosage_and_administration: [koreanDrug.dosage],
                    drug_interactions: [koreanDrug.interactions.join(', ')],
                    _korean_info: koreanDrug
                };
            } else {
                // 매핑 테이블에서 찾기
                for (const [korean, english] of Object.entries(drugNameMapping)) {
                    if (korean === sanitizedDrugName || english === sanitizedDrugName) {
                        const mappedDrug = KOREAN_DRUG_DATABASE[korean];
                        if (mappedDrug) {
                            drugData = {
                                openfda: {
                                    brand_name: [mappedDrug.name],
                                    generic_name: [mappedDrug.englishName],
                                    manufacturer_name: [mappedDrug.manufacturer],
                                    route: [mappedDrug.category]
                                },
                                description: [mappedDrug.description],
                                indications_and_usage: [mappedDrug.indications],
                                warnings: [mappedDrug.warnings],
                                dosage_and_administration: [mappedDrug.dosage],
                                drug_interactions: [mappedDrug.interactions.join(', ')],
                                _korean_info: mappedDrug
                            };
                        }
                        break;
                    }
                }
            }
        }

        if (!drugData) {
            body.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">약물 정보를 찾을 수 없습니다.</p>';
            return;
        }

        const sections = {
            description: drugData.description?.[0] || '',
            indications: drugData.indications_and_usage?.[0] || '',
            warnings: drugData.warnings?.[0] || '',
            dosage: drugData.dosage_and_administration?.[0] || '',
            interactions: drugData.drug_interactions?.[0] || ''
        };

        // Translation
        const translations = await Promise.all(
            Object.values(sections).map(text => text ? utils.translateToKorean(text) : '')
        );

        const translatedSections = {};
        Object.keys(sections).forEach((key, index) => {
            translatedSections[key] = translations[index];
        });

        // HTML 이스케이프 적용
        const safeContent = {
            manufacturer: SecurityUtils.escapeHtml(drugData.openfda?.manufacturer_name?.join(', ') || 'No info'),
            route: SecurityUtils.escapeHtml(drugData.openfda?.route?.join(', ') || 'No info'),
            description: SecurityUtils.escapeHtml(translatedSections.description || sections.description),
            indications: SecurityUtils.escapeHtml(translatedSections.indications || sections.indications),
            warnings: SecurityUtils.escapeHtml(translatedSections.warnings || sections.warnings),
            interactions: SecurityUtils.escapeHtml(translatedSections.interactions || sections.interactions),
            drugName: SecurityUtils.escapeHtml(sanitizedDrugName)
        };

        body.innerHTML = `
            <div class="drug-detail-section">
                <h4>Basic information</h4>
                <p><strong>Manufacturer:</strong> ${safeContent.manufacturer}</p>
                <p><strong>Form:</strong> ${safeContent.route}</p>
            </div>
            ${sections.description ? `
                <div class="drug-detail-section">
                    <h4>Description</h4>
                    <p>${safeContent.description}</p>
                </div>
            ` : ''}
            ${sections.indications ? `
                <div class="drug-detail-section">
                    <h4>Indications</h4>
                    <p>${safeContent.indications}</p>
                </div>
            ` : ''}
            ${sections.warnings ? `
                <div class="drug-detail-section">
                    <h4>Warnings</h4>
                    <p>${safeContent.warnings}</p>
                </div>
            ` : ''}
            ${sections.interactions ? `
                <div class="drug-detail-section">
                    <h4>Drug interactions</h4>
                    <p>${safeContent.interactions}</p>
                </div>
            ` : ''}
            <div style="text-align: center; margin-top: 24px;">
                <button class="btn btn-primary add-to-check-btn" onclick="addDrugToCheck('${safeContent.drugName}')" title="Add to interaction check">
                    <span class="btn-icon">➕</span>
                    <span class="btn-text">Add to interaction check</span>
                </button>
            </div>
        `;
    } catch (error) {
        console.error('상세 정보 로드 오류:', error);
        
        SecurityUtils.logSecurityEvent('DRUG_DETAIL_ERROR', { 
            error: error.message,
            drugName: SecurityUtils.escapeHtml(sanitizedDrugName)
        });
        
        body.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">정보를 불러오는 중 오류가 발생했습니다.</p>';
    }
}

// Add drug information input line to check
function addDrugToCheck(drugName) {
    const drug1 = document.getElementById('drug1');
    const drug2 = document.getElementById('drug2');
    
    // 입력값 검증
    if (!drugName || typeof drugName !== 'string') {
        utils.showAlert('올바른 약물명이 아닙니다.', 'warning');
        return;
    }
    
    const sanitizedDrugName = SecurityUtils.sanitizeInput(drugName.trim());
    if (!sanitizedDrugName) {
        utils.showAlert('올바른 약물명을 입력해주세요.', 'warning');
        return;
    }
    
    if (!drug1.value) {
        drug1.value = sanitizedDrugName;
        utils.showAlert(`${sanitizedDrugName}이(가) 첫 번째 약물로 추가되었습니다.`, 'success');
        
        // 첫 번째 약물 추가 후 자동으로 두 번째 약물 입력 필드로 포커스 이동
        setTimeout(() => {
            drug2.focus();
        }, 500);
        
    } else if (!drug2.value) {
        if (drug1.value === sanitizedDrugName) {
            utils.showAlert('이미 선택된 약물입니다. 다른 약물을 선택해주세요.', 'warning');
            return;
        }
        drug2.value = sanitizedDrugName;
        utils.showAlert(`${sanitizedDrugName}이(가) 두 번째 약물로 추가되었습니다. 이제 상호작용 검사를 진행할 수 있습니다.`, 'success');
        
        // 두 번째 약물 추가 후 잠시 기다린 다음 자동으로 상호작용 검사 제안
        setTimeout(() => {
            const shouldProceed = confirm(`${drug1.value}과(와) ${sanitizedDrugName}의 상호작용을 바로 검사하시겠습니까?`);
            if (shouldProceed) {
                checkInteraction();
            }
        }, 1000);
        
    } else {
        // 이미 두 약물이 모두 선택된 경우 - 기존 약물 중 하나 교체 옵션 제공
        const options = [
            `첫 번째 약물 (${drug1.value})을 ${sanitizedDrugName}으로 교체`,
            `두 번째 약물 (${drug2.value})을 ${sanitizedDrugName}으로 교체`,
            '취소'
        ];
        
        const choice = prompt(`이미 두 개의 약물이 선택되었습니다.\n\n1: ${options[0]}\n2: ${options[1]}\n3: ${options[2]}\n\n번호를 입력하세요 (1, 2, 3):`);
        
        if (choice === '1') {
            drug1.value = sanitizedDrugName;
            utils.showAlert(`첫 번째 약물이 ${sanitizedDrugName}으로 교체되었습니다.`, 'success');
        } else if (choice === '2') {
            drug2.value = sanitizedDrugName;
            utils.showAlert(`두 번째 약물이 ${sanitizedDrugName}으로 교체되었습니다.`, 'success');
        } else {
            utils.showAlert('약물 추가가 취소되었습니다.', 'info');
            return;
        }
    }
    
    // 디버깅 로그
    console.log('🔍 약물 추가 완료:', {
        drug1: drug1.value,
        drug2: drug2.value,
        added: sanitizedDrugName
    });
    
    closeDrugDetail();
}

// Drug selection dropdown
const drugSearchHandler = utils.debounce(async function(inputId, drugNumber) {
    const input = document.getElementById(inputId);
    const query = input.value.trim();
    const list = document.getElementById(`${inputId}List`);
    const itemsContainer = list.querySelector('.drug-items');
    
    if (query.length < 2) {
        list.classList.remove('show');
        return;
    }

    itemsContainer.innerHTML = '<div class="loading-spinner" style="margin: 20px auto;"></div>';
    list.classList.add('show');

    try {
        const searchQuery = utils.convertSearchTerm(query);
        
        // 한국 의약품 데이터베이스에서 검색
        const results = [];
        
        // 한국 의약품 데이터베이스에서 검색
        for (const [drugName, drugInfo] of Object.entries(KOREAN_DRUG_DATABASE)) {
            if (drugName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                drugInfo.englishName.toLowerCase().includes(searchQuery.toLowerCase())) {
                results.push({
                    name: drugInfo.name,
                    englishName: drugInfo.englishName,
                    manufacturer: drugInfo.manufacturer
                });
            }
        }
        
        // 한영 매핑에서 추가 검색
        for (const [korean, english] of Object.entries(drugNameMapping)) {
            if (korean.toLowerCase().includes(searchQuery.toLowerCase()) ||
                english.toLowerCase().includes(searchQuery.toLowerCase())) {
                
                // 이미 결과에 있는지 확인
                const exists = results.some(r => r.name === korean || r.englishName === english);
                if (!exists) {
                    const drugInfo = KOREAN_DRUG_DATABASE[korean];
                    if (drugInfo) {
                        results.push({
                            name: drugInfo.name,
                            englishName: drugInfo.englishName,
                            manufacturer: drugInfo.manufacturer
                        });
                    } else {
                        results.push({
                            name: korean,
                            englishName: english,
                            manufacturer: '정보 없음'
                        });
                    }
                }
            }
        }
        
        if (results.length === 0) {
            itemsContainer.innerHTML = `
                <div style="padding: 20px; text-align: center; color: var(--text-secondary);">
                    검색 결과가 없습니다.
                </div>
            `;
            return;
        }

        const uniqueDrugs = new Set();
        let html = '';

        results.slice(0, 10).forEach((drug, index) => {
            if (!uniqueDrugs.has(drug.name)) {
                uniqueDrugs.add(drug.name);
                html += `
                    <div class="drug-item scroll-hidden scroll-delay-${Math.min((index % 4) + 1, 4)}" onclick="selectDrug('${inputId}', '${drug.name}')">
                        <div class="drug-item-name">${drug.name}</div>
                        <div style="font-size: 0.8em; color: var(--text-secondary);">${drug.englishName} · ${drug.manufacturer}</div>
                    </div>
                `;
            }
        });

        itemsContainer.innerHTML = html;
        
        // 드롭다운 항목들에 애니메이션 적용
        setTimeout(() => {
            const newItems = itemsContainer.querySelectorAll('.scroll-hidden');
            newItems.forEach(item => item.classList.add('scroll-visible'));
            
            // 드롭다운 리스트에 스크롤 그라데이션 적용
            setInitialScrollState(list);
            
            // 스크롤 이벤트 리스너가 없다면 추가
            if (!list.hasAttribute('data-scroll-listener')) {
                list.addEventListener('scroll', () => handleElementScroll(list), { passive: true });
                list.setAttribute('data-scroll-listener', 'true');
            }
        }, 50);
    } catch (error) {
        console.error('Search error:', error);
        itemsContainer.innerHTML = `
            <div style="padding: 20px; text-align: center; color: var(--text-secondary);">
                검색 중 오류가 발생했습니다.
            </div>
        `;
    }
}, 300);

// Drug selection
function selectDrug(inputId, drugName) {
    try {
        const inputElement = document.getElementById(inputId);
        const listElement = document.getElementById(`${inputId}List`);
        
        if (!inputElement) {
            console.error('❌ 입력 요소를 찾을 수 없습니다:', inputId);
            utils.showAlert('시스템 오류: 입력 필드를 찾을 수 없습니다.', 'warning');
            return;
        }
        
        if (!drugName || typeof drugName !== 'string') {
            console.error('❌ 잘못된 약물명:', drugName);
            utils.showAlert('올바른 약물명이 아닙니다.', 'warning');
            return;
        }
        
        const sanitizedDrugName = SecurityUtils.sanitizeInput(drugName.trim());
        if (!sanitizedDrugName) {
            utils.showAlert('올바른 약물명을 입력해주세요.', 'warning');
            return;
        }
        
        // 입력 필드에 약물명 설정
        inputElement.value = sanitizedDrugName;
        
        // 드롭다운 리스트 숨기기
        if (listElement) {
            listElement.classList.remove('show');
        }
        
        // 성공 메시지 표시
        const fieldType = inputId === 'drug1' ? '첫 번째' : '두 번째';
        utils.showAlert(`${sanitizedDrugName}이(가) ${fieldType} 약물로 선택되었습니다.`, 'success');
        
        // 첫 번째 약물 선택 후 두 번째 약물 입력으로 자동 포커스
        if (inputId === 'drug1') {
            const drug2Element = document.getElementById('drug2');
            if (drug2Element && !drug2Element.value) {
                setTimeout(() => {
                    drug2Element.focus();
                }, 500);
            }
        }
        
        // 두 번째 약물 선택 완료 시 상호작용 검사 제안
        if (inputId === 'drug2') {
            const drug1Element = document.getElementById('drug1');
            if (drug1Element && drug1Element.value) {
                setTimeout(() => {
                    const shouldProceed = confirm(`${drug1Element.value}과(와) ${sanitizedDrugName}의 상호작용을 바로 검사하시겠습니까?`);
                    if (shouldProceed) {
                        checkInteraction();
                    }
                }, 800);
            }
        }
        
        console.log('✅ 약물 선택 완료:', {
            inputId: inputId,
            selectedDrug: sanitizedDrugName,
            fieldType: fieldType
        });
        
    } catch (error) {
        console.error('❌ selectDrug 오류:', error);
        utils.showAlert('약물 선택 중 오류가 발생했습니다.', 'warning');
    }
}

// Check interaction
async function checkInteraction() {
    console.log('🔍 상호작용 검사 시작');
    
    const drug1Element = document.getElementById('drug1');
    const drug2Element = document.getElementById('drug2');
    
    if (!drug1Element || !drug2Element) {
        console.error('❌ 약물 입력 요소를 찾을 수 없습니다');
        utils.showAlert('시스템 오류: 약물 입력 필드를 찾을 수 없습니다.', 'warning');
        return;
    }
    
    const drug1 = SecurityUtils.sanitizeInput(drug1Element.value.trim());
    const drug2 = SecurityUtils.sanitizeInput(drug2Element.value.trim());
    
    console.log('🔍 입력된 약물 정보:', {
        drug1: drug1,
        drug2: drug2,
        drug1Raw: drug1Element.value,
        drug2Raw: drug2Element.value
    });
    
    if (!drug1 && !drug2) {
        utils.showAlert('두 약물을 모두 입력해주세요.\n\n💡 약물을 검색해서 선택하거나 직접 입력하세요.', 'warning');
        // 첫 번째 입력 필드로 포커스 이동
        drug1Element.focus();
        return;
    }
    
    if (!drug1) {
        utils.showAlert('첫 번째 약물을 입력해주세요.', 'warning');
        drug1Element.focus();
        return;
    }
    
    if (!drug2) {
        utils.showAlert('두 번째 약물을 입력해주세요.', 'warning');
        drug2Element.focus();
        return;
    }

    if (drug1 === drug2) {
        utils.showAlert('서로 다른 약물을 선택해주세요.\n\n현재 동일한 약물이 선택되어 있습니다.', 'warning');
        drug2Element.focus();
        drug2Element.select();
        return;
    }

    utils.showLoading('약물 상호작용을 검사하고 있습니다...');
    const resultSection = document.getElementById('resultSection');
    const resultDiv = document.getElementById('result');

    try {
        // 한국 의약품 데이터베이스에서 정보 가져오기
        let drug1Info = null;
        let drug2Info = null;
        
        // 약물 검색 헬퍼 함수 (유연한 검색)
        function findDrugInfo(drugName) {
            if (!drugName) return null;
            
            const searchName = drugName.trim();
            let drugInfo = null;
            let foundDrug = null;
            
            // 1. 정확한 매칭 (한국 의약품 데이터베이스)
            foundDrug = KOREAN_DRUG_DATABASE[searchName];
            if (foundDrug) {
                drugInfo = createDrugInfo(foundDrug);
                console.log(`✅ 정확한 매칭: ${searchName} → ${foundDrug.name}`);
                return drugInfo;
            }
            
            // 2. 대소문자 무시 매칭
            for (const [key, value] of Object.entries(KOREAN_DRUG_DATABASE)) {
                if (key.toLowerCase() === searchName.toLowerCase()) {
                    drugInfo = createDrugInfo(value);
                    console.log(`✅ 대소문자 무시 매칭: ${searchName} → ${value.name}`);
                    return drugInfo;
                }
            }
            
            // 3. 영문명으로 검색
            for (const [key, value] of Object.entries(KOREAN_DRUG_DATABASE)) {
                if (value.englishName && value.englishName.toLowerCase() === searchName.toLowerCase()) {
                    drugInfo = createDrugInfo(value);
                    console.log(`✅ 영문명 매칭: ${searchName} → ${value.name}`);
                    return drugInfo;
                }
            }
            
            // 4. 매핑 테이블에서 검색 (정확한 매칭)
            for (const [korean, english] of Object.entries(drugNameMapping)) {
                if (korean === searchName || english === searchName) {
                    const mappedDrug = KOREAN_DRUG_DATABASE[korean];
                    if (mappedDrug) {
                        drugInfo = createDrugInfo(mappedDrug);
                        console.log(`✅ 매핑 테이블 정확 매칭: ${searchName} → ${mappedDrug.name}`);
                        return drugInfo;
                    }
                }
            }
            
            // 5. 매핑 테이블에서 검색 (대소문자 무시)
            for (const [korean, english] of Object.entries(drugNameMapping)) {
                if (korean.toLowerCase() === searchName.toLowerCase() || 
                    english.toLowerCase() === searchName.toLowerCase()) {
                    const mappedDrug = KOREAN_DRUG_DATABASE[korean];
                    if (mappedDrug) {
                        drugInfo = createDrugInfo(mappedDrug);
                        console.log(`✅ 매핑 테이블 대소문자 무시 매칭: ${searchName} → ${mappedDrug.name}`);
                        return drugInfo;
                    }
                }
            }
            
            // 6. 부분 일치 검색 (한국명)
            for (const [key, value] of Object.entries(KOREAN_DRUG_DATABASE)) {
                if (key.includes(searchName) || searchName.includes(key)) {
                    drugInfo = createDrugInfo(value);
                    console.log(`✅ 부분 일치 매칭: ${searchName} → ${value.name}`);
                    return drugInfo;
                }
            }
            
            console.log(`❌ 약물을 찾을 수 없음: ${searchName}`);
            return null;
        }
        
        // 약물 정보 객체 생성 헬퍼
        function createDrugInfo(drugData) {
            return {
                openfda: {
                    brand_name: [drugData.name],
                    generic_name: [drugData.englishName],
                    manufacturer_name: [drugData.manufacturer]
                },
                drug_interactions: [drugData.interactions.join(', ')],
                description: [drugData.description],
                _korean_info: drugData
            };
        }
        
        // Drug 1, 2 정보 검색
        console.log(`🔍 약물 검색 시작: "${drug1}" vs "${drug2}"`);
        drug1Info = findDrugInfo(drug1);
        drug2Info = findDrugInfo(drug2);

        // 약물 정보를 찾지 못한 경우 더 자세한 에러 메시지 제공
        if (!drug1Info || !drug2Info) {
            const missingDrugs = [];
            if (!drug1Info) missingDrugs.push(drug1);
            if (!drug2Info) missingDrugs.push(drug2);
            
            // 사용 가능한 약물 목록 생성
            const availableDrugs = Object.keys(KOREAN_DRUG_DATABASE).slice(0, 5);
            const availableDrugsText = availableDrugs.join(', ');
            
            console.error('❌ 약물 정보 검색 실패:', {
                missing: missingDrugs,
                drug1: drug1,
                drug2: drug2,
                available: availableDrugs
            });
            
            throw new Error(`다음 약물의 정보를 찾을 수 없습니다: ${missingDrugs.join(', ')}\n\n사용 가능한 약물 예시: ${availableDrugsText}`);
        }

        // 한국 의약품 상호작용 데이터베이스에서 상호작용 확인
        const interactionKey1 = `${drug1}-${drug2}`;
        const interactionKey2 = `${drug2}-${drug1}`;
        const knownInteraction = KOREAN_DRUG_INTERACTIONS[interactionKey1] || KOREAN_DRUG_INTERACTIONS[interactionKey2];
        
        // 개별 약물의 상호작용 정보
        const interactions1 = drug1Info.drug_interactions?.[0] || '';
        const interactions2 = drug2Info.drug_interactions?.[0] || '';
        
        // 상호작용 여부 확인
        const hasInteraction = 
            knownInteraction ||
            interactions1.toLowerCase().includes(drug2.toLowerCase()) ||
            interactions2.toLowerCase().includes(drug1.toLowerCase()) ||
            (drug1Info._korean_info && drug1Info._korean_info.interactions.some(inter => 
                inter.toLowerCase().includes(drug2.toLowerCase())
            )) ||
            (drug2Info._korean_info && drug2Info._korean_info.interactions.some(inter => 
                inter.toLowerCase().includes(drug1.toLowerCase())
            ));

        // Display result
        resultSection.style.display = 'block';
        resultSection.classList.remove('scroll-visible'); // 애니메이션 리셋
        
        // Try AI analysis
        let aiAnalysis = null;
        let aiProvider = null;
        try {
            const availableProviders = utils.getAvailableProviders();
            if (availableProviders.length > 0) {
                const selectedProvider = utils.selectBestProvider();
                const config = AI_CONFIGS[selectedProvider];
                
                resultDiv.innerHTML = `
                    <div class="result-card scroll-fade">
                        <div class="result-header">
                            <span class="result-icon">${config.icon}</span>
                            <h3 class="result-title">${config.name} AI가 상호작용을 분석하고 있습니다...</h3>
                        </div>
                        <div class="loading-spinner" style="margin: 20px auto;"></div>
                    </div>
                `;
                
                // 로딩 카드 애니메이션 적용
                setTimeout(() => {
                    const loadingCard = resultDiv.querySelector('.scroll-fade');
                    if (loadingCard) loadingCard.classList.add('scroll-visible');
                }, 50);
                
                const response = await utils.analyzeInteraction(drug1, drug2, interactions1, interactions2, drug1Info, drug2Info);
                aiAnalysis = response.result;
                aiProvider = response.provider;
            }
        } catch (error) {
            console.error('AI analysis error:', error);
            aiAnalysis = null;
            aiProvider = null;
        }
        
        if (hasInteraction || (interactions1 || interactions2)) {
            // Translation
            const [trans1, trans2] = await Promise.all([
                interactions1 ? utils.translateToKorean(interactions1) : '',
                interactions2 ? utils.translateToKorean(interactions2) : ''
            ]);

            resultDiv.innerHTML = `
                <div class="result-card result-warning scroll-scale">
                    <div class="result-header">
                        <span class="result-icon">⚠️</span>
                        <h3 class="result-title">주의가 필요합니다</h3>
                    </div>
                    <div class="result-content">
                        ${aiAnalysis ? `
                            <div class="ai-analysis scroll-slide-left scroll-delay-1">
                                <div class="ai-analysis-header">
                                    <span class="ai-icon">🤖</span>
                                    <h4>${aiProvider} AI 전문가 분석</h4>
                                </div>
                                <div class="ai-analysis-content">
                                    ${aiAnalysis.replace(/\n/g, '<br>')}
                                </div>
                            </div>
                        ` : ''}
                        
                        ${(interactions1 || interactions2) ? `
                            <div class="fda-toggle-section scroll-slide-right scroll-delay-2">
                                <button class="fda-toggle-btn" onclick="toggleFDAData(this)">
                                    <span class="toggle-icon">📋</span>
                                    <span class="toggle-text">한국 의약품 정보 보기</span>
                                    <span class="toggle-arrow">▼</span>
                                </button>
                                <div class="fda-data-container" style="display: none;">
                                    <div class="fda-data">
                                        <p><strong>${drug1}</strong>과 <strong>${drug2}</strong> 조합:</p>
                                        ${interactions1 ? `
                                            <h5>${drug1} 관련 상호작용</h5>
                                            <p>${trans1 || interactions1}</p>
                                        ` : ''}
                                        ${interactions2 ? `
                                            <h5>${drug2} 관련 상호작용</h5>
                                            <p>${trans2 || interactions2}</p>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                        ` : ''}
                        
                        <div class="scroll-fade scroll-delay-3" style="margin-top: 20px; padding: 16px; background: rgba(0,0,0,0.05); border-radius: 8px;">
                            <p style="margin: 0; font-size: 0.9em;">
                                ⚠️ 이 정보는 참고용입니다. 복용 전 의사나 약사와 상담하시기 바랍니다.
                            </p>
                        </div>
                    </div>
                </div>
            `;
        } else {
            resultDiv.innerHTML = `
                <div class="result-card result-safe scroll-scale">
                    <div class="result-header">
                        <span class="result-icon">✅</span>
                        <h3 class="result-title">비교적 안전한 조합입니다</h3>
                    </div>
                    <div class="result-content">
                        ${aiAnalysis ? `
                            <div class="ai-analysis scroll-slide-left scroll-delay-1">
                                <div class="ai-analysis-header">
                                    <span class="ai-icon">🤖</span>
                                    <h4>${aiProvider} AI 전문가 분석</h4>
                                </div>
                                <div class="ai-analysis-content">
                                    ${aiAnalysis.replace(/\n/g, '<br>')}
                                </div>
                            </div>
                        ` : ''}
                        
                        <div class="fda-toggle-section scroll-slide-right scroll-delay-2">
                            <button class="fda-toggle-btn" onclick="toggleFDAData(this)">
                                <span class="toggle-icon">📋</span>
                                <span class="toggle-text">기본 의약품 정보 보기</span>
                                <span class="toggle-arrow">▼</span>
                            </button>
                            <div class="fda-data-container" style="display: none;">
                                <div class="basic-info">
                                    <p><strong>${drug1}</strong>과 <strong>${drug2}</strong> 조합: 한국 의약품 데이터에서 주요 상호작용이 발견되지 않았습니다.</p>
                                    <p style="margin-top: 16px;">다만 개인의 건강 상태, 복용량, 다른 약물과의 조합에 따라 달라질 수 있으므로 복용 전 의료진과 상담하시는 것을 권장합니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // 결과 섹션 자체 애니메이션 적용
        setTimeout(() => {
            resultSection.classList.add('scroll-visible');
            // 내부 요소들 애니메이션 적용
            const animateElements = resultDiv.querySelectorAll('.scroll-scale, .scroll-slide-left, .scroll-slide-right, .scroll-fade');
            animateElements.forEach(el => el.classList.add('scroll-visible'));
            
            // 결과 섹션에 스크롤 그라데이션 적용
            setInitialScrollState(resultSection);
            
            // 스크롤 이벤트 리스너가 없다면 추가
            if (!resultSection.hasAttribute('data-scroll-listener')) {
                resultSection.addEventListener('scroll', () => handleElementScroll(resultSection), { passive: true });
                resultSection.setAttribute('data-scroll-listener', 'true');
            }
        }, 100);

        // Smooth scroll
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
    } catch (error) {
        console.error('Interaction check error:', error);
        resultSection.style.display = 'block';
        
        // 에러 메시지를 HTML에서 안전하게 표시
        const errorMessage = error.message || '알 수 없는 오류가 발생했습니다.';
        const formattedMessage = errorMessage.replace(/\n/g, '<br>');
        
        resultDiv.innerHTML = `
            <div class="result-card result-warning scroll-scale">
                <div class="result-header">
                    <span class="result-icon">⚠️</span>
                    <h3 class="result-title">약물 정보를 찾을 수 없습니다</h3>
                </div>
                <div class="result-content scroll-fade scroll-delay-1">
                    <div style="background: rgba(255,193,7,0.1); padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                        <p style="margin: 0; color: #856404;">${formattedMessage}</p>
                    </div>
                    
                    <h4 style="color: var(--primary); margin: 16px 0 8px;">💡 해결 방법</h4>
                    <ul style="margin: 0; padding-left: 20px;">
                        <li>약물명의 철자를 확인해주세요</li>
                        <li>한글명 또는 영문명으로 입력해보세요</li>
                        <li>아래 예시 약물을 참고해주세요</li>
                    </ul>
                    
                    <div style="margin-top: 16px; padding: 12px; background: rgba(0,123,255,0.1); border-radius: 8px;">
                        <p style="margin: 0; font-size: 0.9em; color: #0056b3;">
                            <strong>💊 현재 지원되는 주요 약물:</strong><br>
                            아스피린, 타이레놀, 이부프로펜, 암로디핀, 로사르탄, 메트포르민, 오메프라졸, 와파린 등
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        // 에러 카드 애니메이션 적용
        setTimeout(() => {
            resultSection.classList.add('scroll-visible');
            const animateElements = resultDiv.querySelectorAll('.scroll-scale, .scroll-fade');
            animateElements.forEach(el => el.classList.add('scroll-visible'));
            
            // 결과 섹션에 스크롤 그라데이션 적용
            setInitialScrollState(resultSection);
            
            // 스크롤 이벤트 리스너가 없다면 추가
            if (!resultSection.hasAttribute('data-scroll-listener')) {
                resultSection.addEventListener('scroll', () => handleElementScroll(resultSection), { passive: true });
                resultSection.setAttribute('data-scroll-listener', 'true');
            }
        }, 100);
    } finally {
        utils.hideLoading();
    }
}

// Update recent searches
function updateRecentSearches() {
    const list = document.getElementById('recentSearchesList');
    list.innerHTML = state.recentSearches.map((term, index) => `
        <span class="tag scroll-hidden scroll-delay-${Math.min(index % 4 + 1, 4)}" onclick="useRecentSearch('${term}')">${term}</span>
    `).join('');
    
    // 새로 추가된 태그들에 애니메이션 적용
    setTimeout(() => {
        const newTags = list.querySelectorAll('.scroll-hidden');
        newTags.forEach(tag => tag.classList.add('scroll-visible'));
    }, 50);
}

// Use recent search
function useRecentSearch(term) {
    const searchInput = document.getElementById('drugSearch');
    searchInput.value = term;
    // Trigger input event to run real-time search
    searchInput.dispatchEvent(new Event('input'));
}

// Use example drug
function useExampleDrug(drugName) {
    const searchInput = document.getElementById('drugSearch');
    searchInput.value = drugName;
    // Trigger input event to run real-time search
    searchInput.dispatchEvent(new Event('input'));
}

// Toggle FDA data display
function toggleFDAData(button) {
    const container = button.nextElementSibling;
    const arrow = button.querySelector('.toggle-arrow');
    const text = button.querySelector('.toggle-text');
    
    if (container.style.display === 'none') {
        container.style.display = 'block';
        arrow.textContent = '▲';
        text.textContent = text.textContent.replace('보기', '숨기기');
        button.classList.add('expanded');
    } else {
        container.style.display = 'none';
        arrow.textContent = '▼';
        text.textContent = text.textContent.replace('숨기기', '보기');
        button.classList.remove('expanded');
    }
}

// Close modal
function closeDrugDetail() {
    const modal = document.getElementById('drugDetailModal');
    modal.classList.add('closing');
    
    setTimeout(() => {
        modal.classList.remove('show', 'closing');
        // Restore body scroll when modal closes
        utils.enableBodyScroll();
    }, 400); // CSS transition 시간과 동일
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Open settings modal
function openSettings() {
    const modal = document.getElementById('settingsModal');
    
    // Disable body scroll when modal opens
    utils.disableBodyScroll();
    
    // Load existing settings
    document.getElementById('aiProvider').value = getSelectedProvider();
    
    // Load API keys for each AI service
    Object.keys(AI_CONFIGS).forEach(provider => {
        const input = document.getElementById(`${provider}ApiKey`);
        const currentKey = getAPIKey(provider);
        if (currentKey && input) {
            input.value = currentKey;
        }
    });
    
    // Update API status
    updateAPIStatus();
    
    modal.classList.add('show');
    
    // 설정 모달 바디에 스크롤 그라데이션 적용
    setTimeout(() => {
        const settingsBody = modal.querySelector('.settings-body');
        if (settingsBody) {
            setInitialScrollState(settingsBody);
            
            // 스크롤 이벤트 리스너가 없다면 추가
            if (!settingsBody.hasAttribute('data-scroll-listener')) {
                settingsBody.addEventListener('scroll', () => handleElementScroll(settingsBody), { passive: true });
                settingsBody.setAttribute('data-scroll-listener', 'true');
            }
        }
    }, 100);
}

// Close settings modal
function closeSettings() {
    const modal = document.getElementById('settingsModal');
    modal.classList.add('closing');
    
    setTimeout(() => {
        modal.classList.remove('show', 'closing');
        // Restore body scroll when modal closes
        utils.enableBodyScroll();
    }, 400); // CSS transition 시간과 동일
}

// Save settings
function saveSettings() {
    // 보안 검증 - Rate limiting
    if (!SecurityUtils.checkRateLimit('saveSettings')) {
        utils.showAlert('설정 저장 요청이 너무 많습니다. 잠시 기다려주세요.', 'warning');
        return;
    }

    // CSRF 토큰 검증 (간소화된 버전)
    const formToken = SECURITY_CONFIG.csrfToken;
    if (!SecurityUtils.validateCSRFToken(formToken)) {
        SecurityUtils.logSecurityEvent('INVALID_CSRF_TOKEN', { action: 'saveSettings' });
        utils.showAlert('보안 검증에 실패했습니다. 페이지를 새로고침해주세요.', 'warning');
        return;
    }

    const aiProvider = document.getElementById('aiProvider').value;
    let savedCount = 0;
    let errors = [];
    
    // 입력값 검증
    const sanitizedProvider = SecurityUtils.sanitizeInput(aiProvider, 20);
    if (!sanitizedProvider || !AI_CONFIGS[sanitizedProvider]) {
        SecurityUtils.logSecurityEvent('INVALID_AI_PROVIDER', { provider: aiProvider });
        utils.showAlert('올바르지 않은 AI 제공업체가 선택되었습니다.', 'warning');
        return;
    }

    // 보안 이벤트 로깅
    SecurityUtils.logSecurityEvent('SETTINGS_SAVE_ATTEMPT', { 
        provider: sanitizedProvider 
    });
    
    // Save selected AI service (보안 강화된 저장)
    if (!SecurityUtils.secureLocalStorage.setItem('selected_ai_provider', sanitizedProvider)) {
                    utils.showAlert('AI 제공업체 선택 저장에 실패했습니다.', 'warning');
        return;
    }
    
    // Save API keys for each AI service
    Object.keys(AI_CONFIGS).forEach(provider => {
        const input = document.getElementById(`${provider}ApiKey`);
        if (input) {
            let apiKey = input.value.trim();
            
            if (apiKey) {
                // 입력값 sanitization (API 키는 특별 처리)
                apiKey = apiKey.replace(/[^a-zA-Z0-9\-_]/g, '');
                
                if (apiKey.length < 10) {
                    errors.push(`${AI_CONFIGS[provider].name}: API key too short`);
                    SecurityUtils.logSecurityEvent('INVALID_API_KEY_LENGTH', { 
                        provider: provider,
                        length: apiKey.length 
                    });
                    return;
                }
                
                // Validate API key format
                const isValid = validateAPIKey(provider, apiKey);
                if (isValid) {
                    // 보안 강화된 저장
                    if (SecurityUtils.secureLocalStorage.setItem(`${provider}_api_key`, apiKey)) {
                        savedCount++;
                        
                        // 성공적인 API 키 저장 로깅 (마스킹된 키만 로그)
                        SecurityUtils.logSecurityEvent('API_KEY_SAVED', { 
                            provider: provider,
                            keyMask: SecurityUtils.maskApiKey(apiKey)
                        });
                        
                        // 메모리에서 민감한 데이터 제거
                        input.value = '***SAVED***';
                        setTimeout(() => {
                            if (input.value === '***SAVED***') {
                                input.value = '';
                            }
                        }, 2000);
                    } else {
                        errors.push(`${AI_CONFIGS[provider].name}: Failed to save API key`);
                    }
                } else {
                    errors.push(`${AI_CONFIGS[provider].name}: Invalid API key format`);
                    SecurityUtils.logSecurityEvent('INVALID_API_KEY_FORMAT', { 
                        provider: provider,
                        keyMask: SecurityUtils.maskApiKey(apiKey)
                    });
                }
            } else {
                // Remove existing key if empty (보안 강화된 제거)
                if (SecurityUtils.secureLocalStorage.removeItem(`${provider}_api_key`)) {
                    SecurityUtils.logSecurityEvent('API_KEY_REMOVED', { provider: provider });
                }
            }
        }
    });
    
    // Update API status
    updateAPIStatus();
    
    // 결과 알림 및 로깅
    if (errors.length > 0) {
        const errorMessage = `Some API keys have issues: ${errors.join(', ')}`;
        SecurityUtils.logSecurityEvent('SETTINGS_SAVE_ERRORS', { 
            errors: errors,
            savedCount: savedCount
        });
        utils.showAlert(errorMessage, 'warning');
    } else if (savedCount > 0) {
        SecurityUtils.logSecurityEvent('SETTINGS_SAVE_SUCCESS', { 
            savedCount: savedCount,
            provider: sanitizedProvider
        });
        utils.showAlert(`${savedCount}개의 API 키가 저장되었습니다! AI 분석 기능을 사용할 수 있습니다.`, 'success');
        closeSettings();
    } else {
        SecurityUtils.logSecurityEvent('SETTINGS_SAVE_NO_KEYS', {});
        utils.showAlert('API 키가 저장되지 않았습니다. AI 분석을 사용하려면 최소 하나의 API 키를 입력해주세요.', 'info');
    }
}

// Validate API key format
function validateAPIKey(provider, key) {
    const patterns = {
        openai: /^sk-[a-zA-Z0-9]{20,}$/,
        claude: /^sk-ant-[a-zA-Z0-9-_]{20,}$/,
        perplexity: /^pplx-[a-zA-Z0-9]{20,}$/,
        gemini: /^AI[a-zA-Z0-9-_]{20,}$/
    };
    
    const pattern = patterns[provider];
    return pattern ? pattern.test(key) : key.length >= 20; // Default to 20 characters or more
}

// Update API status
function updateAPIStatus() {
    Object.keys(AI_CONFIGS).forEach(provider => {
        const statusElement = document.getElementById(`${provider}-status`);
        if (statusElement) {
            const apiKey = getAPIKey(provider);
            const statusIcon = statusElement.querySelector('.status-icon');
            
            statusElement.classList.remove('active', 'error');
            
            if (apiKey && validateAPIKey(provider, apiKey)) {
                statusElement.classList.add('active');
                statusIcon.textContent = '🟢';
            } else {
                statusIcon.textContent = '⚪';
            }
        }
    });
}

// Test individual API
async function testAPI(provider) {
    try {
        const config = AI_CONFIGS[provider];
        const testMessages = [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: "Hello, please respond with 'Test successful'" }
        ];
        
        let result;
        switch (provider) {
            case 'openai':
                result = await utils.callOpenAI(testMessages);
                break;
            case 'claude':
                result = await utils.callClaude(testMessages);
                break;
            case 'perplexity':
                result = await utils.callPerplexity(testMessages);
                break;
            case 'gemini':
                result = await utils.callGemini(testMessages);
                break;
            default:
                throw new Error('Unsupported AI service');
        }
        
        return { success: true, result: result };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Test all APIs
async function testAllAPIs() {
    const availableProviders = utils.getAvailableProviders();
    
    if (availableProviders.length === 0) {
        utils.showAlert('API 키가 설정되지 않았습니다. 먼저 API 키를 입력해주세요.', 'warning');
        return;
    }
    
    utils.showLoading('Testing API connections...');
    
    const results = [];
    
    for (const provider of availableProviders) {
        const config = AI_CONFIGS[provider];
        const statusElement = document.getElementById(`${provider}-status`);
        const statusIcon = statusElement.querySelector('.status-icon');
        
        // Displaying the test status
        statusIcon.textContent = '🔄';
        
        const testResult = await testAPI(provider);
        
        if (testResult.success) {
            statusElement.classList.add('active');
            statusElement.classList.remove('error');
            statusIcon.textContent = '🟢';
            results.push(`✅ ${config.name}: Connection successful`);
        } else {
            statusElement.classList.add('error');
            statusElement.classList.remove('active');
            statusIcon.textContent = '🔴';
            results.push(`❌ ${config.name}: ${testResult.error}`);
        }
    }
    
    utils.hideLoading();
    
    const successCount = results.filter(r => r.startsWith('✅')).length;
    const totalCount = results.length;
    
    const message = `API test completed: ${successCount}/${totalCount} success - ${results.join(', ')}`;
    
    if (successCount === totalCount) {
        utils.showAlert(message, 'success');
    } else if (successCount > 0) {
        utils.showAlert(message, 'warning');
    } else {
        utils.showAlert(message, 'warning');
    }
}

// Check API key status and guide
function checkAPIKeyStatus() {
    const availableProviders = utils.getAvailableProviders();
    
    if (availableProviders.length === 0) {
        // Displaying the guide message when API key is not set
        setTimeout(() => {
            utils.showAlert('AI 분석 기능을 사용하려면 설정에서 API 키를 입력해주세요. (OpenAI, Claude, Perplexity, Gemini 중 선택)', 'info');
        }, 2000);
    } else {
        // Displaying the guide message when AI service is available
        const providerNames = availableProviders.map(p => AI_CONFIGS[p].name).join(', ');
        setTimeout(() => {
            utils.showAlert(`${providerNames} AI 분석이 준비되었습니다!`, 'success');
        }, 1000);
    }
}

// Developer Tools
const devTools = {
    clearCache() {
        state.drugCache.clear();
        utils.logToDevConsole('✅ Cache cleared', 'success');
        utils.showAlert('캐시가 성공적으로 삭제되었습니다', 'success');
    },

    clearStorage() {
        localStorage.clear();
        state.recentSearches = [];
        utils.logToDevConsole('✅ Local storage cleared', 'success');
        utils.showAlert('로컬 저장소가 성공적으로 삭제되었습니다', 'success');
        updateRecentSearches();
    },

    exportLogs() {
        const logs = [];
        const consoleEl = document.getElementById('devConsole');
        if (consoleEl) {
            consoleEl.querySelectorAll('.console-line').forEach(line => {
                logs.push(line.textContent);
            });
        }
        
        const dataStr = JSON.stringify({
            timestamp: new Date().toISOString(),
            logs: logs,
            state: {
                cacheSize: state.drugCache.size,
                recentSearches: state.recentSearches.length,
                isLoading: state.isLoading,
                developerMode: state.developerMode
            }
        }, null, 2);
        
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `drug-checker-logs-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
        
        utils.logToDevConsole('📄 Logs exported', 'success');
    },

    async testAllAPIs() {
        utils.logToDevConsole('🧪 Testing all APIs...', 'info');
        const providers = Object.keys(AI_CONFIGS);
        const results = {};
        
        for (const provider of providers) {
            try {
                const apiKey = getAPIKey(provider);
                if (!apiKey) {
                    results[provider] = 'No API key';
                    continue;
                }
                
                utils.logToDevConsole(`Testing ${provider}...`, 'info');
                await testAPI(provider);
                results[provider] = 'Success';
            } catch (error) {
                results[provider] = error.message;
                utils.logToDevConsole(`❌ ${provider} failed: ${error.message}`, 'error');
            }
        }
        
        utils.logToDevConsole(`🧪 API test results: ${JSON.stringify(results)}`, 'info');
    },

    showDebugInfo() {
        const info = {
            userAgent: navigator.userAgent,
            language: navigator.language,
            cookieEnabled: navigator.cookieEnabled,
            onLine: navigator.onLine,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            localStorage: {
                available: typeof(Storage) !== "undefined",
                usage: JSON.stringify(localStorage).length + ' bytes'
            },
            state: {
                cacheSize: state.drugCache.size,
                recentSearches: state.recentSearches.length,
                isLoading: state.isLoading,
                developerMode: state.developerMode
            },
            apiKeys: utils.getAvailableProviders()
        };
        
        utils.logToDevConsole('🔍 Debug Info:', 'info');
        Object.entries(info).forEach(([key, value]) => {
            utils.logToDevConsole(`  ${key}: ${JSON.stringify(value)}`, 'info');
        });
    },

    async performanceTest() {
        utils.logToDevConsole('⚡ Running performance test...', 'info');
        
        const testDrugs = ['aspirin', 'ibuprofen', 'acetaminophen'];
        const startTime = performance.now();
        
        try {
            for (const drug of testDrugs) {
                const testStart = performance.now();
                await searchDrug(drug);
                const testEnd = performance.now();
                utils.logToDevConsole(`  ${drug}: ${(testEnd - testStart).toFixed(2)}ms`, 'info');
            }
            
            const totalTime = performance.now() - startTime;
            utils.logToDevConsole(`⚡ Performance test completed in ${totalTime.toFixed(2)}ms`, 'success');
        } catch (error) {
            utils.logToDevConsole(`❌ Performance test failed: ${error.message}`, 'error');
        }
    },

    // FDA API 상태 테스트
    async testFDAAPI() {
        utils.logToDevConsole('🔬 FDA API 연결 테스트 시작...', 'info');
        
        try {
            // 간단한 테스트 쿼리
            const testQuery = 'aspirin';
            const url = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${testQuery}"&limit=1`;
            
            utils.logToDevConsole(`📡 FDA API 테스트 URL: ${url}`, 'info');
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                },
                mode: 'cors'
            });
            
            utils.logToDevConsole(`📊 FDA API 응답: ${response.status} ${response.statusText}`, 'info');
            
            if (response.ok) {
                const data = await response.json();
                utils.logToDevConsole(`✅ FDA API 연결 성공! 결과: ${data.results?.length || 0}개`, 'success');
                return { success: true, data: data };
            } else {
                const errorText = await response.text();
                utils.logToDevConsole(`❌ FDA API HTTP 오류: ${response.status} - ${errorText}`, 'error');
                return { success: false, error: `HTTP ${response.status}: ${errorText}` };
            }
        } catch (error) {
            utils.logToDevConsole(`💥 FDA API 테스트 실패: ${error.message}`, 'error');
            
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                utils.logToDevConsole('🚫 CORS 정책으로 인한 FDA API 접근 제한 감지', 'warning');
                return { success: false, error: 'CORS_BLOCKED', message: 'CORS policy blocks direct access' };
            } else {
                return { success: false, error: error.message };
            }
        }
    },

    // 전체 데이터베이스 연결 테스트
    async testAllDatabases() {
        utils.logToDevConsole('🌐 모든 데이터베이스 연결 테스트 시작...', 'info');
        
        const results = {
            fda: null,
            mfds: null,
            local: null
        };
        
        // FDA API 테스트
        try {
            results.fda = await this.testFDAAPI();
        } catch (error) {
            results.fda = { success: false, error: error.message };
        }
        
        // MFDS 로컬 데이터 테스트
        try {
            const mfdsResult = await utils.searchKoreanDrugs('아스피린', 1);
            results.mfds = { 
                success: mfdsResult.results.length > 0, 
                data: mfdsResult,
                message: `${mfdsResult.results.length}개 한국 의약품 데이터 로드됨`
            };
            utils.logToDevConsole(`✅ MFDS 로컬 데이터: ${mfdsResult.results.length}개 결과`, 'success');
        } catch (error) {
            results.mfds = { success: false, error: error.message };
            utils.logToDevConsole(`❌ MFDS 로컬 데이터 테스트 실패: ${error.message}`, 'error');
        }
        
        // 로컬 약물명 매핑 테스트
        try {
            const mappingCount = Object.keys(drugNameMapping).length;
            results.local = {
                success: mappingCount > 0,
                data: { count: mappingCount },
                message: `${mappingCount}개 약물명 매핑 로드됨`
            };
            utils.logToDevConsole(`✅ 로컬 약물명 매핑: ${mappingCount}개`, 'success');
        } catch (error) {
            results.local = { success: false, error: error.message };
            utils.logToDevConsole(`❌ 로컬 데이터 테스트 실패: ${error.message}`, 'error');
        }
        
        // 통합 테스트 결과 출력
        const successCount = Object.values(results).filter(r => r?.success).length;
        const totalCount = Object.keys(results).length;
        
        utils.logToDevConsole(`🎯 데이터베이스 테스트 완료: ${successCount}/${totalCount} 성공`, 
            successCount === totalCount ? 'success' : 'warning');
        
        return results;
    }
};

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Displaying the recent searches
    updateRecentSearches();
    
    // Check API key status
    checkAPIKeyStatus();
    
    // Initialize API status (for settings modal)
    setTimeout(() => {
        updateAPIStatus();
    }, 100);

    // Search input event
    document.getElementById('drugSearch').addEventListener('input', realTimeSearchHandler);
    
    document.getElementById('drugSearch').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchDrug();
        }
    });

    // Drug selection input event
    document.getElementById('drug1').addEventListener('input', function() {
        drugSearchHandler('drug1', 1);
    });

    document.getElementById('drug2').addEventListener('input', function() {
        drugSearchHandler('drug2', 2);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.drug-select-container')) {
            document.querySelectorAll('.drug-list').forEach(list => {
                list.classList.remove('show');
            });
        }
    });

    // Close modal when clicking outside
    document.getElementById('drugDetailModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeDrugDetail();
        }
    });

    // Close settings modal when clicking outside
    document.getElementById('settingsModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeSettings();
        }
    });

    // Close modal when pressing ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeDrugDetail();
            closeSettings();
            if (state.developerMode && e.target.closest('.developer-panel')) {
                utils.toggleDeveloperMode();
            }
        }
    });

    // Save settings when pressing Enter key
    Object.keys(AI_CONFIGS).forEach(provider => {
        const input = document.getElementById(`${provider}ApiKey`);
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    saveSettings();
                }
            });
        }
    });

    // Display/hide FAB when scrolling
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const fab = document.querySelector('.fab');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 200) {
            if (scrollTop > lastScrollTop) {
                fab.style.transform = 'scale(0)';
            } else {
                fab.style.transform = 'scale(1)';
            }
        } else {
            fab.style.transform = 'scale(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // 개발자 모드가 활성화되어 있으면 패널 표시
    if (state.developerMode) {
        utils.createDeveloperPanel();
    }
    
    // 설정 버튼 드래그 기능
    initSettingsFabDrag();
    
    // 스크롤 애니메이션 초기화
    initScrollAnimations();
    
    // 향상된 스크롤 관찰자 초기화
    enhanceScrollObserver();
    
    // 스크롤 그라데이션 초기화
    initScrollGradients();
    
    // 보안 초기화
    initSecurity();
    
    // 푸터 기능 초기화
    initFooter();
    
    // 페이지 로드 완료 후 preload 클래스 제거
    setTimeout(() => {
        document.body.classList.remove('preload');
    }, 100);
});

// 설정 버튼 드래그 기능 초기화
function initSettingsFabDrag() {
    const settingsFab = document.querySelector('.settings-fab');
    if (!settingsFab) return;
    
    // 저장된 위치 불러오기
    loadSettingsFabPosition(settingsFab);
    
    let isDragging = false;
    let dragStartTime = 0;
    let startX = 0;
    let startY = 0;
    let initialX = 0;
    let initialY = 0;
    let hasMoved = false;
    
    // 터치 시작
    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        isDragging = true;
        dragStartTime = Date.now();
        startX = touch.clientX;
        startY = touch.clientY;
        hasMoved = false;
        
        const rect = settingsFab.getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;
        
        e.preventDefault();
    };
    
    // 터치 이동
    const handleTouchMove = (e) => {
        if (!isDragging) return;
        
        const touch = e.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        
        // 최소 움직임 감지 (5px 이상 움직여야 드래그로 인식)
        if (!hasMoved && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
            hasMoved = true;
            settingsFab.classList.add('dragging');
        }
        
        if (!hasMoved) return;
        
        let newX = initialX + deltaX;
        let newY = initialY + deltaY;
        
        // 화면 경계 제한
        const fabSize = 48;
        const padding = 10;
        
        newX = Math.max(padding, Math.min(window.innerWidth - fabSize - padding, newX));
        newY = Math.max(padding, Math.min(window.innerHeight - fabSize - padding, newY));
        
        // 위치 업데이트
        settingsFab.style.right = 'auto';
        settingsFab.style.bottom = 'auto';
        settingsFab.style.left = `${newX}px`;
        settingsFab.style.top = `${newY}px`;
        
        e.preventDefault();
    };
    
    // 터치 종료
    const handleTouchEnd = (e) => {
        if (!isDragging) return;
        
        const dragDuration = Date.now() - dragStartTime;
        
        isDragging = false;
        settingsFab.classList.remove('dragging');
        
        // 드래그가 아닌 클릭이었다면 설정 모달 열기
        if (!hasMoved && dragDuration < 200) {
            openSettings();
        } else if (hasMoved) {
            // 드래그였다면 현재 위치 저장
            saveSettingsFabPosition(settingsFab);
        }
        
        e.preventDefault();
    };
    
    // 마우스 이벤트 (데스크탑에서도 드래그 가능)
    const handleMouseStart = (e) => {
        isDragging = true;
        dragStartTime = Date.now();
        startX = e.clientX;
        startY = e.clientY;
        hasMoved = false;
        
        const rect = settingsFab.getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;
        
        // 기본 클릭 이벤트 방지
        e.preventDefault();
    };
    
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        // 최소 움직임 감지 (5px 이상 움직여야 드래그로 인식)
        if (!hasMoved && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
            hasMoved = true;
            settingsFab.classList.add('dragging');
        }
        
        if (!hasMoved) return;
        
        let newX = initialX + deltaX;
        let newY = initialY + deltaY;
        
        // 화면 경계 제한
        const fabSize = 48;
        const padding = 10;
        
        newX = Math.max(padding, Math.min(window.innerWidth - fabSize - padding, newX));
        newY = Math.max(padding, Math.min(window.innerHeight - fabSize - padding, newY));
        
        // 위치 업데이트
        settingsFab.style.right = 'auto';
        settingsFab.style.bottom = 'auto';
        settingsFab.style.left = `${newX}px`;
        settingsFab.style.top = `${newY}px`;
        
        e.preventDefault();
    };
    
    const handleMouseEnd = (e) => {
        if (!isDragging) return;
        
        const dragDuration = Date.now() - dragStartTime;
        
        isDragging = false;
        settingsFab.classList.remove('dragging');
        
        // 드래그가 아닌 클릭이었다면 설정 모달 열기
        if (!hasMoved && dragDuration < 200) {
            openSettings();
        } else if (hasMoved) {
            // 드래그였다면 현재 위치 저장
            saveSettingsFabPosition(settingsFab);
        }
        
        e.preventDefault();
    };
    
    // 이벤트 리스너 추가
    settingsFab.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    // 마우스 이벤트 (데스크탑에서도 드래그 가능)
    settingsFab.addEventListener('mousedown', handleMouseStart);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseEnd);
    
    // 클릭 이벤트 중복 방지
    settingsFab.addEventListener('click', (e) => {
        if (hasMoved) {
            e.preventDefault();
            e.stopPropagation();
        }
    });
    
    // 화면 크기 변경 시 위치 재조정
    window.addEventListener('resize', () => {
        adjustSettingsFabPosition(settingsFab);
    });
}

// 설정 버튼 위치 저장
function saveSettingsFabPosition(fab) {
    const rect = fab.getBoundingClientRect();
    const position = {
        left: rect.left,
        top: rect.top,
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight
    };
    localStorage.setItem('settings_fab_position', JSON.stringify(position));
}

// 설정 버튼 위치 불러오기
function loadSettingsFabPosition(fab) {
    const savedPosition = localStorage.getItem('settings_fab_position');
    if (savedPosition) {
        try {
            const position = JSON.parse(savedPosition);
            
            // 화면 크기가 많이 변경되었다면 기본 위치 사용
            const widthChange = Math.abs(window.innerWidth - position.screenWidth) / position.screenWidth;
            const heightChange = Math.abs(window.innerHeight - position.screenHeight) / position.screenHeight;
            
            if (widthChange > 0.3 || heightChange > 0.3) {
                return; // 기본 위치 유지
            }
            
            // 화면 경계 확인
            const fabSize = 48;
            const padding = 10;
            
            let left = Math.max(padding, Math.min(window.innerWidth - fabSize - padding, position.left));
            let top = Math.max(padding, Math.min(window.innerHeight - fabSize - padding, position.top));
            
            fab.style.right = 'auto';
            fab.style.bottom = 'auto';
            fab.style.left = `${left}px`;
            fab.style.top = `${top}px`;
        } catch (e) {
            console.log('Failed to load settings fab position:', e);
        }
    }
}

// 설정 버튼 위치 리셋 (기본 위치로)
function resetSettingsFabPosition(fab) {
    fab.style.left = 'auto';
    fab.style.top = 'auto';
    fab.style.right = '24px';
    fab.style.bottom = '90px';
    localStorage.removeItem('settings_fab_position');
}

// 설정 버튼 위치 조정 (화면 크기 변경 시)
function adjustSettingsFabPosition(fab) {
    const rect = fab.getBoundingClientRect();
    const fabSize = 48;
    const padding = 10;
    
    // 현재 위치가 커스텀 위치인지 확인 (right, bottom이 auto가 아니면 기본 위치)
    if (fab.style.left === 'auto' || fab.style.left === '') {
        return; // 기본 위치이므로 조정하지 않음
    }
    
    let left = Math.max(padding, Math.min(window.innerWidth - fabSize - padding, rect.left));
    let top = Math.max(padding, Math.min(window.innerHeight - fabSize - padding, rect.top));
    
    fab.style.left = `${left}px`;
    fab.style.top = `${top}px`;
    
    // 조정된 위치 저장
    saveSettingsFabPosition(fab);
}

// 스크롤 애니메이션 초기화
function initScrollAnimations() {
    // Intersection Observer 설정
    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -10% 0px', // 요소의 10%가 보일 때 트리거
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 요소가 보이기 시작하면 애니메이션 클래스 추가
                entry.target.classList.add('scroll-visible');
                
                // 한 번 보인 요소는 더 이상 관찰하지 않음 (성능 최적화)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 애니메이션 대상 요소들 선택
    const animateElements = document.querySelectorAll(
        '.scroll-hidden, .scroll-slide-left, .scroll-slide-right, .scroll-fade, .scroll-scale'
    );
    
    // 각 요소를 관찰 대상에 추가
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // 동적으로 추가되는 요소들을 위한 MutationObserver
    const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) { // Element node
                    // 새로 추가된 요소가 애니메이션 클래스를 가지고 있다면 관찰 시작
                    if (node.matches && node.matches('.scroll-hidden, .scroll-slide-left, .scroll-slide-right, .scroll-fade, .scroll-scale')) {
                        observer.observe(node);
                    }
                    
                    // 자식 요소들도 확인
                    const childAnimateElements = node.querySelectorAll 
                        ? node.querySelectorAll('.scroll-hidden, .scroll-slide-left, .scroll-slide-right, .scroll-fade, .scroll-scale')
                        : [];
                    
                    childAnimateElements.forEach(childElement => {
                        observer.observe(childElement);
                    });
                }
            });
        });
    });
    
    // DOM 변화 관찰 시작
    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // 페이지 상단에 있는 요소들은 즉시 표시 (이미 뷰포트에 있을 경우)
    const topElements = document.querySelectorAll('.header, .container > section:first-of-type');
    topElements.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.classList.add('scroll-visible');
        }
    });
}

// 푸터 관련 기능들
function initFooter() {
    // 검색 카운트 업데이트
    updateFooterStats();
    
    // 실시간 검색 카운트 업데이트
    let searchCount = parseInt(SecurityUtils.secureLocalStorage.getItem('daily_search_count') || '0');
    const today = new Date().toDateString();
    const lastSearchDate = SecurityUtils.secureLocalStorage.getItem('last_search_date');
    
    // 날짜가 바뀌면 카운트 리셋
    if (lastSearchDate !== today) {
        searchCount = 0;
        SecurityUtils.secureLocalStorage.setItem('daily_search_count', '0');
        SecurityUtils.secureLocalStorage.setItem('last_search_date', today);
    }
    
    updateSearchCount(searchCount);
}

// 검색 카운트 업데이트
function updateSearchCount(count) {
    const countElement = document.getElementById('footerSearchCount');
    if (countElement) {
        // 애니메이션 효과로 카운트 업데이트
        const currentCount = parseInt(countElement.textContent) || 0;
        if (count > currentCount) {
            let current = currentCount;
            const increment = Math.max(1, Math.floor((count - currentCount) / 10));
            const timer = setInterval(() => {
                current += increment;
                if (current >= count) {
                    current = count;
                    clearInterval(timer);
                }
                countElement.textContent = current;
            }, 50);
        } else {
            countElement.textContent = count;
        }
    }
}

// 검색 수행 시 카운트 증가
function incrementSearchCount() {
    const today = new Date().toDateString();
    let searchCount = parseInt(SecurityUtils.secureLocalStorage.getItem('daily_search_count') || '0');
    searchCount++;
    
    SecurityUtils.secureLocalStorage.setItem('daily_search_count', searchCount.toString());
    SecurityUtils.secureLocalStorage.setItem('last_search_date', today);
    
    updateSearchCount(searchCount);
}

// 푸터 통계 업데이트
function updateFooterStats() {
    const searchCount = parseInt(SecurityUtils.secureLocalStorage.getItem('daily_search_count') || '0');
    updateSearchCount(searchCount);
}

// Privacy Policy 모달
function showPrivacyPolicy() {
    const modal = createInfoModal('Privacy Policy', `
        <div style="line-height: 1.6; color: var(--text-secondary);">
            <h4 style="color: var(--text); margin-bottom: 1rem;">🔒 개인정보 보호정책</h4>
            
            <h5 style="color: var(--primary); margin: 1.5rem 0 0.5rem;">데이터 수집</h5>
            <p>본 서비스는 다음 정보를 수집합니다:</p>
            <ul style="margin-left: 1rem;">
                <li>검색한 약물명 (로컬 저장소에만 저장)</li>
                <li>AI 분석을 위한 API 키 (로컬 저장소에만 저장)</li>
                <li>사용 통계 (익명화)</li>
            </ul>
            
            <h5 style="color: var(--primary); margin: 1.5rem 0 0.5rem;">데이터 보안</h5>
            <p>모든 민감한 데이터는 브라우저의 로컬 저장소에만 저장되며, 외부 서버로 전송되지 않습니다. API 키는 암호화되어 저장됩니다.</p>
            
            <h5 style="color: var(--primary); margin: 1.5rem 0 0.5rem;">쿠키 사용</h5>
            <p>본 서비스는 필수 기능을 위한 로컬 저장소만 사용하며, 추적 쿠키는 사용하지 않습니다.</p>
            
            <p style="margin-top: 1.5rem; padding: 1rem; background: rgba(var(--warning-rgb, 255, 193, 7), 0.1); border-radius: 8px; border-left: 4px solid var(--warning, #ffc107);">
                <strong>중요:</strong> 본 도구는 교육 목적으로만 사용되며, 의료진의 조언을 대체하지 않습니다.
            </p>
        </div>
    `);
}

// Terms of Service 모달
function showTermsOfService() {
    const modal = createInfoModal('Terms of Service', `
        <div style="line-height: 1.6; color: var(--text-secondary);">
            <h4 style="color: var(--text); margin-bottom: 1rem;">📋 이용약관</h4>
            
            <h5 style="color: var(--primary); margin: 1.5rem 0 0.5rem;">서비스 목적</h5>
            <p>Drug Interaction Checker는 교육 및 정보 제공 목적으로만 사용됩니다. 의료 조언, 진단 또는 치료를 목적으로 하지 않습니다.</p>
            
            <h5 style="color: var(--primary); margin: 1.5rem 0 0.5rem;">사용자 책임</h5>
            <ul style="margin-left: 1rem;">
                <li>약물 복용 전 반드시 의료진과 상담</li>
                <li>도구 결과에만 의존하지 않기</li>
                <li>응급상황 시 즉시 의료진에게 연락</li>
                <li>API 키의 안전한 관리</li>
            </ul>
            
            <h5 style="color: var(--primary); margin: 1.5rem 0 0.5rem;">책임 제한</h5>
            <p>본 서비스는 정보 제공만을 목적으로 하며, 약물 상호작용으로 인한 어떠한 문제에 대해서도 책임을 지지 않습니다.</p>
            
            <h5 style="color: var(--primary); margin: 1.5rem 0 0.5rem;">서비스 변경</h5>
            <p>서비스 내용은 사전 통지 없이 변경될 수 있습니다. 지속적인 개선을 위해 기능이 추가되거나 수정될 수 있습니다.</p>
            
            <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(var(--danger-rgb, 255, 0, 0), 0.1); border-radius: 8px; border-left: 4px solid var(--danger, #ff0000);">
                <strong>⚠️ 의료 면책 조항:</strong><br>
                본 도구는 의료 전문가의 조언을 대체할 수 없습니다. 약물 복용에 관한 모든 결정은 의료진과 상담 후 내리시기 바랍니다.
            </div>
        </div>
    `);
}

// Data Sources 모달  
function showDataSources() {
    const modal = createInfoModal('통합 데이터 소스', `
        <div style="line-height: 1.6; color: var(--text-secondary);">
            <h4 style="color: var(--text); margin-bottom: 1rem;">🌐 통합 검색 시스템</h4>
            
            <div style="margin-bottom: 1.5rem; padding: 1rem; background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.1), rgba(var(--secondary-rgb), 0.05)); border-radius: 12px; border: 1px solid rgba(var(--primary-rgb), 0.2);">
                <h5 style="color: var(--primary); margin: 0 0 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                    <span>🔍</span> 실시간 통합 검색
                </h5>
                <p style="margin: 0.5rem 0; font-size: 0.9rem;">
                    FDA와 MFDS 데이터베이스를 동시에 검색하여 국내외 의약품 정보를 통합 제공
                </p>
                <ul style="margin: 0.5rem 0 0 1rem; font-size: 0.85rem;">
                    <li>한국어 검색 시 🇰🇷 MFDS 데이터 우선 표시</li>
                    <li>영어 검색 시 🇺🇸 FDA 데이터 우선 표시</li>
                    <li>병렬 검색으로 빠른 결과 제공</li>
                    <li>중복 제거 및 관련성 기반 정렬</li>
                </ul>
            </div>
            
            <h5 style="color: var(--primary); margin: 1.5rem 0 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                🇺🇸 <span style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.8rem;">FDA</span> OpenFDA API
            </h5>
            <div style="margin-bottom: 1rem;">
                <span style="font-size: 0.9rem;">미국 식품의약국(FDA) 공식 의약품 정보 데이터베이스</span><br>
                <ul style="margin: 0.5rem 0 0 1rem; font-size: 0.85rem;">
                    <li>의약품 라벨 정보 (50만+ 제품)</li>
                    <li>성분 및 제조사 정보</li>
                    <li>부작용 및 주의사항</li>
                    <li>상호작용 정보</li>
                </ul>
                <a href="https://api.fda.gov" target="_blank" rel="noopener" style="color: var(--primary); font-size: 0.85rem;">→ FDA OpenData Portal</a>
            </div>
            
            <h5 style="color: var(--primary); margin: 1.5rem 0 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                🇰🇷 <span style="background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.8rem;">MFDS</span> 의약품안전나라
            </h5>
            <div style="margin-bottom: 1rem;">
                <span style="font-size: 0.9rem;">한국 식품의약품안전처(MFDS) 승인 의약품 정보</span><br>
                <ul style="margin: 0.5rem 0 0 1rem; font-size: 0.85rem;">
                    <li>국내 허가 의약품 정보 (3만+ 제품)</li>
                    <li>한국어 의약품명 및 영문명 매핑</li>
                    <li>국내 제조사 및 수입사 정보</li>
                    <li>한국 실정에 맞는 복용법 및 주의사항</li>
                </ul>
                <a href="https://nedrug.mfds.go.kr" target="_blank" rel="noopener" style="color: var(--primary); font-size: 0.85rem;">→ 의약품안전나라</a>
            </div>
            
            <h5 style="color: var(--primary); margin: 1.5rem 0 0.5rem;">🤖 AI 분석 서비스</h5>
            <p style="margin: 0.5rem 0; font-size: 0.9rem;">고도화된 AI 모델을 통한 상호작용 분석 및 한국 의료 환경 고려</p>
            <ul style="margin-left: 1rem; font-size: 0.85rem;">
                <li><strong>OpenAI GPT-4:</strong> 포괄적 의학 지식 분석</li>
                <li><strong>Anthropic Claude:</strong> 안전성 중심 분석</li>
                <li><strong>Google Gemini:</strong> 다국어 의학 정보 처리</li>
                <li><strong>Perplexity AI:</strong> 실시간 의학 연구 동향 반영</li>
            </ul>
            
            <h5 style="color: var(--primary); margin: 1.5rem 0 0.5rem;">📈 데이터 품질 보장</h5>
            <ul style="margin-left: 1rem; font-size: 0.85rem;">
                <li><strong>실시간 업데이트:</strong> FDA API를 통한 최신 데이터 반영</li>
                <li><strong>검증된 소스:</strong> 공식 의료기관 승인 데이터만 사용</li>
                <li><strong>다중 검증:</strong> 여러 AI 모델을 통한 교차 검증</li>
                <li><strong>한국형 맞춤:</strong> 국내 의료 환경 및 처방 관행 고려</li>
            </ul>
            
            <h5 style="color: var(--primary); margin: 1.5rem 0 0.5rem;">🔗 추가 참고 자료</h5>
            <ul style="margin-left: 1rem; font-size: 0.85rem;">
                <li><a href="https://www.health.kr" target="_blank" rel="noopener" style="color: var(--primary);">약학정보원</a></li>
                <li><a href="https://opendata.hira.or.kr" target="_blank" rel="noopener" style="color: var(--primary);">건강보험심사평가원</a></li>
                <li><a href="https://www.mfds.go.kr" target="_blank" rel="noopener" style="color: var(--primary);">식품의약품안전처</a></li>
                <li><a href="https://www.kdca.go.kr" target="_blank" rel="noopener" style="color: var(--primary);">질병관리청</a></li>
            </ul>
            
            <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(var(--warning-rgb, 255, 193, 7), 0.1); border-radius: 8px; border-left: 4px solid var(--warning, #ffc107);">
                <strong>⚠️ 중요한 알림:</strong><br>
                이 도구는 교육 및 정보 제공 목적으로만 사용되며, 의학적 조언을 대체하지 않습니다. 
                실제 약물 복용 전에는 반드시 의사나 약사와 상담하세요. 
                특히 한국에서는 식약처 허가 의약품 정보를 우선 참고하시기 바랍니다.
            </div>
        </div>
    `);
}

// 정보 모달 생성 헬퍼 함수
function createInfoModal(title, content) {
    // 기존 정보 모달이 있으면 제거
    const existingModal = document.getElementById('infoModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = 'infoModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3 class="modal-title">${SecurityUtils.escapeHtml(title)}</h3>
                <button class="modal-close" onclick="closeInfoModal()" aria-label="Close">×</button>
            </div>
            <div class="modal-body" style="max-height: 70vh; overflow-y: auto;">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 모달 표시
    utils.disableBodyScroll();
    modal.classList.add('show');
    
    // 외부 클릭으로 닫기
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeInfoModal();
        }
    });
    
    return modal;
}

// 정보 모달 닫기
function closeInfoModal() {
    const modal = document.getElementById('infoModal');
    if (modal) {
        modal.classList.add('closing');
        
        setTimeout(() => {
            modal.remove();
            utils.enableBodyScroll();
        }, 400);
    }
}

// 스크롤 그라데이션 효과를 위한 스크롤 감지
let scrollTimer;
let isScrolling = false;
let elementScrollTimers = new Map();

// 전체 페이지 스크롤 이벤트 처리
function handleScroll() {
    if (!isScrolling) {
        document.body.classList.add('scrolling');
        isScrolling = true;
    }
    
    // 스크롤이 멈춘 후 잠시 후 클래스 제거
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        document.body.classList.remove('scrolling');
        isScrolling = false;
    }, 200);
}

// 개별 요소 스크롤 처리 함수
function handleElementScroll(element) {
    // 스크롤이 가능한지 확인
    const isScrollable = element.scrollHeight > element.clientHeight;
    if (!isScrollable) {
        element.classList.remove('scrolling');
        return;
    }
    
    // 스크롤 위치 확인
    const scrollTop = element.scrollTop;
    const scrollBottom = element.scrollHeight - element.clientHeight - scrollTop;
    const threshold = 5; // 5px 여유
    
    // 스크롤 중 클래스 추가
    element.classList.add('scrolling');
    
    // 상단/하단 그라데이션 개별 제어를 위한 데이터 속성 설정
    if (scrollTop <= threshold) {
        element.setAttribute('data-scroll-top', 'false');
    } else {
        element.setAttribute('data-scroll-top', 'true');
    }
    
    if (scrollBottom <= threshold) {
        element.setAttribute('data-scroll-bottom', 'false');
    } else {
        element.setAttribute('data-scroll-bottom', 'true');
    }
    
    // 기존 타이머 제거
    if (elementScrollTimers.has(element)) {
        clearTimeout(elementScrollTimers.get(element));
    }
    
    // 스크롤이 멈춘 후 클래스 제거
    const timer = setTimeout(() => {
        element.classList.remove('scrolling');
        elementScrollTimers.delete(element);
    }, 300);
    
    elementScrollTimers.set(element, timer);
}

// 초기 스크롤 상태 설정
function setInitialScrollState(element) {
    const isScrollable = element.scrollHeight > element.clientHeight;
    if (!isScrollable) {
        element.setAttribute('data-scroll-top', 'false');
        element.setAttribute('data-scroll-bottom', 'false');
        return;
    }
    
    const scrollTop = element.scrollTop;
    const scrollBottom = element.scrollHeight - element.clientHeight - scrollTop;
    const threshold = 5;
    
    element.setAttribute('data-scroll-top', scrollTop > threshold ? 'true' : 'false');
    element.setAttribute('data-scroll-bottom', scrollBottom > threshold ? 'true' : 'false');
}

// 스크롤 가능한 요소들에 이벤트 리스너 추가
function initScrollGradients() {
    // 검색 결과
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.addEventListener('scroll', () => handleElementScroll(searchResults), { passive: true });
        searchResults.setAttribute('data-scroll-listener', 'true');
        setInitialScrollState(searchResults);
    }
    
    // 약물 리스트들
    const drugLists = document.querySelectorAll('.drug-list');
    drugLists.forEach(list => {
        list.addEventListener('scroll', () => handleElementScroll(list), { passive: true });
        setInitialScrollState(list);
    });
    
    // 설정 모달 바디
    const settingsBody = document.querySelector('.settings-body');
    if (settingsBody) {
        settingsBody.addEventListener('scroll', () => handleElementScroll(settingsBody), { passive: true });
        setInitialScrollState(settingsBody);
    }
    
    // 모달 콘텐츠
    const modalContents = document.querySelectorAll('.modal-content');
    modalContents.forEach(modal => {
        modal.addEventListener('scroll', () => handleElementScroll(modal), { passive: true });
        setInitialScrollState(modal);
    });
    
    // 동적으로 생성되는 요소들을 위한 MutationObserver
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) { // Element node
                    // 약물 리스트가 새로 추가된 경우
                    if (node.classList && node.classList.contains('drug-list')) {
                        node.addEventListener('scroll', () => handleElementScroll(node), { passive: true });
                        // 약간의 지연 후 초기 상태 설정 (렌더링 완료 후)
                        setTimeout(() => setInitialScrollState(node), 50);
                    }
                    
                    // 자식 요소 중 스크롤 가능한 요소들 확인
                    const scrollableElements = node.querySelectorAll 
                        ? node.querySelectorAll('.drug-list, .modal-content, .settings-body, #searchResults')
                        : [];
                    
                    scrollableElements.forEach(element => {
                        element.addEventListener('scroll', () => handleElementScroll(element), { passive: true });
                        // 약간의 지연 후 초기 상태 설정 (렌더링 완료 후)
                        setTimeout(() => setInitialScrollState(element), 50);
                    });
                }
            });
        });
    });
    
    // DOM 변화 관찰
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// 부드러운 스크롤을 위한 Intersection Observer 강화
function enhanceScrollObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -10% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const ratio = entry.intersectionRatio;
                const element = entry.target;
                
                // 부드러운 페이드 인 효과
                if (ratio > 0.1) {
                    element.classList.add('scroll-visible');
                    
                    // 추가적인 부드러운 효과를 위한 스타일 적용
                    if (ratio > 0.5) {
                        element.style.transform = 'translateY(0)';
                        element.style.opacity = '1';
                    } else {
                        const translateY = (1 - ratio * 2) * 20;
                        element.style.transform = `translateY(${translateY}px)`;
                        element.style.opacity = ratio * 2;
                    }
                }
            } else {
                // 요소가 뷰포트를 벗어났을 때
                const element = entry.target;
                element.classList.remove('scroll-visible');
                
                // 원래 상태로 복원
                if (element.classList.contains('scroll-hidden')) {
                    element.style.transform = 'translateY(40px)';
                    element.style.opacity = '0';
                } else if (element.classList.contains('scroll-slide-left')) {
                    element.style.transform = 'translateX(-60px)';
                    element.style.opacity = '0';
                } else if (element.classList.contains('scroll-slide-right')) {
                    element.style.transform = 'translateX(60px)';
                    element.style.opacity = '0';
                } else if (element.classList.contains('scroll-scale')) {
                    element.style.transform = 'scale(0.85)';
                    element.style.opacity = '0';
                }
            }
        });
    }, observerOptions);

    // 스크롤 애니메이션 요소들을 관찰
    const scrollElements = document.querySelectorAll('.scroll-hidden, .scroll-slide-left, .scroll-slide-right, .scroll-fade, .scroll-scale');
    scrollElements.forEach(el => observer.observe(el));
}

// 스크롤 이벤트 리스너 등록
window.addEventListener('scroll', handleScroll, { passive: true });

// CSP allowed domains
const CSP_ALLOWED_DOMAINS = [
    'api.fda.gov',
    'nedrug.mfds.go.kr',
    'www.health.kr',
    'openapi.foodsafetykorea.go.kr',
    'platform.openai.com',
    'api.anthropic.com',
    'api.perplexity.ai',
    'generativelanguage.googleapis.com'
];

// API 설정
const API_CONFIGS = {
    fda: {
        baseUrl: 'https://api.fda.gov/drug/label.json',
        name: 'FDA OpenFDA',
        rateLimit: 1000, // per day
        supportedLanguages: ['en']
    },
    mfds: {
        baseUrl: 'https://nedrug.mfds.go.kr/api',
        searchUrl: 'https://nedrug.mfds.go.kr/pbp/CCBCC01/getDrugPrdtList',
        detailUrl: 'https://nedrug.mfds.go.kr/pbp/CCBCC01/getDrugPrdtPrmsn',
        name: 'MFDS 의약품안전나라',
        rateLimit: 1000, // per day
        supportedLanguages: ['ko']
    },
    healthKr: {
        baseUrl: 'https://www.health.kr/api',
        name: '건강정보 통합 API',
        rateLimit: 500,
        supportedLanguages: ['ko']
    }
};

 