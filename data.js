/* =========================================================
   Portfolio content — edit this file to update your site.
   ========================================================= */

window.PORTFOLIO = {
  profile: {
    name: "Ashish Kumar Chaubey",

    role: "Full Stack Developer · Backend & AI Specialist",
    email: "sashishchaubey1234@gmail.com",
    phone: "+91-9076536204",

    /* ============================================================
       ADD YOUR PHOTO HERE
       -----------------------------------------------------------
       Option 1: Paste an image URL (from GitHub, Imgur, LinkedIn)
       Option 2: Put your photo at assets/img/photo.jpg
                 then set: photo: "assets/img/photo.jpg"
       Leave as empty string "" to keep the placeholder
    ============================================================ */
    photo: "./assets/profile-photo.jpg",

    /* ============================================================
       Replace "#" with your real URLs when ready.
       ============================================================ */
    links: {
      github: "https://github.com/AshishChaubey2003",
      linkedin: "https://www.linkedin.com/in/ashishchaubey2dec/",
      resume: "#",
    },
  },

  skills: [
    {
      category: "Languages",
      icon: "code",
      items: ["Python", "SQL", "JavaScript (ES6+)"],
    },
    {
      category: "Backend & API",
      icon: "server",
      items: [
        "Django",
        "Django REST Framework",
        "FastAPI",
        "REST API Design",
        "JWT",
        "OAuth2",
        "Swagger UI",
      ],
    },
    {
      category: "GenAI & LLMs",
      icon: "brain",
      items: [
        "LangChain",
        "LangGraph",
        "Groq API",
        "Llama 3 70B",
        "FAISS",
        "HuggingFace",
        "Google Gemini",
        "Prompt Engineering",
      ],
    },
    {
      category: "Frontend",
      icon: "palette",
      items: [
        "React",
        "React Router",
        "Axios",
        "Leaflet.js",
        "HTML5",
        "CSS3",
        "Streamlit",
      ],
    },
    {
      category: "Databases",
      icon: "db",
      items: [
        "PostgreSQL",
        "MySQL",
        "SQLite",
        "SQLAlchemy ORM",
        "Django ORM",
        "Schema Design",
      ],
    },
    {
      category: "Infra & DevOps",
      icon: "cloud",
      items: [
        "Apache Kafka",
        "Redis",
        "Celery",
        "Docker",
        "Docker Compose",
        "Nginx",
        "Gunicorn",
        "Render",
        "Vercel",
        "CI/CD",
      ],
    },
  ],

  projects: [
    {
      id: "travelx",
      name: "TravelX",
      subtitle: "AI-Powered Full-Stack Travel Booking Platform",
      period: "Jan 2025 — Apr 2025",
      stack: [
        "Django",
        "DRF",
        "PostgreSQL",
        "Redis",
        "Celery",
        "Kafka",
        "Stripe",
        "React",
        "Docker",
        "Nginx",
      ],
      highlights: [
        "Architected event-driven booking system using Kafka topics — decoupled booking, email, analytics & inventory services for independent horizontal scaling.",
        "Implemented multi-layer data integrity via select_for_update() + transaction.atomic() to prevent race conditions; Stripe idempotency keys for webhook deduplication.",
        "Configured Redis across 3 DBs (API cache, sessions, Celery broker) with TTL invalidation; integrated Leaflet.js maps and full Stripe Checkout + webhook payment flow.",
        "Containerized with Docker Compose; JWT auth with access/refresh tokens and role-based access control across Hotels, Adventures, Vehicles, Bookings, Payments.",
      ],
      tags: ["Backend", "Full Stack", "AI"],
      accent: "cyan",
      links: { code: "#", live: "#" },
    },
    {
      id: "freshplate",
      name: "AI FreshPlate",
      subtitle: "AI-Powered Food Ordering & Food Rescue Platform",
      period: "Jan 2025 — Present",
      stack: [
        "Django",
        "DRF",
        "PostgreSQL",
        "JWT",
        "Google Gemini",
        "Docker",
        "Render",
        "Vercel",
      ],
      highlights: [
        "Designed 10+ RESTful APIs with JWT auth and 3-tier RBAC (Admin, Customer, Donor); food donation module with 3-step approval workflow.",
        "Integrated Google Gemini AI chatbot for personalized food recommendations, menu assistance and real-time order support.",
        "Scalable PostgreSQL schema using Django ORM with optimized queries; dynamic cart supporting 5+ order statuses and real-time order tracking.",
        "Deployed on Render (backend) + Vercel (frontend) with CI/CD auto-deploy on every Git push.",
      ],
      tags: ["Backend", "AI", "Full Stack"],
      accent: "emerald",
      links: { code: "#", live: "#" },
    },
    {
      id: "ai-code-reviewer",
      name: "AI Code Reviewer",
      subtitle: "Agentic Code Review Tool with Self-Healing Loop",
      period: "2025 — Present",
      stack: [
        "LangGraph",
        "LangChain",
        "Groq API",
        "Llama 3 70B",
        "FAISS",
        "HuggingFace",
        "Streamlit",
      ],
      highlights: [
        "Engineered a 5-node LangGraph agentic pipeline with a self-healing auto-fix loop — detects bugs, rewrites code, re-analyzes output and repeats up to 3 times until clean.",
        "RAG pipeline using FAISS + HuggingFace MiniLM embeddings; users upload custom PDF coding guidelines for personalized, context-aware reviews.",
        "OWASP Top 10 security audit, PEP8 compliance and performance review as separate agent nodes with individual scoring (0–10).",
        "Deployed on Streamlit Cloud with CI/CD via GitHub push.",
      ],
      tags: ["AI"],
      accent: "violet",
      links: { code: "#", live: "#" },
    },
    {
      id: "quickcart",
      name: "QuickCart",
      subtitle: "E-Commerce Store with Stripe Payment Integration",
      period: "Nov 2024 — Present",
      stack: [
        "Django",
        "SQLite",
        "Stripe Checkout",
        "Django Sessions",
        "Bootstrap 5",
        "JavaScript",
      ],
      highlights: [
        "Single-page e-commerce with product listing, quantity selector and live total calculation using Django + Stripe Checkout API.",
        "4-layer double-payment prevention: frontend button disable, UUID idempotency key, select_for_update() DB lock and status-based order validation.",
        "Stripe webhook for reliable server-side order confirmation; session-based order tracking without login.",
      ],
      tags: ["Backend", "Full Stack"],
      accent: "amber",
      links: { code: "#", live: "#" },
    },
    {
      id: "study-tracker",
      name: "Study Tracker API",
      subtitle: "High-Performance REST API with JWT Auth & Swagger Docs",
      period: "Apr 2025",
      stack: [
        "FastAPI",
        "SQLAlchemy",
        "SQLite",
        "JWT",
        "Pydantic v2",
        "Uvicorn",
      ],
      highlights: [
        "High-performance async REST API with OAuth2 JWT auth, full CRUD and auto-generated Swagger UI.",
        "Clean architecture with Pydantic v2 strict validation; async request handling via Uvicorn ASGI.",
        "15-day streak tracking algorithm returning On-Track / Off-Track status.",
      ],
      tags: ["Backend"],
      accent: "rose",
      links: { code: "#", live: "#" },
    },
  ],

  education: [
    {
      school: "Shri Ramswaroop Memorial University",
      degree: "B.Tech — Computer Science",
      location: "Barabanki, Lucknow",
      period: "2021 — 2025",
      score: "CGPA 7.0 / 10",
    },
    {
      school: "Maharaji Devi Smarak Inter College",
      degree: "Class XII — PCM",
      location: "Ballia, Uttar Pradesh",
      period: "2020 — 2021",
      score: "65%",
    },
  ],

  certifications: [
    {
      title: "AWS Cloud Practitioner Essentials",
      issuer: "Coursera",
      year: "2024",
    },
    {
      title: "AI & Analytics Foundation",
      issuer: "IIT Hyderabad",
      year: "2024",
    },
  ],
};
