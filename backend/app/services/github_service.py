import httpx
import os
from typing import Optional

class GitHubService:
    """Service for interacting with GitHub API."""
    
    def __init__(self):
        self.token = os.getenv("GITHUB_TOKEN")
        self.base_url = "https://api.github.com"
        self.headers = {
            "Authorization": f"token {self.token}",
            "Accept": "application/vnd.github.v3+json",
        }
    
    async def get_pr_diff(self, owner: str, repo: str, pr_number: int) -> Optional[str]:
        """Fetch the diff for a pull request."""
        url = f"{self.base_url}/repos/{owner}/{repo}/pulls/{pr_number}"
        headers = {**self.headers, "Accept": "application/vnd.github.v3.diff"}
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=headers)
            if response.status_code == 200:
                return response.text
            print(f"Failed to fetch diff: {response.status_code}")
            return None
    
    async def get_pr_files(self, owner: str, repo: str, pr_number: int) -> list:
        """Fetch list of files changed in a PR."""
        url = f"{self.base_url}/repos/{owner}/{repo}/pulls/{pr_number}/files"
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=self.headers)
            if response.status_code == 200:
                return response.json()
            return []
    
    async def post_pr_comment(
        self, owner: str, repo: str, pr_number: int, body: str
    ) -> bool:
        """Post a comment on a pull request."""
        url = f"{self.base_url}/repos/{owner}/{repo}/issues/{pr_number}/comments"
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                url, 
                headers=self.headers, 
                json={"body": body}
            )
            if response.status_code == 201:
                print(f"✅ Comment posted on PR #{pr_number}")
                return True
            print(f"❌ Failed to post comment: {response.status_code}")
            return False


github_service = GitHubService()
