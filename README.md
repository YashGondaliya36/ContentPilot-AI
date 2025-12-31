# 🚀 ContentPilot AI

An advanced AI-powered content generation platform with a modern web interface, real-time email delivery, and intelligent multi-agent content creation system.

## ✨ Features

### 🎨 **Modern Web Interface**
- Beautiful, responsive Next.js frontend with premium UI/UX
- Real-time content generation with loading states
- Interactive form with hover effects and smooth animations
- Dark mode glassmorphism design
- Markdown preview with syntax highlighting

### 🤖 **AI-Powered Content Generation**
- 🔍 **Smart Research Agent**: Automatically researches trending topics and gathers valuable information
- 📋 **Strategic Planner Agent**: Creates detailed content plans aligned with your business goals
- 📝 **Expert Writer Agent**: Generates engaging, audience-focused content in your brand voice
- 🎯 **Multiple Content Types**: Blog posts, social media content, email newsletters, and more
- 🌐 **Real-time Web Search**: Integrates with Tavily for up-to-date information

### 📧 **Email Delivery**
- Auto-send generated content via Gmail API
- Beautiful HTML email formatting
- Custom email subjects
- Instant delivery confirmation

### 🔄 **RESTful API**
- FastAPI backend with automatic documentation
- CORS-enabled for frontend integration
- Structured JSON responses
- Error handling and validation

## 🏗️ Architecture

```
ContentPilot-AI/
├── backend/          # FastAPI backend
│   ├── app/
│   │   ├── agents/   # CrewAI agents (Researcher, Planner, Writer)
│   │   ├── api/      # API routes
│   │   ├── models/   # Pydantic models
│   │   └── services/ # Business logic & email service
│   └── main.py
└── frontend/         # Next.js frontend
    ├── src/
    │   ├── app/      # Pages (Home, Generate)
    │   ├── components/ # Reusable components
    │   └── lib/      # API client
    └── public/
```

## 🛠️ Technologies

### Backend
- **Python 3.11+**
- **FastAPI** - Modern web framework
- **CrewAI** - Multi-agent orchestration
- **LangChain** - LLM integration
- **Google Gemini** - AI model (gemini-1.5-flash)
- **Tavily** - Real-time web search
- **Gmail API** - Email delivery
- **Pydantic** - Data validation

### Frontend
- **Next.js 16** - React framework with Turbopack
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Modern icons
- **React Markdown** - Content rendering
- **Axios** - HTTP client

## ⚙️ Installation

### Prerequisites

- Python 3.11+
- Node.js 18+
- Gmail account (for email feature)
- API keys for:
  - Google Gemini
  - Tavily
  - Gmail API credentials

### Backend Setup

1. **Navigate to backend**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   
   Create `.env` in backend root:
   ```env
   GOOGLE_API_KEY=your_gemini_api_key
   TAVILY_API_KEY=your_tavily_api_key
   GMAIL_CREDENTIALS_PATH=path/to/credentials.json
   ```

5. **Start backend server**
   ```bash
   python -m app.main
   ```
   Backend runs at: `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Frontend runs at: `http://localhost:3000`

## 📊 Usage

### Via Web Interface

1. **Open** `http://localhost:3000`
2. **Click** "Get Started" or navigate to `/generate`
3. **Fill in the form:**
   - Content Topics (comma-separated)
   - Business Goals
   - Target Audience
   - Timeline
   - Content Types
   - Brand Voice
   - Additional Notes (optional)
4. **Optional:** Enable "Auto-send via email" to deliver content directly
5. **Click** "Generate Content"
6. **Download** or copy your generated content

### Via API

**Generate Content:**
```bash
POST http://localhost:8000/api/v1/content/generate
Content-Type: application/json

{
  "content_topics": ["AI Writing", "Content Marketing"],
  "business_goals": "Increase brand awareness",
  "target_audience": "Digital marketers aged 25-45",
  "timeline": "Weekly",
  "content_types": "Blog posts",
  "brand_voice": "Professional and informative",
  "send_email": false
}
```

**With Email Delivery:**
```bash
{
  ...
  "send_email": true,
  "recipient_email": "client@example.com",
  "email_subject": "Your AI-Generated Content"
}
```

**API Documentation:** `http://localhost:8000/docs`

## 🧠 AI Agents Workflow

1. **🔍 Researcher Agent**
   - Searches web for trending topics
   - Analyzes audience interests
   - Gathers facts and statistics
   - Identifies content opportunities

2. **📋 Planner Agent**
   - Reviews research findings
   - Creates structured content outline
   - Aligns with business goals
   - Plans content distribution

3. **📝 Writer Agent**
   - Writes engaging content
   - Matches brand voice
   - Includes SEO optimization
   - Formats for selected channels

## 🎨 UI Features

- **Glassmorphism Cards** with hover effects
- **Gradient Backgrounds** with animated orbs
- **Smooth Transitions** and micro-animations
- **Responsive Design** for all screen sizes
- **Form Validation** with real-time feedback
- **Loading States** with spinners
- **Error Handling** with user-friendly messages
- **Markdown Rendering** with code highlighting

## 📧 Email Configuration

1. **Enable Gmail API** in Google Cloud Console
2. **Download** `credentials.json`
3. **Place** in backend directory
4. **Run** backend - it will generate `token.json` on first use
5. **Authorize** your Gmail account

## 🔒 Security

- Environment variables for sensitive data
- `.env` files are gitignored
- CORS configuration for frontend
- API rate limiting
- Input validation with Pydantic

## 🚀 Deployment

### Backend (Railway/Render/Fly.io)
```bash
# Set environment variables
# Deploy from backend folder
```

### Frontend (Vercel/Netlify)
```bash
# Set NEXT_PUBLIC_API_URL
# Deploy from frontend folder
```

## 📝 License

[MIT](https://choosealicense.com/licenses/mit/)

## 👨‍💻 Author

**Made with ❤️ by [Yash Gondaliya](https://www.linkedin.com/in/yash-gondaliya-02427a260/)**

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## ⭐ Show Your Support

Give a ⭐ if this project helped you!