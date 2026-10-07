# Project Design Document

- **Style**: modular monolith, Django + DRF, PostgreSQL, Redis/Celery,
  Next.js frontend consuming the API over `NEXT_PUBLIC_API_URL`.
- **Non-goals for this phase**: microservices, a visual automation
  builder, live AI vendor integration, payments/billing, full RAG
  pipeline -- all represented as clean foundations (models + interfaces)
  rather than built out end-to-end, per the build spec's phased approach.
- **Content integrity**: every content model exists so a human can
  correct/replace placeholder copy through Django Admin before it's
  public; nothing here fabricates business facts.
