<div align="center">

# 🔭 Aradhana — AstroAgent

**An AI-powered astrology assistant. Born from the stars. Built with LangGraph.**

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![LangGraph](https://img.shields.io/badge/LangGraph-Agent-FF6B6B?style=for-the-badge&logo=langchain&logoColor=white)](https://www.langchain.com/langgraph)
[![License](https://img.shields.io/badge/License-MIT-gold?style=for-the-badge)](LICENSE)

<br/>

> *Enter your birth details. Receive your natal chart. Ask the cosmos anything.*

<br/>

```
  ♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓
       The sky at your birth — decoded by AI
  ♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓
```

[**✨ Live Demo**](#) · [**📖 Docs**](#setup) · [**🐛 Report Bug**](#) · [**💡 Request Feature**](#)

</div>

---

## ✨ What is Aradhana?

Aradhana is a full-stack AI astrology assistant that combines:

- **Swiss Ephemeris precision** — the same engine used by professional astrologers
- **LangGraph intelligence** — a multi-node state machine that routes, reasons, and retrieves
- **RAG knowledge base** — a FAISS-indexed corpus of astrology wisdom for grounded answers
- **Real-time streaming** — SSE-powered responses that feel alive
- **Session memory** — the agent remembers your chart and adapts every answer to *you*

Enter your birth date, time, and place. Get a complete natal chart. Then just... ask.

---

## 🎬 How It Works

### Request Lifecycle

```mermaid
sequenceDiagram
    actor User
    participant React as ⚛️ React Client
    participant FastAPI as 🚀 FastAPI
    participant LangGraph as 🧠 LangGraph Agent
    participant Tools as 🛠️ Tools
    participant FAISS as 📚 FAISS RAG

    User->>React: Enter birth details
    React->>FastAPI: POST /chart/
    FastAPI->>Tools: geocode_place + compute_birth_chart
    Tools-->>FastAPI: Natal chart JSON
    FastAPI-->>React: Chart data (planets, houses, signs)
    React-->>User: Render natal chart

    User->>React: Ask astrology question
    React->>FastAPI: POST /chat/stream (SSE)
    FastAPI->>LangGraph: Run state machine
    LangGraph->>LangGraph: Router classifies intent
    LangGraph->>Tools: tool_call (if needed)
    Tools->>FAISS: knowledge_lookup
    FAISS-->>Tools: Relevant passages
    Tools-->>LangGraph: Tool result
    LangGraph->>LangGraph: Memory extraction
    LangGraph-->>FastAPI: Token stream
    FastAPI-->>React: SSE chunks
    React-->>User: Streaming response ✨
```

---

### Agent State Machine

```mermaid
stateDiagram-v2
    [*] --> Router : User message arrives

    Router --> Agent : intent = chat / knowledge / chart / transit
    Router --> Safety : intent = offtopic / unsafe

    Safety --> [*] : Polite refusal

    Agent --> ToolNode : tool_call detected
    Agent --> Response : no tool needed

    ToolNode --> geocode_place : place resolution
    ToolNode --> compute_birth_chart : ephemeris calculation
    ToolNode --> get_daily_transits : current sky
    ToolNode --> knowledge_lookup : RAG retrieval

    geocode_place --> Memory
    compute_birth_chart --> Memory
    get_daily_transits --> Memory
    knowledge_lookup --> Memory

    Memory --> Agent : enriched context
    Agent --> Response : final answer

    Response --> [*] : SSE stream to client
```

---

### Full Architecture

```mermaid
graph TB
    subgraph Client["⚛️ React Client (Vite + Tailwind)"]
        BF[BirthForm<br/>date · time · place]
        LP[LandingPage]
        AP[AppPage / Chat]
        SB[Sidebar<br/>DailyEnergy · ChartWidget]
        CTX[AppContext<br/>useReducer + localStorage]
        BF --> LP --> AP
        AP <--> CTX
        SB <--> CTX
    end

    subgraph Server["🚀 FastAPI Server"]
        CR[POST /chart/]
        CH[POST /chat/stream SSE]
        TR[GET /transits/]
        GEO[GET /geocode/]
        SS[(Session Store<br/>in-memory)]
        CR --> SS
        CH --> SS
    end

    subgraph Graph["🧠 LangGraph State Machine"]
        R[Router<br/>intent classifier]
        A1[Agent Node<br/>system prompt + chart ctx]
        TN[ToolNode]
        MEM[Memory<br/>extraction]
        A2[Agent Node<br/>final response]
        R --> A1
        A1 -->|tool_call| TN
        TN --> MEM --> A2
        A1 -->|no tool| A2
    end

    subgraph Tools["🛠️ Tool Layer"]
        G[geocode_place<br/>geopy]
        BC[compute_birth_chart<br/>flatlib / Swiss Ephemeris]
        DT[get_daily_transits]
        KL[knowledge_lookup<br/>FAISS cosine similarity]
    end

    LP -->|POST /chart/| CR
    AP -->|POST /chat/stream| CH
    CH --> R
    TN --> G & BC & DT & KL

    style Client fill:#1a1a2e,stroke:#e94560,color:#eee
    style Server fill:#16213e,stroke:#0f3460,color:#eee
    style Graph fill:#0f3460,stroke:#533483,color:#eee
    style Tools fill:#533483,stroke:#e94560,color:#eee
```

---

## 📊 Evaluation Results

```mermaid
xychart-beta
    title "AstroAgent Eval Suite — Pass Rate by Category"
    x-axis ["Chart", "Knowledge", "Transit", "Chat", "Safety"]
    y-axis "Pass Rate (%)" 0 --> 100
    bar [100, 100, 100, 100, 67]
    line [88, 88, 88, 88, 88]
```

| Category | Pass Rate | Notes |
|----------|-----------|-------|
| 🗺️ Chart | **100%** | Natal chart computation |
| 📚 Knowledge | **100%** | RAG-powered astrology Q&A |
| 🌍 Transit | **100%** | Daily planetary alignments |
| 💬 Chat | **100%** | Conversational handling |
| 🛡️ Safety | **67%** | Needs prompt hardening |
| **Overall** | **88%** | Avg latency: **2.8s** |

---

## 🛠️ Tools Reference

```mermaid
graph LR
    Q[User Query] --> R{Router}

    R -->|place resolution| G["🌍 geocode_place<br/>City → lat/lng via geopy"]
    R -->|birth chart| B["⭐ compute_birth_chart<br/>Swiss Ephemeris via flatlib<br/>Sun · Moon · Mercury · Venus<br/>Mars · Ascendant · Houses"]
    R -->|daily sky| T["🌙 get_daily_transits<br/>Current positions vs natal chart<br/>Sign-based alignments"]
    R -->|knowledge| K["📖 knowledge_lookup<br/>FAISS cosine similarity<br/>Personalized by natal_chart"]

    style G fill:#2d4a22,stroke:#5a9e42,color:#fff
    style B fill:#4a2240,stroke:#9e4280,color:#fff
    style T fill:#22304a,stroke:#4280b0,color:#fff
    style K fill:#4a3a22,stroke:#c07a30,color:#fff
```

---

## 📁 Project Structure

```
aradhana/
├── client/                          # ⚛️ React frontend
│   └── src/
│       ├── components/
│       │   ├── cards/               # DailyEnergyCard, SafetyNoticeCard
│       │   ├── chart/               # ChartSidebarWidget, PlanetRow
│       │   ├── chat/                # ChatArea, InputBar, MessageBubble
│       │   ├── landing/             # HeroSection, BirthForm
│       │   └── ui/                  # Button, Input, Spinner, DatePicker
│       ├── context/AppContext.jsx   # Global state (useReducer + localStorage)
│       ├── hooks/                   # useChart, useChat, useTransits
│       └── pages/                   # LandingPage, AppPage
│
└── server/                          # 🐍 Python backend
    ├── app/
    │   ├── api/                     # Routes: chat, chart, geocode, transits
    │   ├── core/llm.py              # LLM client (OpenRouter / OpenAI)
    │   ├── graph/
    │   │   ├── graph.py             # StateGraph definition
    │   │   ├── state.py             # AstroState TypedDict
    │   │   ├── router.py            # Intent classification
    │   │   ├── memory.py            # Post-tool memory extraction
    │   │   └── session_store.py     # In-memory sessions
    │   ├── rag/vector_store.py      # FAISS index loader
    │   └── tools/                   # LangChain tool definitions
    ├── evals/                       # 🧪 Evaluation harness (30 golden prompts)
    ├── data/                        # Ephemeris files
    ├── faiss_index/                 # Pre-built FAISS index
    └── main.py                      # FastAPI entry point
```

---

## 🚀 Setup

### Prerequisites

| Requirement | Version |
|------------|---------|
| Python | 3.11+ |
| Node.js | 20+ |
| OpenRouter API key | (or any OpenAI-compatible endpoint) |

### 1. Clone

```bash
git clone https://github.com/your-username/aradhana.git
cd aradhana
```

### 2. Backend

```bash
cd server

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate        # Linux/Mac
# venv\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Set OPENAI_API_KEY and MODEL_NAME in .env

# Download ephemeris data (if not present)
python scripts/download_ephemeris.py

# Start server
uvicorn main:app --reload --port 8000
```

### 3. Frontend

```bash
cd client

npm install
npm run dev
# → http://localhost:5173  (proxied to :8000)
```

---

## 🧪 Evaluation

```bash
# Full suite (30 prompts across all categories)
python -m server.evals.run_eval

# Smoke test — 1 prompt per category
python -m server.evals.run_eval --quick

# Single category
python -m server.evals.run_eval --category knowledge
```

See [`server/evals/EVALUATION.md`](server/evals/EVALUATION.md) for full methodology and results analysis.

---

## 🧱 Tech Stack

```mermaid
mindmap
  root((Aradhana))
    Frontend
      React 19
      Vite 8
      Tailwind CSS 3
      Framer Motion
      SSE ReadableStream
    Backend
      Python 3.11
      FastAPI
      LangGraph
      LangChain
    AI & Data
      OpenRouter LLM
      Swiss Ephemeris
      flatlib
      FAISS cosine search
    Infrastructure
      In-memory session store
      localStorage persistence
      Pydantic schemas
```

---

## 🗺️ Roadmap

- [ ] 🔐 Persistent session storage (Redis / PostgreSQL)
- [ ] 📅 Synastry charts (compatibility between two charts)
- [ ] 🌍 Multi-language support
- [ ] 📱 Mobile-first redesign
- [ ] 🔔 Daily transit push notifications
- [ ] 🎨 Visual natal chart renderer (SVG)
- [ ] 🧠 Improve safety guardrails (target: 95%+)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/saturn-return`)
3. Commit your changes (`git commit -m 'Add Saturn return calculator'`)
4. Push to the branch (`git push origin feature/saturn-return`)
5. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

**Made with ♥ and stardust**

*"The stars incline, they do not compel."*

[![Stars](https://img.shields.io/github/stars/your-username/aradhana?style=social)](https://github.com/your-username/aradhana)

</div>