# Operations

## Health checks

- `GET /health/` -- liveness, always `{"status": "ok"}` if the process is up.
- `GET /ready/` -- readiness, checks DB and cache connectivity;
  returns `503` with a `checks` breakdown if either is down. No internal
  diagnostic detail (no stack traces, no connection strings) is exposed.

## Logging

Structured (JSON-ish) logs to stdout: timestamp, level, logger, message.
Request ID (`apps.common.middleware.RequestIDMiddleware`) is attached to
every request/response (`X-Request-ID` header) and included in error
responses and unhandled-exception logs for correlation. Passwords, API
keys, auth headers, and full sensitive payloads are never logged.

## Background jobs (Celery)

- Broker/result backend: Redis (`REDIS_URL`).
- Used for: verification/reset emails, contact/newsletter/job-application
  notifications. `send_email_task` retries up to 3 times on provider
  failure.
- Run a worker: `celery -A config worker -l info`.
- Run beat (for future scheduled jobs): `celery -A config beat -l info`.

## Backups (to configure per hosting provider)

- PostgreSQL: nightly `pg_dump` (or managed provider's automated backups)
  with a tested restore procedure; this repo does not claim a backup
  exists until one is actually configured against a real environment.
- Media: back up whichever object storage bucket / volume is used the
  same way as the database.
