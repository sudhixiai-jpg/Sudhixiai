# SUDHIXAI Platform

Full-stack SUDHIXAI: the existing Next.js frontend (`frontend/`, unchanged
visually) plus a new production Django REST backend (`backend/`).

```
SUDHIXAI.COM -> Next.js -> Django REST API -> PostgreSQL / Redis / Celery
```

## What's implemented

- **Project & settings architecture**: `config/settings/{base,development,production}.py`,
  environment-driven via `django-environ`.
- **Custom, email-based User model** (`apps.accounts`), created before any migrations.
- **Content domains**, all admin-manageable, all public endpoints returning
  only active/published content: services + categories + FAQs, products,
  insights (full CMS: authors/categories/tags/statuses), industries,
  technology, careers (jobs + applications with private resume storage),
  company/site configuration.
- **Lead capture**: contact form (honeypot + rate limiting + staff-only
  read access) and newsletter (subscribe/unsubscribe, duplicate-safe).
- **Authentication**: HttpOnly session cookies, registration, login/logout,
  email verification, password reset -- see `docs/AUTHENTICATION.md`.
- **Organizations**: multi-tenant foundation with enforced membership
  isolation (`apps.organizations.permissions`).
- **AI platform foundation**: provider-agnostic interface
  (`apps.ai.providers.AIProvider`), usage tracking, authenticated +
  rate-limited endpoints that return a clear "not configured" error
  rather than a fake response (no vendor key present in this environment).
- **Automation foundation**: `AutomationWorkflow/Trigger/Step/Execution`
  domain models + admin (no execution engine yet, per spec).
- **Notifications**: email provider abstraction, Celery-backed sending,
  console backend in development.
- **File storage abstraction**: public vs private storage, local disk in
  dev, S3-compatible object storage in production via `USE_S3_STORAGE`.
- **Audit log**: append-only, admin-visible, no secrets stored.
- **Cross-cutting**: request-ID middleware, centralized exception handling
  with a consistent `{success, message, errors}` envelope, DRF pagination,
  filtering/search/ordering, scoped rate limiting, drf-spectacular API
  docs, health/readiness checks, structured logging.
- **Frontend integration layer**: `frontend/lib/api/*` -- a typed fetch
  client and per-domain functions (`services.ts`, `products.ts`,
  `insights.ts`, `industries.ts`, `technology.ts`, `company.ts`,
  `contact.ts`, `newsletter.ts`) ready for the existing components to call
  instead of the local `data/*.ts` files.
- **Docker**: `docker-compose.yml` wiring postgres, redis, backend,
  celery, celery-beat, frontend, and an nginx reverse proxy.
- **Tests**: `backend/tests/` covers the critical security behaviors
  called out in the spec (organization isolation, draft content hidden,
  closed jobs reject applications, contact validation + honeypot,
  newsletter dedup, AI endpoints require auth, no raw API keys stored).
- **Docs**: `backend/docs/{ARCHITECTURE,DATABASE,SECURITY,AUTHENTICATION,API,DEPLOYMENT,OPERATIONS,PRD,PDD}.md`.

## Quick start

See `backend/docs/DEPLOYMENT.md` for full instructions. Short version:

```bash
cp backend/.env.example backend/.env
docker compose up -d postgres redis
cd backend && pip install -r requirements/development.txt
python manage.py makemigrations   # see docs/DATABASE.md for app labels
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_content
python manage.py runserver

# new terminal
celery -A config worker -l info

# new terminal
cd frontend && cp .env.local.example .env.local && npm install && npm run dev
```

Or everything via Docker: `docker compose up --build`.

## Honest status / what's genuinely incomplete

This backend was built and reviewed in an environment with **no internet
access and no Django installation available**, so nothing below could be
executed or verified here -- only written and manually checked (every
`.py` file parses; see `docs/DATABASE.md`):

- **Migrations are not generated.** `apps/*/migrations/` contain only
  `__init__.py`. Run `makemigrations`/`migrate` locally as the very first
  step -- this is not optional polish, it's required before anything else
  works.
- **The test suite has not been run.** The tests in `backend/tests/` are
  real (they hit real endpoints against a real test DB via
  `pytest-django`), but `pytest` has never actually executed them here.
- **No live AI vendor is wired in.** The abstraction, config model, and
  usage tracking are real; OpenAI/Anthropic/Google clients are not
  implemented behind it (per the "no fake implementations" rule) --
  add one behind `AIProvider` when a key and a real use case exist.
- **No automation execution engine.** Only the domain models exist, as
  the spec requested for this phase.
- **Frontend components still render from `data/*.ts`.** The API client
  library exists and is typed to match the backend, but wiring each
  existing section component to fetch from it (and adding the
  `/solutions`, `/products`, `/insights`, `/contact` etc. routes the nav
  already links to, which don't exist yet in this P0 frontend) is the
  remaining integration step -- deliberately not done blindly to avoid
  changing the approved visual design without the ability to test the
  result.
- **Docker Compose / Dockerfiles are written but not built or run** here
  (no network in this environment to pull base images).
- **No CI, no real email/SMS provider, no payment/billing integration,
  no S3 bucket actually provisioned** -- all represented as configuration
  surfaces (`.env.example`, storage/email abstractions) rather than live
  integrations, matching the spec's own "no fake data" instruction.

Recommended next step: run the Quick start above locally (or in an
environment with internet access) and fix anything that surfaces from
actually executing `migrate`, `runserver`, and `pytest` -- treat this
delivery as a complete, reviewed first draft rather than a verified one.
