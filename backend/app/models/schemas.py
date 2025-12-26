"""
Pydantic models for request/response validation
"""
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class ReviewIssue(BaseModel):
    """Single code review issue"""
    type: str = Field(..., description="Type of issue: bug, security, performance, style")
    severity: str = Field(..., description="Severity: high, medium, low")
    line: Optional[int] = Field(None, description="Line number where issue occurs")
    title: str = Field(..., description="Brief title of the issue")
    description: str = Field(..., description="Detailed explanation")
    suggestion: str = Field(..., description="How to fix the issue")
    code_snippet: Optional[str] = Field(None, description="Relevant code snippet")


class ReviewMetadata(BaseModel):
    """Metadata about the review"""
    model: str
    filename: str
    review_type: str


class ReviewResponse(BaseModel):
    """Complete review response"""
    issues: List[ReviewIssue]
    summary: str
    positive_aspects: Optional[List[str]] = []
    metadata: ReviewMetadata


class ReviewRequest(BaseModel):
    """Request to review code"""
    code: str = Field(..., description="Code content to review")
    filename: str = Field(..., description="Name of the file")
    review_type: str = Field(
        default="general",
        description="Type of review: general, security, performance, style"
    )


class HealthResponse(BaseModel):
    """Health check response"""
    status: str
    version: str
    claude_model: str


class ErrorResponse(BaseModel):
    """Error response"""
    error: str
    detail: Optional[str] = None
    code: Optional[str] = None