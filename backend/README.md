# CodeReview AI - Backend

## Setup

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Setup PostgreSQL

**Option A: Docker (Recommended)**
```bash
docker-compose up postgres -d
```

**Option B: Local Installation**
- Install PostgreSQL 16
- Create database: `createdb codereview_db`

### 3. Environment Variables
```bash
cp .env.example .env
# Edit .env with your configurations
```

### 4. Run Migrations
```bash
alembic init alembic
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

### 5. Start Server
```bash
uvicorn app.main:app --reload
```

## Quick Start with Docker
```bash
docker-compose up
```

Access API: http://localhost:8000
Docs: http://localhost:8000/docs
