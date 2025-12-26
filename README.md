# Brocode

AI-powered code review assistant that analyzes your code for bugs, security vulnerabilities, and performance issues using Gemini AI.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** FastAPI, PostgreSQL, SQLAlchemy, Alembic
- **AI:** Google Gemini 1.5 Flash

## Prerequisites

- Node.js 18+
- Python 3.10+
- PostgreSQL
- Docker (optional, for DB)

## Quick Start

### 1. Setup Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows

pip install -r requirements.txt

# Create .env file and add your GEMINI_API_KEY and DATABASE_URL
cp .env.example .env

# Run migrations
alembic upgrade head

# Start server
uvicorn app.main:app --reload
```

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Environment Variables

### Backend (`backend/.env`)

```ini
DATABASE_URL=postgresql://user:pass@localhost:5432/codereview_db
GEMINI_API_KEY=your_api_key_here
SECRET_KEY=your_jwt_secret
```

### Frontend (`frontend/.env`)

```ini
VITE_API_URL=http://localhost:8000
```

## Docker Support

You can spin up the database using Docker Compose:

```bash
cd backend
docker-compose up -d postgres
```
