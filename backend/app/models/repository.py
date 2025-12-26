from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Repository(Base):
    __tablename__ = "repositories"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # GitHub Details
    github_id = Column(Integer, unique=True, nullable=True)
    name = Column(String, nullable=False)
    full_name = Column(String, nullable=False)  # owner/repo
    description = Column(String, nullable=True)
    url = Column(String, nullable=True)
    
    # Status
    is_active = Column(Boolean, default=True)
    last_analyzed = Column(DateTime(timezone=True), nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="repositories")
    reviews = relationship("Review", back_populates="repository", cascade="all, delete-orphan")
