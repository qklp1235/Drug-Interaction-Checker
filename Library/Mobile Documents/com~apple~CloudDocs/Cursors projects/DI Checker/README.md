# 💊 Drug Interaction Checker | 의약품 상호작용 검사기

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![AI Powered](https://img.shields.io/badge/AI-Powered-orange.svg)
![Multilingual](https://img.shields.io/badge/multilingual-KO%20%7C%20EN-red.svg)

**Professional drug interaction analysis with AI-powered insights**  
**AI 기반 전문 의약품 상호작용 분석 서비스**

[🇺🇸 **English**](#english) | [🇰🇷 **한국어**](#korean)

</div>

---

## 🇺🇸 English

### 🌟 Overview

Drug Interaction Checker is a sophisticated multilingual web application that helps users identify potential interactions between medications. Combining FDA OpenFDA API data with advanced AI analysis from multiple providers (OpenAI, Claude, Perplexity, Gemini), it offers comprehensive drug safety information with an intuitive, modern glassmorphism interface.

### ✨ Key Features

#### 🔍 **Intelligent Search Engine**
- **Real-time search** with 300ms debounce optimization
- **Typo tolerance** and fuzzy matching algorithms
- **Partial search** capabilities (e.g., "aspir" → "Aspirin")
- **Korean-English mixed usage** support
- **Relevance-based sorting** with similarity algorithms

#### 🤖 **Multi-AI Analysis Platform**
- **4 Major AI Services**: OpenAI GPT-4, Anthropic Claude, Perplexity AI, Google Gemini
- **Professional medical analysis** with structured clinical reports
- **Risk assessment**: Low/Moderate/High/Very High classification
- **Clinical recommendations** and emergency warning signs
- **Auto-fallback system** for failed API connections

#### 🌐 **Multilingual Support**
- **Korean Version** (`ko-kr/`): Complete Korean interface with medical translation
- **English Version** (`us-en/`): Professional English interface
- **Auto-detection** and seamless language switching

#### 📊 **Comprehensive Database**
- **FDA OpenFDA API** integration for official drug data
- **50+ curated drug database** with brand and generic names
- **Detailed drug information** with manufacturer details
- **Interaction mechanisms** and clinical warnings
- **Search history** and favorites management

#### 🎨 **Modern UI/UX Design**
- **Glassmorphism design** with professional blur effects
- **Monochrome theme** (black/white professional aesthetic)
- **Dark/Light mode** support with system preference detection
- **Fully responsive** design for desktop, tablet, and mobile
- **Accessibility features** with ARIA labels and keyboard navigation

### 🗂️ Project Structure

```
Drug-Interaction-Checker/
├── index.html              # Main landing page (Language selector)
├── README.md               # This file
├── package.json            # NPM package configuration
├── vercel.json             # Vercel deployment configuration
├── .gitignore             # Git ignore rules
├── ko-kr/                 # Korean Version
│   ├── index.html         # Korean interface
│   ├── scripts.js         # Korean-specific functionality
│   ├── styles.css         # Korean UI styles
│   └── README.md          # Korean documentation
└── us-en/                 # English Version
    ├── index.html         # English interface
    ├── scripts.js         # English-specific functionality
    ├── styles.css         # English UI styles
    └── README.md          # English documentation
```

### 🛠 Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **APIs**: FDA OpenFDA, OpenAI, Anthropic Claude, Perplexity, Google Gemini
- **Design**: CSS Grid/Flexbox, Glassmorphism effects, CSS Variables
- **Features**: Real-time search, AI integration, Local storage, PWA-ready

### 🚀 Getting Started

#### Prerequisites
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Internet connection for API access
- At least one AI API key (optional but recommended for full functionality)

#### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/qklp1235/Drug-Interaction-Checker.git
   cd Drug-Interaction-Checker
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   open index.html
   
   # Or run a local server
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **Choose your language**
   - **Korean**: Visit `ko-kr/index.html` or use the main `index.html`
   - **English**: Visit `us-en/index.html`

4. **Configure AI APIs (Optional)**
   - Click the ⚙️ settings button in any version
   - Add your API keys for desired AI services
   - Test connections using the 🧪 API Test feature

### 🔑 API Configuration

#### Supported AI Services

| Service | API Key Format | Documentation | Features |
|---------|---------------|---------------|----------|
| **OpenAI** | `sk-...` | [Platform](https://platform.openai.com/api-keys) | GPT-4 analysis, most accurate |
| **Claude** | `sk-ant-...` | [Console](https://console.anthropic.com/) | Detailed safety analysis |
| **Perplexity** | `pplx-...` | [Settings](https://www.perplexity.ai/settings/api) | Real-time data integration |
| **Gemini** | `AI...` | [AI Studio](https://aistudio.google.com/app/apikey) | Multilingual processing |

### 📖 Usage Instructions

1. **Search for medications**
   - Type drug name in the search box (supports partial names and typos)
   - Select from intelligent auto-complete suggestions
   - Works with both Korean and English drug names

2. **Check drug interactions**
   - Choose two medications from the dropdown menus
   - Click "Check Interaction" button
   - Review comprehensive AI analysis and FDA data

3. **View detailed drug information**
   - Click on any drug name for detailed manufacturer and usage info
   - Add drugs directly to the interaction checker from search results

### 🔬 AI Analysis Features

- **Risk Assessment**: Comprehensive 4-level risk evaluation
- **Clinical Insights**: Professional medical recommendations
- **Interaction Mechanisms**: Molecular-level interaction explanations
- **Emergency Signs**: Critical warning signs requiring immediate medical attention
- **Structured Reports**: Easy-to-read, professionally formatted analysis

### ⚠️ Important Medical Disclaimer

> **MEDICAL DISCLAIMER**: This tool is for informational and educational purposes only. It does not constitute medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers before making any medication decisions. Do not stop, start, or change medications without professional medical supervision.

### 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/qklp1235/Drug-Interaction-Checker/issues)
- **Discussions**: [GitHub Discussions](https://github.com/qklp1235/Drug-Interaction-Checker/discussions)

---

## 🇰🇷 Korean

### 🌟 프로젝트 개요

의약품 상호작용 검사기는 여러 의약품 간의 잠재적 상호작용을 식별하는 데 도움을 주는 정교한 다국어 웹 애플리케이션입니다. FDA OpenFDA API 데이터와 여러 AI 제공업체(OpenAI, Claude, Perplexity, Gemini)의 고급 AI 분석을 결합하여 직관적이고 현대적인 글래스모피즘 인터페이스로 포괄적인 의약품 안전 정보를 제공합니다.

### ✨ 주요 기능

#### 🔍 **지능형 검색 엔진**
- **실시간 검색** (300ms 디바운스 최적화)
- **오타 허용** 및 퍼지 매칭 알고리즘
- **부분 검색** 기능 (예: "아스피" → "아스피린")
- **한영 혼용** 검색 지원
- **관련성 기반 정렬** 및 유사도 알고리즘

#### 🤖 **멀티 AI 분석 플랫폼**
- **4대 AI 서비스**: OpenAI GPT-4, Anthropic Claude, Perplexity AI, Google Gemini
- **전문 의학 분석** 및 구조화된 임상 보고서
- **위험도 평가**: 낮음/보통/높음/매우 높음 분류
- **임상 권장사항** 및 응급 경고 신호
- **자동 대체 시스템** (API 연결 실패 시)

#### 🌐 **다국어 지원**
- **한국어 버전** (`ko-kr/`): 의료 번역이 포함된 완전한 한국어 인터페이스
- **영어 버전** (`us-en/`): 전문적인 영어 인터페이스
- **자동 감지** 및 원활한 언어 전환

#### 📊 **포괄적인 데이터베이스**
- **FDA OpenFDA API** 통합으로 공식 의약품 데이터 제공
- **50개 이상의 큐레이션된 의약품** 데이터베이스 (상품명 및 일반명)
- **상세한 의약품 정보** 및 제조업체 세부사항
- **상호작용 메커니즘** 및 임상 경고
- **검색 기록** 및 즐겨찾기 관리

#### 🎨 **현대적인 UI/UX 디자인**
- **글래스모피즘 디자인** 및 전문적인 블러 효과
- **모노크롬 테마** (흑백 전문적 미학)
- **다크/라이트 모드** 지원 (시스템 환경설정 감지)
- **완전 반응형** 디자인 (데스크톱, 태블릿, 모바일)
- **접근성 기능** (ARIA 라벨 및 키보드 내비게이션)

### 🗂️ 프로젝트 구조

```
Drug-Interaction-Checker/
├── index.html              # 메인 랜딩 페이지 (언어 선택)
├── README.md               # 이 파일
├── package.json            # NPM 패키지 설정
├── vercel.json             # Vercel 배포 설정
├── .gitignore             # Git 무시 규칙
├── ko-kr/                 # 한국어 버전
│   ├── index.html         # 한국어 인터페이스
│   ├── scripts.js         # 한국어 전용 기능
│   ├── styles.css         # 한국어 UI 스타일
│   └── README.md          # 한국어 문서
└── us-en/                 # 영어 버전
    ├── index.html         # 영어 인터페이스
    ├── scripts.js         # 영어 전용 기능
    ├── styles.css         # 영어 UI 스타일
    └── README.md          # 영어 문서
```

### 🛠 기술 스택

- **프론트엔드**: HTML5, CSS3, JavaScript (ES6+)
- **API**: FDA OpenFDA, OpenAI, Anthropic Claude, Perplexity, Google Gemini
- **디자인**: CSS Grid/Flexbox, 글래스모피즘 효과, CSS 변수
- **기능**: 실시간 검색, AI 통합, 로컬 저장소, PWA 준비

### 🚀 시작하기

#### 필수 요구사항
- 최신 웹 브라우저 (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- API 접근을 위한 인터넷 연결
- 최소 하나의 AI API 키 (선택사항이지만 전체 기능 사용을 위해 권장)

#### 빠른 시작

1. **저장소 복제**
   ```bash
   git clone https://github.com/qklp1235/Drug-Interaction-Checker.git
   cd Drug-Interaction-Checker
   ```

2. **브라우저에서 열기**
   ```bash
   # 브라우저에서 index.html 직접 열기
   open index.html
   
   # 또는 로컬 서버 실행
   python -m http.server 8000
   # 그 후 http://localhost:8000 방문
   ```

3. **언어 선택**
   - **한국어**: `ko-kr/index.html` 방문 또는 메인 `index.html` 사용
   - **영어**: `us-en/index.html` 방문

4. **AI API 설정 (선택사항)**
   - 아무 버전에서나 ⚙️ 설정 버튼 클릭
   - 원하는 AI 서비스의 API 키 추가
   - 🧪 API 테스트 기능으로 연결 확인

### 🔑 API 설정

#### 지원되는 AI 서비스

| 서비스 | API 키 형식 | 문서 | 특징 |
|---------|-------------|------|------|
| **OpenAI** | `sk-...` | [플랫폼](https://platform.openai.com/api-keys) | GPT-4 분석, 가장 정확함 |
| **Claude** | `sk-ant-...` | [콘솔](https://console.anthropic.com/) | 상세한 안전성 분석 |
| **Perplexity** | `pplx-...` | [설정](https://www.perplexity.ai/settings/api) | 실시간 데이터 통합 |
| **Gemini** | `AI...` | [AI 스튜디오](https://aistudio.google.com/app/apikey) | 다국어 처리 |

### 📖 사용 방법

1. **의약품 검색**
   - 검색창에 의약품 이름 입력 (부분 이름 및 오타 지원)
   - 지능형 자동완성 제안에서 선택
   - 한국어 및 영어 의약품 이름 모두 지원

2. **의약품 상호작용 확인**
   - 드롭다운 메뉴에서 두 의약품 선택
   - "상호작용 확인" 버튼 클릭
   - 포괄적인 AI 분석 및 FDA 데이터 검토

3. **상세한 의약품 정보 보기**
   - 의약품 이름 클릭으로 상세한 제조업체 및 사용법 정보 확인
   - 검색 결과에서 상호작용 검사기로 직접 의약품 추가

### 🔬 AI 분석 기능

- **위험도 평가**: 포괄적인 4단계 위험도 평가
- **임상 통찰**: 전문 의학적 권장사항
- **상호작용 메커니즘**: 분자 수준의 상호작용 설명
- **응급 신호**: 즉각적인 의료 조치가 필요한 중요 경고 신호
- **구조화된 보고서**: 읽기 쉽고 전문적으로 포맷된 분석

### ⚠️ 중요한 의료 면책조항

> **의료 면책조항**: 이 도구는 정보 제공 및 교육 목적으로만 사용됩니다. 의료 조언, 진단 또는 치료를 구성하지 않습니다. 모든 의약품 결정을 내리기 전에 반드시 자격을 갖춘 의료 제공자와 상담하십시오. 전문 의료 감독 없이 의약품을 중단, 시작 또는 변경하지 마십시오.

### 🤝 기여하기

기여를 환영합니다! 다음 단계를 따라주세요:

1. 저장소 포크
2. 기능 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 열기

### 📞 지원 및 연락처

- **이슈**: [GitHub Issues](https://github.com/qklp1235/Drug-Interaction-Checker/issues)
- **토론**: [GitHub Discussions](https://github.com/qklp1235/Drug-Interaction-Checker/discussions)

---

<div align="center">

**© 2025 Drug Interaction Checker | 의약품 상호작용 검사기**  
**Made with ❤️ for safer medication management**  
**안전한 의약품 관리를 위해 ❤️로 제작**

[![GitHub stars](https://img.shields.io/github/stars/qklp1235/Drug-Interaction-Checker.svg?style=social&label=Star)](https://github.com/qklp1235/Drug-Interaction-Checker)
[![GitHub forks](https://img.shields.io/github/forks/qklp1235/Drug-Interaction-Checker.svg?style=social&label=Fork)](https://github.com/qklp1235/Drug-Interaction-Checker/fork)

</div> 