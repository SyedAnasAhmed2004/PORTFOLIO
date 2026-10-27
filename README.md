# AI Engineer Portfolio

A 3D portfolio with an AI chatbot (RAG, in progress) and a conversational agent (planned).

| Layer    | Stack                                                                   |
| -------- | ----------------------------------------------------------------------- |
| Frontend | React 19, Vite, TypeScript, React Three Fiber, Motion, Tailwind CSS 4   |
| Backend  | FastAPI, Pydantic v2, SQLAlchemy 2 (async) + asyncpg, Alembic           |
| Database | PostgreSQL                                                              |
| Hosting  | Vercel (two projects: `frontend/` static site, `backend/` Python function) |

## Pages

| Route      | Page                                         |
| ---------- | -------------------------------------------- |
| `/`        | Profile — hero, about, skills, experience, projects |
| `/chat`    | Portfolio chatbot (RAG backend coming)        |
| `/agent`   | Reserved for the conversational AI agent      |
| `/contact` | Contact form (emails via Resend)              |

## Project structure

```
backend/
  app/
    api/v1/endpoints/   # health, chat, agent, contact routers
    api/v1/router.py    # aggregates v1 routers
    core/               # settings, logging
    db/                 # declarative Base, async engine & session dependency
    models/             # SQLAlchemy ORM models
    repositories/       # data-access layer (one repository per aggregate)
    schemas/            # Pydantic request/response models
    services/           # business logic (chat service is swappable for RAG)
    main.py             # FastAPI app factory
  migrations/           # Alembic migrations (URL read from .env)
  tests/                # pytest suite
  index.py              # Vercel entrypoint
  requirements.txt      # runtime deps (what Vercel installs)
  requirements-dev.txt  # + uvicorn, pytest, ruff

frontend/src/
  app/                  # App root and router
  components/
    layout/             # RootLayout, Navbar, Footer, PageTransition
    three/              # WebGL scene: NeuralCore shader, particles, per-route variants
    ui/                 # Button, TiltCard, Reveal, FormField, SectionHeading
  features/             # Feature modules: home, chat, agent, contact
  pages/                # Route components (lazy-loaded)
  services/api/         # HTTP client and typed API modules
  data/profile.ts       # ← all personal content lives here
  types/  hooks/  constants/  config/  lib/  styles/
```

## Local development

**Backend** (Python virtual environment in `backend/.venv`):

```powershell
cd backend
.venv\Scripts\activate
pip install -r requirements-dev.txt   # already done once
copy .env.example .env                # already done once
alembic upgrade head                  # create/upgrade database tables
uvicorn app.main:app --reload --port 8000
```

**Database**: fill in `DB_PASSWORD` (and anything else that differs) in `backend/.env`. It
targets the local `Portfolio` database by default. Check the connection at
http://localhost:8000/api/v1/health/db. After changing a model, create a migration with
`alembic revision --autogenerate -m "describe change"` and review it before applying.

API docs: http://localhost:8000/docs

**Frontend** (Vite proxies `/api` to `localhost:8000`):

```powershell
cd frontend
npm install                           # already done once
npm run dev
```

Open http://localhost:5173

**Quality checks**

```powershell
cd backend;  .venv\Scripts\python -m pytest; .venv\Scripts\python -m ruff check .
cd frontend; npm run typecheck; npm run lint; npm run build
```

## Editing your content

Everything personal (name, summary, skills, experience, projects, links) is in
[`frontend/src/data/profile.ts`](frontend/src/data/profile.ts). Experience, projects and
stats are currently **sample content**. Replace them with your own.

## Deploying to Vercel (free tier)

Push this repo to GitHub, then create **two** Vercel projects from it:

1. **Backend**: *Root Directory* `backend`. Vercel detects FastAPI from `index.py`.
   Environment variables:
   - `ENVIRONMENT=production`
   - `DATABASE_URL=postgresql://...` from a hosted Postgres (Neon or Supabase free tier;
     Vercel can't reach your local database). Run `alembic upgrade head` against it once.
   - `CORS_ORIGINS=https://<your-frontend>.vercel.app`
   - `RESEND_API_KEY`, `CONTACT_TO_EMAIL` (from https://resend.com, free tier)
2. **Frontend**: *Root Directory* `frontend`, framework preset **Vite**.
   Environment variables:
   - `VITE_API_BASE_URL=https://<your-backend>.vercel.app`

`frontend/vercel.json` rewrites all paths to `index.html` so client-side routes work on refresh.

## Roadmap

- **RAG chatbot**: implement a class matching the `ChatService` protocol in
  `backend/app/services/chat_service.py` and return it from `get_chat_service()`. The
  endpoint, schemas (including `sources`) and UI are already wired. Vercel functions have a
  250 MB size limit, so use hosted embeddings and a hosted vector store (e.g. Postgres +
  pgvector on Neon/Supabase, Qdrant Cloud, Pinecone) instead of local models.
- **Conversational agent**: build on `backend/app/api/v1/endpoints/agent.py` and
  `frontend/src/pages/AgentPage.tsx`.
- Rate-limit `/chat` and `/contact` before going public (e.g. Upstash Redis).
