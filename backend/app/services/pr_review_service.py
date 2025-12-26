from app.services.github_service import github_service
from app.core.gemini_client import gemini_client as gemini # Use the existing global instance

PR_REVIEW_PROMPT = """You are CodeBro, an AI code reviewer. Review this pull request diff and provide helpful feedback.

## PR Diff:
```
{diff}
```

## Instructions:
1. Identify any bugs, security issues, or code smells
2. Suggest improvements for code quality
3. Point out any best practices that could be applied
4. Be constructive and helpful

## Response Format:
Use this exact format for your review:

## 🤖 CodeBro Review

### Summary
[Brief 1-2 sentence summary of the changes]

### Issues Found
[List any issues, or "No critical issues found!" if none]

### Suggestions
[List improvement suggestions with specific line references if possible]

### Overall
[Give a brief overall assessment: ✅ Looks good / ⚠️ Needs attention / ❌ Needs fixes]

---
*Automated review by CodeBro - AI-Powered Code Review*
"""


async def review_pull_request(owner: str, repo: str, pr_number: int, pr_title: str):
    """Fetch PR diff, review with Gemini, and post comment."""
    
    print(f"🔍 Reviewing PR #{pr_number}: {pr_title}")
    
    # 1. Fetch the diff
    diff = await github_service.get_pr_diff(owner, repo, pr_number)
    if not diff:
        print("❌ Could not fetch PR diff")
        return False
    
    # Truncate if too long (Gemini has limits)
    if len(diff) > 15000:
        diff = diff[:15000] + "\n... (truncated)"
    
    print(f"📄 Got diff: {len(diff)} characters")
    
    # 2. Send to Gemini for review
    prompt = PR_REVIEW_PROMPT.format(diff=diff)
    
    try:
        # Use existing client method if possible, or add generate_review to it
        review = await gemini.generate_review(prompt) 
        print(f"✨ Gemini review generated: {len(review)} characters")
    except Exception as e:
        print(f"❌ Gemini error: {e}")
        return False
    
    # 3. Post comment on PR
    success = await github_service.post_pr_comment(owner, repo, pr_number, review)
    
    return success
