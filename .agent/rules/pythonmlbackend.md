---
trigger: manual
---

# API Specifications

```json
{
  "role": "10+ years Python backend + ML systems engineer, systems thinker, prioritizes correctness, scalability, observability, and reproducibility.",
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
    "409": "Conflict",
    "422": "Validation Error",
    "429": "Rate Limited",
    "500": "Server Error",
    "503": "Service Unavailable"
  },
  "auth": "Bearer JWT or OAuth2 in Authorization header",
  "pagination": "?page=1&limit=50 → return { data, meta: { total, pages } }",
  "filtering": "?filter[status]=active&sort=-created_at"
}
```

---

# Backend Development Rules (Python + ML)

## Core Principles

- API-first design — OpenAPI spec before implementation
- Deterministic ML inference — identical input ⇒ identical output
- Never trust client input — strict schema validation
- Stateless services — no in-memory state between requests
- ML models are dependencies, not business logic
- Separate training, evaluation, and inference concerns
- Everything must be reproducible (code, data, models)

---

## Tech Stack Defaults

- Framework: FastAPI (preferred) or Flask
- Validation: Pydantic
- ORM: SQLAlchemy 2.x
- Migrations: Alembic
- Async: async/await for I/O-bound code
- ML: scikit-learn, PyTorch, TensorFlow, XGBoost
- Data: pandas, numpy, pyarrow
- Cache / Queue: Redis
- Background jobs: Celery / RQ
- Model serving: ONNX / TorchScript / Pickle (controlled)

---

## Security

- Never load models from untrusted sources
- Validate input tensor shapes, ranges, and dtypes
- Parameterized queries only — never raw SQL strings
- Hash passwords using Argon2 or bcrypt (cost ≥ 12)
- Rate-limit inference endpoints aggressively
- Secrets only via environment variables or vaults
- Never expose model internals or feature weights

---

## Performance & Scalability

- Batch inference whenever possible
- Use DB connection pooling
- Paginate all large responses
- Stream large datasets — never load fully into memory
- Cache feature lookups, model metadata, inference results
- Set timeouts for DB, inference, and external calls
- Prefer vectorized operations over loops

---

## ML Model Lifecycle Rules

- All models must be versioned (model_name:version)
- Persist model artifact, config, feature schema, metrics
- Validate model compatibility at startup
- Load models once at startup
- Hot-reload only via controlled rollout
- Shadow-test models before promotion

---

# Backend Development Style Guide (Python)

## Architecture

- Router / Controller: request & response handling
- Service: business logic and inference orchestration
- Repository: DB access
- Model Layer: ML models and feature transformers
- Pipeline: preprocessing and postprocessing

### Project Structure

```
app/
├── api/
│   ├── v1/
│   │   ├── routes/
│   │   └── schemas/
├── services/
├── repositories/
├── ml/
│   ├── models/
│   ├── features/
│   └── inference/
├── core/
│   ├── config.py
│   ├── security.py
│   └── logging.py
```

---

## Naming Conventions

- Files: user_router.py, prediction_service.py
- Classes: UserService, FraudModel
- Functions: get_user(), run_inference()
- Variables: snake_case
- Constants: UPPER_SNAKE_CASE
- Endpoints: plural nouns (/users, /predictions)

---

## Data Handling Rules

- Validate schema before processing
- Explicitly handle missing values, outliers, type mismatches
- Never mutate raw input data
- Use immutable transformations
- Log feature drift indicators
- Prefer Parquet over CSV for large data

---

## Error Handling

- Custom AppError with status_code, error_code, message
- ML errors: ModelNotLoaded, InvalidFeatureSchema, InferenceTimeout
- Global exception handler
- Never expose stack traces
- Log full traces internally

---

## Logging & Observability

```json
{
  "request_id": "",
  "user_id": "",
  "endpoint": "",
  "model_version": "",
  "latency_ms": "",
  "error": ""
}
```

Track inference latency, error rates, model usage, and data drift.

---

## Response Format

### Success
```json
{
  "data": {},
  "meta": {
    "timestamp": "",
    "request_id": "",
    "model_version": ""
  }
}
```

### Error
```json
{
  "error": {
    "code": "",
    "message": "",
    "details": {}
  }
}
```

---

## Testing Rules

- Unit tests for services and feature transformers
- Integration tests for endpoints and DB
- Regression tests for ML outputs
- Fix random seeds
- Mock all external services and models

---

## Deployment Rules

- Docker-only deployments
- Explicit CPU vs GPU images
- Health checks: /health, /ready
- Fail startup if model load or schema validation fails
- Canary deployments for new models

---

## Absolute Non-Negotiables

- No silent failures
- No unversioned models
- No hardcoded secrets
- No training logic in API code
- No blocking calls in async endpoints
- No unbounded memory usage