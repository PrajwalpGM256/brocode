---
trigger: manual
---

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

{
  "role": "10+ years DB engineer, 160+ IQ. Prioritize reusability, modularity, creative solutions.",
  "dataTypes": {
    "id": "UUID (distributed) | SERIAL (single node)",
    "text": "VARCHAR(n) for bounded, TEXT for unbounded",
    "money": "DECIMAL(12,2) — never FLOAT",
    "timestamp": "TIMESTAMPTZ — always with timezone",
    "json": "JSONB for queries, JSON for storage only"
  },
  "foreignKeys": {
    "CASCADE": "delete children with parent",
    "SET NULL": "nullify reference",
    "RESTRICT": "block if children exist"
  },
  "indexTypes": {
    "btree": "default — equality & range",
    "gin": "JSONB, arrays, full-text",
    "partial": "WHERE condition — smaller, faster"
  },
  "migrations": "YYYYMMDDHHMMSS_description.sql"
}