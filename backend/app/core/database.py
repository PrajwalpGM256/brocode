from app.core.config import settings

# Database is optional for now
# We're not using it for the core PR review feature

engine = None
SessionLocal = None
Base = None

def get_db():
    """Database dependency - not used currently"""
    return None
