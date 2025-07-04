# 💊 Drug Interaction Checker

> **Professional drug interaction analysis with AI-powered insights and intelligent search capabilities**

[🇺🇸 English](#english) | [🇰🇷 한국어](#korean)

---

## English

### 🌟 Overview

Drug Interaction Checker is a sophisticated web application that helps users identify potential interactions between medications. Combining FDA data with advanced AI analysis from multiple providers, it offers comprehensive drug safety information with an intuitive, modern interface.

### ✨ Key Features

#### 🔍 **Intelligent Search Engine**
- **Real-time search** with 300ms debounce
- **Typo tolerance** and fuzzy matching
- **Partial search** capabilities (e.g., "aspir" → "Aspirin")
- **Korean-English mixed usage** support
- **Relevance-based sorting** with similarity algorithms

#### 🤖 **Multi-AI Analysis**
- Support for **4 major AI services**: OpenAI, Claude, Perplexity, Gemini
- **Professional medical analysis** with structured reports
- **Risk assessment**: Low/Moderate/High/Very High
- **Clinical recommendations** and emergency signs
- **Auto-fallback** system for failed connections

#### 📊 **Comprehensive Data**
- **FDA OpenFDA API** integration
- **50+ drug database** with brand names
- **Detailed drug information** with manufacturer details
- **Interaction mechanisms** and warnings
- **Recent search history** and favorites

#### 🎨 **Modern UI/UX**
- **Glassmorphism design** with blur effects
- **Monochrome theme** (black/white professional look)
- **Dark/Light mode** support
- **Responsive design** for all devices
- **Accessibility** features with ARIA labels

### 🛠 Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **APIs**: FDA OpenFDA, OpenAI, Anthropic Claude, Perplexity, Google Gemini
- **Design**: CSS Grid/Flexbox, Glassmorphism effects
- **Features**: Real-time search, AI integration, Local storage

### 🚀 Getting Started

#### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for API access
- At least one AI API key (optional but recommended)

#### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/drug-interaction-checker.git
   cd drug-interaction-checker
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   open index.html
   # or
   python -m http.server 8000  # For local server
   ```

3. **Configure AI APIs (Optional)**
   - Click the ⚙️ settings button
   - Add your API keys for desired services
   - Test connections using the 🧪 API Test button

#### API Key Setup

##### OpenAI (Recommended)
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account and generate API key
3. Format: `sk-...`

##### Anthropic Claude
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Generate API key
3. Format: `sk-ant-...`

##### Perplexity AI
1. Visit [Perplexity Settings](https://www.perplexity.ai/settings/api)
2. Generate API key
3. Format: `pplx-...`

##### Google Gemini
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Generate API key
3. Format: `AI...`

#### 🎁 One-time API Key System

For users without API keys, we provide a **free one-time API key system**:

- **5 free uses per day** using Perplexity AI
- **Automatic fallback** when no API keys are configured
- **Daily reset** at midnight
- **Usage tracking** with real-time counter
- **No registration required**

To use this feature:
1. Open the settings modal (⚙️)
2. Scroll to the "One-time API Key" section
3. Click "Get One-time Key" button
4. Use the AI analysis features immediately

**Note**: This system uses a shared Perplexity API key. For production use, consider setting up your own API keys for better control and reliability.

### 📖 Usage

1. **Search for drugs**
   - Type drug name in the search box
   - Use partial names or even typos
   - Select from intelligent suggestions

2. **Check interactions**
   - Choose two drugs from dropdowns
   - Click "Check Interaction"
   - Review both AI analysis and FDA data

3. **View detailed information**
   - Click on any drug name for detailed info
   - Add drugs directly to interaction checker

### 🔬 AI Analysis Features

- **Risk Assessment**: Comprehensive risk level evaluation
- **Clinical Insights**: Professional medical recommendations
- **Interaction Mechanisms**: How drugs interact at molecular level
- **Emergency Signs**: When to seek immediate medical attention
- **Structured Reports**: Easy-to-read formatted analysis

### ⚠️ Important Medical Disclaimer

> **This tool is for informational purposes only and should not replace professional medical advice. Always consult with healthcare providers before making medication decisions.**

### 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### 🙏 Acknowledgments

- FDA OpenFDA for comprehensive drug data
- AI providers for advanced analysis capabilities
- Medical professionals for guidance on drug interactions

---

## Korean

### 🌟 개요

약물 상호작용 체커는 의약품 간의 잠재적 상호작용을 식별하는 데 도움을 주는 정교한 웹 애플리케이션입니다. FDA 데이터와 여러 AI 제공업체의 고급 분석을 결합하여 직관적이고 현대적인 인터페이스로 포괄적인 약물 안전 정보를 제공합니다.

### ✨ 주요 기능

#### 🔍 **지능형 검색 엔진**
- **실시간 검색** (300ms 디바운스)
- **오타 허용** 및 퍼지 매칭
- **부분 검색** 기능 (예: "아스파" → "아스피린")
- **한국어-영어 혼용** 지원
- **관련도 기반 정렬** 및 유사도 알고리즘

#### 🤖 **다중 AI 분석**
- **4개 주요 AI 서비스** 지원: OpenAI, Claude, Perplexity, Gemini
- **전문 의료 분석** 및 구조화된 보고서
- **위험도 평가**: 낮음/보통/높음/매우 높음
- **임상 권장사항** 및 응급 징후
- 연결 실패 시 **자동 대체** 시스템

#### 📊 **포괄적 데이터**
- **FDA OpenFDA API** 통합
- **50+ 약물 데이터베이스** (브랜드명 포함)
- **상세 약물 정보** 및 제조사 정보
- **상호작용 메커니즘** 및 경고
- **최근 검색 기록** 및 즐겨찾기

#### 🎨 **모던 UI/UX**
- **글래스모피즘 디자인** (블러 효과)
- **모노크롬 테마** (흑백 전문가 룩)
- **다크/라이트 모드** 지원
- **반응형 디자인** (모든 기기 지원)
- **접근성** 기능 (ARIA 라벨)

### 🛠 기술 스택

- **프론트엔드**: HTML5, CSS3, JavaScript (ES6+)
- **API**: FDA OpenFDA, OpenAI, Anthropic Claude, Perplexity, Google Gemini
- **디자인**: CSS Grid/Flexbox, 글래스모피즘 효과
- **기능**: 실시간 검색, AI 통합, 로컬 스토리지

### 🚀 시작하기

#### 사전 요구사항
- 모던 웹 브라우저 (Chrome, Firefox, Safari, Edge)
- API 접근을 위한 인터넷 연결
- 최소 하나의 AI API 키 (선택사항이지만 권장)

#### 설치

1. **저장소 복제**
   ```bash
   git clone https://github.com/yourusername/drug-interaction-checker.git
   cd drug-interaction-checker
   ```

2. **브라우저에서 열기**
   ```bash
   # 브라우저에서 index.html 열기
   open index.html
   # 또는
   python -m http.server 8000  # 로컬 서버용
   ```

3. **AI API 구성 (선택사항)**
   - ⚙️ 설정 버튼 클릭
   - 원하는 서비스의 API 키 추가
   - 🧪 API 테스트 버튼으로 연결 확인

#### API 키 설정

##### OpenAI (권장)
1. [OpenAI 플랫폼](https://platform.openai.com/api-keys) 방문
2. 계정 생성 후 API 키 생성
3. 형식: `sk-...`

##### Anthropic Claude
1. [Anthropic 콘솔](https://console.anthropic.com/) 방문
2. API 키 생성
3. 형식: `sk-ant-...`

##### Perplexity AI
1. [Perplexity 설정](https://www.perplexity.ai/settings/api) 방문
2. API 키 생성
3. 형식: `pplx-...`

##### Google Gemini
1. [Google AI Studio](https://aistudio.google.com/app/apikey) 방문
2. API 키 생성
3. 형식: `AI...`

#### 🎁 일회성 API 키 시스템

API 키가 없는 사용자를 위한 **무료 일회성 API 키 시스템**을 제공합니다:

- **하루 5회 무료 사용** (Perplexity AI 사용)
- **자동 대체**: API 키가 설정되지 않은 경우 자동 사용
- **매일 자정 리셋**
- **실시간 사용량 추적**
- **등록 불필요**

사용 방법:
1. 설정 모달 (⚙️) 열기
2. "일회성 API 키" 섹션으로 스크롤
3. "일회성 키 받기" 버튼 클릭
4. 즉시 AI 분석 기능 사용

**참고**: 이 시스템은 공유 Perplexity API 키를 사용합니다. 프로덕션 환경에서는 더 나은 제어와 안정성을 위해 자체 API 키 설정을 권장합니다.

### 📖 사용법

1. **약물 검색**
   - 검색창에 약물명 입력
   - 부분 이름이나 오타도 가능
   - 지능형 제안에서 선택

2. **상호작용 확인**
   - 드롭다운에서 두 약물 선택
   - "상호작용 확인" 클릭
   - AI 분석과 FDA 데이터 모두 검토

3. **상세 정보 보기**
   - 약물명 클릭하여 상세 정보 확인
   - 상호작용 체커에 직접 약물 추가

### 🔬 AI 분석 기능

- **위험도 평가**: 포괄적인 위험 수준 평가
- **임상 통찰**: 전문 의료 권장사항
- **상호작용 메커니즘**: 분자 수준에서의 약물 상호작용
- **응급 징후**: 즉시 의료진 도움이 필요한 경우
- **구조화된 보고서**: 읽기 쉬운 형식의 분석

### ⚠️ 중요한 의료 면책조항

> **이 도구는 정보 제공 목적으로만 사용되며 전문 의료 조언을 대체할 수 없습니다. 약물 관련 결정을 내리기 전에 항상 의료진과 상담하십시오.**

### 🤝 기여하기

1. 저장소 포크
2. 기능 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 생성

### 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

### 🙏 감사의 말

- 포괄적인 약물 데이터를 제공하는 FDA OpenFDA(식약처의 api로 대체할 예정)
- 고급 분석 기능을 제공하는 AI 서비스 제공업체들
- 약물 상호작용에 대한 지침을 제공한 의료 전문가들 