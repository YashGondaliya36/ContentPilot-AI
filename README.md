# 🚀 ContentPilot AI

**Turn Ideas Into Impactful Content** with this advanced AI-powered platform. ContentPilot AI orchestrates a team of autonomous AI agents to research, strategize, and write high-quality content tailored to your brand voice and business goals.

![ContentPilot AI Banner](https://img.shields.io/badge/AI-Powered_Content_Generation-violet?style=for-the-badge&logo=google-gemini)

## ✨ Unique Features

### � **Premium "Deep Space" Interface**
- **Immersive Design:** A stunning dark-mode UI with floating animated orbs, glassmorphism, and vibrant gradients.
- **Micro-Animations:** Smooth transitions, hover effects, and a "living" background that makes the app feel alive.
- **Smart Feedback:** Real-time progress indicators showing exactly what the AI is doing (e.g., "Scanning trends...", "Drafting content...").
- **Full-Screen Document Mode:** A distraction-free, beautifully typographed view for reading and exporting your generated content.

### 🤖 **Multi-Agent AI System**
Powered by **CrewAI** and **Google Gemini**, our system simulates a real-world content team:
1.  **🔍 Researcher Agent:** Scours the web (via Tavily) for real-time trends, stats, and competitor insights.
2.  **📋 Strategist Agent:** Develops a content plan that aligns with your specific business goals and target audience.
3.  **📝 Writer Agent:** Crafts the final piece with perfect tone, structure, and SEO optimization.

### ⚡ **Top Capabilities**
*   **Context-Aware Generation:** Understands brand voice, timeline, and platform specificities (LinkedIn, Blog, etc.).
*   **Real-Time Internet Access:** Unlike standard LLMs, our agents have access to live web data.
*   **Email Delivery:** Automatically email the generated content to yourself or clients via Gmail integration.
*   **Markdown Support:** Full markdown rendering with one-click export and copy functionality.

---

## 🛠️ Tech Stack

### **Frontend** (Modern & Fast)
*   **Framework:** Next.js 16 (App Router)
*   **Styling:** Tailwind CSS v4
*   **Animations:** Framer Motion & CSS Animations
*   **Icons:** Lucide React

### **Backend** (Robust & Intelligent)
*   **Framework:** FastAPI (Python 3.11+)
*   **Orchestration:** CrewAI
*   **LLM:** Google Gemini 1.5 Flash
*   **Search:** Tavily API
*   **Validation:** Pydantic

---

## 🚀 Quick Start Guide

### Prerequisites
*   **Python 3.11+**
*   **Node.js 18+**
*   **API Keys:**
    *   `GOOGLE_API_KEY` (Gemini)
    *   `TAVILY_API_KEY` (Web Search)
    *   `GMAIL_CREDENTIALS` (Optional, for email)

### 1️⃣ Clone & Configure
```bash
git clone https://github.com/yourusername/ContentPilot-AI.git
cd ContentPilot-AI
```

Create a `.env` file in the `backend` directory:
```env
GOOGLE_API_KEY=your_key_here
TAVILY_API_KEY=your_key_here
# Optional
GMAIL_CREDENTIALS_PATH=credentials.json
```

### 2️⃣ Automatic Setup (Recommended)
We've included a helper script to set up the Python environment, install dependencies, and run the backend automatically.

**In PowerShell:**
```powershell
./run_backend.ps1
```

### 3️⃣ Run Frontend
Open a new terminal for the frontend:
```bash
cd frontend
npm install
npm run dev
```

### 4️⃣ Use the App
Visit `http://localhost:3000` in your browser.

---

## 📂 Project Structure

```
ContentPilot-AI/
├── backend/                # FastAPI Application
│   ├── app/
│   │   ├── agents/         # AI Agent Definitions
│   │   ├── core/           # Workflow Logic
│   │   ├── services/       # Email & Content Services
│   │   └── main.py         # App Entry Point
│   └── requirements.txt
├── frontend/               # Next.js Application
│   ├── src/
│   │   ├── app/            # Review the cleaner page structure
│   │   ├── components/     # Reusable UI Components
│   │   └── lib/            # API Utilities
│   └── public/
└── run_backend.ps1         # Quick Start Script
```

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License
[MIT](https://choosealicense.com/licenses/mit/)

---
**Made with ❤️ using Agentic AI**