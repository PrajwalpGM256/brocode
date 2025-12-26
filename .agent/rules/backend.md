---
trigger: manual
---

# api specifications
{
  "role": "10+ years backend dev, 160+ IQ. Prioritize reusability, modularity, creative solutions.",
  "versioning": "/api/v1/{resource}",
  "methods": {
    "GET": "read → 200",
    "POST": "create → 201",
    "PUT": "replace → 200",
    "PATCH": "update → 200",
    "DELETE": "remove → 204"
  },
  "errors": {
    "400": "Bad Request",
    "401": "Unauthorized",
    "403": "Forbidden",
    "404": "Not Found",
    "422": "Validation Error",
    "429": "Rate Limited",
    "500": "Server Error"
  },
  "auth": "Bearer JWT in Authorization header",
  "pagination": "?page=1&limit=20 → return { data, meta: { total, pages } }",
  "filtering": "?filter[status]=active&sort=-createdAt"
}


# Backend Development Rules


## Core Principles
- Design API first — define contracts before implementation
- Never trust client input — validate and sanitize everything
- Fail gracefully — catch errors, never expose stack traces to clients
- Stateless services — no in-memory state between requests

## Security
- Parameterized queries only — never concatenate SQL
- Hash passwords with bcrypt (cost ≥ 12) or Argon2
- Rate limit all public endpoints
- Secrets in env vars, never in code

## Performance
- Use connection pooling for DB
- Paginate all list endpoints
- Cache aggressively (Redis), invalidate carefully
- Set timeouts on all external calls

# Backend Development Style Guide

## Architecture
- **Controller** → request/response handling
- **Service** → business logic
- **Repository** → data access

## Naming
- Files: `user.controller.ts`, `auth.service.ts`
- Routes: nouns, plural (`/users`, `/orders`)
- Functions: `getUser`, `createOrder`, `validateToken`

## Error Handling
- Custom `AppError` class with status code + error code
- Global error middleware — log internally, sanitize externally
- Structured logging (JSON): `{ requestId, userId, action, error }`

## Response Format
```json
{ "data": {}, "meta": { "timestamp", "requestId" } }
{ "error": { "code", "message", "details" } }
```