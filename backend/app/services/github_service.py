import hmac
import hashlib
import json
from github import Github
from app.core.config import settings
from app.core.gemini_client import gemini_client
from app.utils.logger import get_logger

logger = get_logger(__name__)

class GithubService:
    def __init__(self):
        self.github = Github(settings.GITHUB_TOKEN) if settings.GITHUB_TOKEN else None
        
    def verify_signature(self, payload_body: bytes, secret_token: str, signature_header: str) -> bool:
        """Verify that the webhook payload came from GitHub"""
        if not signature_header:
            return False
            
        hash_object = hmac.new(
            secret_token.encode('utf-8'), 
            msg=payload_body, 
            digestmod=hashlib.sha256
        )
        expected_signature = "sha256=" + hash_object.hexdigest()
        
        return hmac.compare_digest(expected_signature, signature_header)

    async def handle_push_event(self, payload: dict):
        """
        Process a push event:
        1. Identify the repo and commit.
        2. Fetch changed files.
        3. Analyze supported files.
        4. Post comments on the commit.
        """
        if not self.github:
            logger.error("GitHub token not configured, cannot process push event")
            return

        try:
            repo_name = payload['repository']['full_name']
            commit_sha = payload['head_commit']['id']
            
            logger.info(f"Processing push to {repo_name} at {commit_sha}")
            
            repo = self.github.get_repo(repo_name)
            commit = repo.get_commit(commit_sha)
            
            #supported_extensions = {'.py', '.js', '.jsx', '.ts', '.tsx', '.java', '.cpp', '.c', '.go', '.rs'}
            
            # Simple check for now to avoid analyzing massive files or binaries
            files_analyzed = 0
            
            for file in commit.files:
                if file.status == "removed":
                    continue
                    
                # Basic extension check (can be improved)
                if not any(file.filename.endswith(ext) for ext in ['.py', '.js', '.jsx', '.ts', '.tsx', '.go', '.rs', '.java']):
                    continue
                    
                logger.info(f"Analyzing file: {file.filename}")
                
                # Fetch file content (raw)
                try:
                    # PyGithub returns encoded content, but we can get decoded
                    # Note: handling large files might need raw_url and httpx, but this is fine for MVP
                    content_file = repo.get_contents(file.filename, ref=commit_sha)
                    code_content = content_file.decoded_content.decode('utf-8')
                    
                    # Analyze with Gemini
                    # Using "general" review type for push events
                    review_result = await gemini_client.review_code(
                        code=code_content,
                        filename=file.filename,
                        review_type="general"
                    )
                    
                    # If issues found, post a comment
                    issues = review_result.get('issues', [])
                    if issues:
                        comment_body = f"### 🤖 Brocode Review: {file.filename}\n\n"
                        comment_body += f"**Summary**: {review_result.get('summary', 'No summary provided')}\n\n"
                        
                        for issue in issues:
                            # Map severity to emoji
                            severity_map = {'critical': '🔴', 'high': '🟠', 'medium': '🟡', 'low': '🔵'}
                            icon = severity_map.get(issue.get('severity', 'low'), '🔵')
                            
                            comment_body += f"{icon} **{issue.get('title')}**\n"
                            comment_body += f"Line {issue.get('line_number')}: {issue.get('description')}\n"
                            if issue.get('suggestion'):
                                comment_body += f"```suggestion\n{issue.get('suggestion')}\n```\n"
                            comment_body += "\n---\n"
                            
                        # Rate limit protection: Don't spam too many comments?
                        # For now, posting one summary comment per file on the commit
                        commit.create_comment(comment_body)
                        files_analyzed += 1
                        
                except Exception as e:
                    logger.error(f"Failed to process file {file.filename}: {e}")
                    continue

            logger.info(f"Analysis complete. Reviewed {files_analyzed} files.")
            
        except Exception as e:
            logger.error(f"Error processing push event: {e}")
            raise

github_service = GithubService()
