import hmac
import hashlib
from fastapi import APIRouter, Request, HTTPException, Header
from typing import Optional
import os

router = APIRouter()

def verify_signature(payload: bytes, signature: str, secret: str) -> bool:
    """Verify GitHub webhook signature."""
    if not signature:
        return False
    
    expected = "sha256=" + hmac.new(
        secret.encode(),
        payload,
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(expected, signature)


@router.post("/github")
async def github_webhook(
    request: Request,
    x_hub_signature_256: Optional[str] = Header(None),
    x_github_event: Optional[str] = Header(None),
):
    """Handle GitHub webhook events."""
    
    # Get the raw payload
    payload = await request.body()
    
    # Verify signature
    secret = os.getenv("GITHUB_WEBHOOK_SECRET", "")
    if secret and not verify_signature(payload, x_hub_signature_256 or "", secret):
        raise HTTPException(status_code=401, detail="Invalid signature")
    
    # Parse the JSON payload
    data = await request.json()
    
    # Handle different event types
    if x_github_event == "ping":
        return {"status": "pong", "message": "Webhook connected successfully!"}
    
    elif x_github_event == "push":
        return await handle_push(data)
    
    elif x_github_event == "pull_request":
        return await handle_pull_request(data)
    
    return {"status": "ignored", "event": x_github_event}


async def handle_push(data: dict):
    """Handle push events."""
    repo = data.get("repository", {}).get("full_name", "unknown")
    ref = data.get("ref", "")
    commits = data.get("commits", [])
    
    print(f"📦 Push to {repo} on {ref}: {len(commits)} commit(s)")
    
    return {
        "status": "received",
        "event": "push",
        "repo": repo,
        "ref": ref,
        "commits": len(commits)
    }


async def handle_pull_request(data: dict):
    """Handle pull request events."""
    action = data.get("action", "")
    pr = data.get("pull_request", {})
    repo = data.get("repository", {}).get("full_name", "unknown")
    
    pr_number = pr.get("number")
    pr_title = pr.get("title", "")
    pr_url = pr.get("html_url", "")
    
    print(f"🔀 PR #{pr_number} {action} in {repo}: {pr_title}")
    
    # TODO: Add code review logic here
    # - Fetch the PR diff
    # - Send to Gemini for review
    # - Post comments back to GitHub
    
    return {
        "status": "received",
        "event": "pull_request",
        "action": action,
        "repo": repo,
        "pr_number": pr_number,
        "pr_title": pr_title
    }
