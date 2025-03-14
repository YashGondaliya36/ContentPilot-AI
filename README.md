# 🚀 ContentPilot AI

An advanced AI-powered content generation platform that researches, plans, and creates high-quality content.

## ✨ Features

- 🔍 **Smart Research**: Automatically researches trending topics and gathers valuable information
- 📋 **Strategic Planning**: Creates detailed content plans aligned with your business goals
- 📝 **Content Creation**: Generates engaging, audience-focused content in your brand voice
- 🎯 **Multiple Content Types**: Creates blog posts, social media content, email newsletters, and more
- 🌐 **Real-time Web Search**: Integrates with Tavily for up-to-date information

## 🛠️ Technologies

- Python
- Streamlit
- CrewAI
- LangChain
- Tavily 
- Google Gemini 

## ⚙️ Installation

### Prerequisites

- API keys for Google (Gemini) and Tavily

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ContentPilot-AI.git
   cd ContentPilot-AI
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the project root with:
   ```
   GOOGLE_API_KEY=your_google_api_key
   TAVILY_API_KEY=your_tavily_api_key
   ```

## 📊 Usage

1. **Start the Streamlit app**
   ```bash
   streamlit run ContentPilot.py
   ```

2. **Configure your content parameters**
   - Enter your content topics
   - Define your business goals
   - Specify your target audience
   - Choose your publication timeline
   - Select content types
   - Define your brand voice

3. **Click "Generate Content"**


## 🧠 AI Agents

ContentPilot AI uses three specialized AI agents:

- **🔍 Researcher Agent**: Finds trends from web, audience interests, and useful facts about your topics
- **📋 Planner Agent**: Creates a structured content plan based on research findings
- **📝 Writer Agent**: Transforms the research and plan into polished, ready-to-use content

## 🏛️ License

[MIT](https://choosealicense.com/licenses/mit/)

## 👨‍💻 Authors

## Made with ❤️ by  [Yash Gondaliya](https://www.linkedin.com/in/yash-gondaliya-02427a260/)  