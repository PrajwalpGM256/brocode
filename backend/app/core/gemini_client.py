"""
Gemini API client wrapper for code review
"""
import json
from typing import Dict, Any
import google.generativeai as genai
from app.core.config import settings
from app.utils.logger import get_logger

logger = get_logger(__name__)


class GeminiClient:
    """Wrapper for Gemini API interactions"""
    
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel(settings.GEMINI_MODEL)
        self.max_tokens = settings.MAX_TOKENS
    
    async def review_code(
        self, 
        code: str, 
        filename: str,
        review_type: str = "general"
    ) -> Dict[str, Any]:
        """
        Send code to Gemini for review
        
        Args:
            code: The code to review
            filename: Name of the file being reviewed
            review_type: Type of review (general, security, performance, style)
            
        Returns:
            Dictionary with review results
        """
        try:
            prompt = self._build_prompt(code, filename, review_type)
            
            logger.info(f"Sending review request for {filename} (type: {review_type})")
            
            # Generate response from Gemini
            response = self.model.generate_content(prompt)
            
            # Extract text from response
            response_text = response.text
            
            # Clean up response - Gemini sometimes wraps JSON in code blocks
            response_text = response_text.strip()
            
            # Remove markdown code blocks if present
            if response_text.startswith("```json"):
                response_text = response_text[7:]  # Remove ```json
            elif response_text.startswith("```"):
                response_text = response_text[3:]  # Remove ```
                
            if response_text.endswith("```"):
                response_text = response_text[:-3]  # Remove ending ```
                
            response_text = response_text.strip()
            
            # Try to parse as JSON
            try:
                result = json.loads(response_text)
            except json.JSONDecodeError as e:
                logger.warning(f"Failed to parse JSON: {str(e)}")
                logger.warning(f"Response text: {response_text[:200]}...")
                # If not JSON, wrap in structure
                result = {
                    "issues": [],
                    "summary": response_text,
                    "positive_aspects": []
                }
            
            # Add metadata
            result["metadata"] = {
                "model": settings.GEMINI_MODEL,
                "filename": filename,
                "review_type": review_type
            }
            
            logger.info(f"Review completed: {len(result.get('issues', []))} issues found")
            
            return result
            
        except Exception as e:
            logger.error(f"Gemini API error: {str(e)}")
            raise
    
    def _build_prompt(self, code: str, filename: str, review_type: str) -> str:
        """Build the prompt for Gemini based on review type"""
        
        base_context = f"""You are an expert code reviewer analyzing JavaScript/TypeScript code.
File: {filename}

"""
        
        if review_type == "general":
            instructions = """Analyze this code comprehensively and identify:
1. **Bugs and Errors**: Logic errors, potential runtime issues, edge cases, type coercion problems
2. **Code Quality**: Readability, maintainability, naming conventions
3. **Best Practices**: Modern JavaScript/TypeScript patterns, common pitfalls
4. **Performance**: Inefficient algorithms, unnecessary computations
5. **Security**: Potential vulnerabilities, unsafe operations

"""
        elif review_type == "security":
            instructions = """Focus specifically on security vulnerabilities:
1. **Injection Attacks**: SQL injection, XSS, command injection
2. **Authentication/Authorization**: Weak auth, missing checks
3. **Data Exposure**: Sensitive data in logs, insecure storage
4. **Dependencies**: Known vulnerable packages
5. **Input Validation**: Missing or weak validation

"""
        elif review_type == "performance":
            instructions = """Focus on performance optimization:
1. **Algorithm Efficiency**: Time/space complexity issues
2. **Memory Leaks**: Unclosed resources, circular references
3. **Async Operations**: Blocking operations, race conditions
4. **Database Queries**: N+1 queries, missing indexes
5. **Caching Opportunities**: Repeated computations

"""
        elif review_type == "style":
            instructions = """Focus on code style and maintainability:
1. **Naming**: Variable, function, class naming
2. **Structure**: Function length, code organization
3. **Documentation**: Missing comments, unclear logic
4. **Consistency**: Style inconsistencies
5. **Modern Patterns**: Outdated patterns, ES6+ features

"""
        else:
            instructions = "Provide a general code review.\n\n"
        
        output_format = """Respond in JSON format:
{
  "issues": [
    {
      "type": "bug|security|performance|style",
      "severity": "high|medium|low",
      "line": <line_number or null>,
      "title": "Brief title",
      "description": "Detailed explanation",
      "suggestion": "How to fix it",
      "code_snippet": "Relevant code if helpful"
    }
  ],
  "summary": "Overall assessment of the code quality",
  "positive_aspects": ["List of things done well"]
}

Code to review:
```javascript
"""
        
        return base_context + instructions + output_format + code + "\n```"


    async def generate_review(self, prompt: str) -> str:
        """
        Generate a free-form code review from Gemini.
        Used for PR reviews where we want a markdown response.
        """
        try:
            # We can use the same model
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            logger.error(f"Gemini API error (generate_review): {str(e)}")
            raise

gemini_client = GeminiClient()