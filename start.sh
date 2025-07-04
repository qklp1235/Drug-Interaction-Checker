#!/bin/bash

# Drug Interaction Checker Server Startup Script

echo "🚀 Starting Drug Interaction Checker Server..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp env.example .env
    echo "📝 Please edit .env file with your Perplexity API key"
    echo "   PERPLEXITY_API_KEY=your_perplexity_api_key_here"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if Perplexity API key is set
if grep -q "PERPLEXITY_API_KEY=your_perplexity_api_key_here" .env; then
    echo "⚠️  Warning: Please set your Perplexity API key in .env file"
    echo "   The one-time API key system will still work, but with limited functionality"
fi

echo "✅ Starting server on http://localhost:3000"
echo "🌐 English version: http://localhost:3000"
echo "🇰🇷 Korean version: http://localhost:3000/약물상호작용검사기/"
echo ""
echo "Press Ctrl+C to stop the server"

# Start the server
npm start 