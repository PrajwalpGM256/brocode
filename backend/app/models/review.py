from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, JSON, Enum as SQLEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from app.core.database import Base

class ReviewType(str, enum.Enum):
    GENERAL = "general"
    SECURITY = "security"
    PERFORMANCE = "performance"
    BEST_PRACTICES = "best_practices"

class Review(Base):
    __tablename__ = "reviews"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Code Details
    filename = Column(String, nullable=False)
    code = Column(Text, nullable=False)
    language = Column(String, nullable=True)
    
    # Review Details
    review_type = Column(SQLEnum(ReviewType), default=ReviewType.GENERAL)
    summary = Column(Text, nullable=True)
    issues = Column(JSON, nullable=True)  # Store as JSON array
    positive_aspects = Column(JSON, nullable=True)
    
    # Metadata
    model = Column(String, default="gemini-pro")
    tokens_used = Column(Integer, nullable=True)
    
    # Repository (optional)
    repository_id = Column(Integer, ForeignKey("repositories.id"), nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="reviews")
    repository = relationship("Repository", back_populates="reviews")
