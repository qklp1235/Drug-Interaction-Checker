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
