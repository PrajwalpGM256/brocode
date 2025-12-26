import hmac
import hashlib
import asyncio
from fastapi import APIRouter, Request, HTTPException, Header, BackgroundTasks
from typing import Optional
import os

router = APIRouter()


def verify_signature(payload: bytes, signature: str, secret: str) -> bool:
    """Verify GitHub webhook signature."""
    if not signature:
        return False
    expected = "sha256=" + hmac.new(
        secret.encode(), payload, hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature)


@router.post("/github")
async def github_webhook(
    request: Request,
    background_tasks: BackgroundTasks,
    x_hub_signature_256: Optional[str] = Header(None),
    x_github_event: Optional[str] = Header(None),
):
    """Handle GitHub webhook events."""
    payload = await request.body()
    
    # Verify signature
    secret = os.getenv("GITHUB_WEBHOOK_SECRET", "")
    if secret and not verify_signature(payload, x_hub_signature_256 or "", secret):
        raise HTTPException(status_code=401, detail="Invalid signature")
    
    try:
        data = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON")
    
    if x_github_event == "ping":
        return {"status": "pong", "message": "Webhook connected successfully!"}
    
    elif x_github_event == "push":
        return handle_push(data)
    
    elif x_github_event == "pull_request":
        return await handle_pull_request(data, background_tasks)
    
    return {"status": "ignored", "event": x_github_event}


def handle_push(data: dict):
    """Handle push events."""
    repo = data.get("repository", {}).get("full_name", "unknown")
    ref = data.get("ref", "")
    commits = data.get("commits", [])
    
    print(f"📦 Push to {repo} on {ref}: {len(commits)} commit(s)")
    
    return {"status": "received", "event": "push", "commits": len(commits)}


async def handle_pull_request(data: dict, background_tasks: BackgroundTasks):
    """Handle pull request events."""
    action = data.get("action", "")
    pr = data.get("pull_request", {})
    repo_data = data.get("repository", {})
    
    repo_full = repo_data.get("full_name", "")
    owner, repo = repo_full.split("/") if "/" in repo_full else ("", "")
    
    pr_number = pr.get("number")
    pr_title = pr.get("title", "")
    
    print(f"🔀 PR #{pr_number} {action} in {repo_full}: {pr_title}")
    
    # Only review on opened or synchronize (new commits pushed)
    if action in ["opened", "synchronize"]:
        # Import here to avoid circular imports
        from app.services.pr_review_service import review_pull_request
        
        # Run review in background so we respond quickly to GitHub
        background_tasks.add_task(review_pull_request, owner, repo, pr_number, pr_title)
        
        return {
            "status": "processing",
            "event": "pull_request",
            "action": action,
            "pr_number": pr_number,
            "message": "Code review started"
        }
    
    return {"status": "ignored", "action": action}
