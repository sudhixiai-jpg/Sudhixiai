# Architecture

SUDHIXAI is a modular monolith: one Django project, cleanly separated
Django apps under `apps/`, no microservices.

```
                    INTERNET
                       |
                    NGINX
                       |
             +---------+---------+
             |                   |
          Next.js             Django API (DRF)
             |                   |
             |             apps/* modules
             |                   |
             |          +--------+--------+
             |          |        |        |
             |       PostgreSQL Redis   Storage (local / S3)
             |                   |
             |                 Celery (worker + beat)
             |                   |
             |            Background jobs: email, AI usage
             |                   |          logging, automation execution
             +----------------------------->
```

## AI architecture

```
Next.js -> Django API -> AI service layer -> Provider abstraction -> Vendor SDK
```

The browser never talks to OpenAI/Anthropic/Google directly and never sees
a provider API key. `apps/ai/providers.py` defines the `AIProvider`
interface; today it resolves to `UnconfiguredProvider`, which raises a
typed `AIProviderError` instead of faking a response, because no vendor
key is configured in this environment. Wiring in a real vendor SDK is a
drop-in addition behind the same interface.

## Automation architecture

```
Trigger -> Condition -> AI / Processing -> Action -> Result -> Execution log
```

`apps/automation` only defines the domain models
(`AutomationWorkflow/Trigger/Step/Execution`) and admin. Per the build
spec, no visual workflow engine or execution runtime is built yet --
`AutomationExecution` rows can be created by future Celery tasks once a
real workflow interpreter exists.

## App responsibilities

| App | Responsibility |
|---|---|
| `common` | Base models, pagination, exception handling, request-ID middleware, throttling, shared permissions |
| `accounts` | Custom email-based User, session auth, registration, password reset, email verification |
| `company` | Singleton site configuration (brand, contact, SEO defaults) |
| `services` | Service categories, services, FAQs |
| `products` | Products, product features |
| `insights` | Blog/CMS: categories, authors, tags, insights |
| `industries` | Industry content |
| `technology` | Technology stack content |
| `careers` | Jobs, applications, private resume storage |
| `contact` | Public lead capture, staff-only submission review |
| `newsletter` | Subscribers, subscribe/unsubscribe |
| `organizations` | Multi-tenant foundation: organizations, membership, isolation helpers |
| `ai` | Provider-agnostic AI abstraction, usage tracking, foundation endpoints |
| `automation` | Workflow/trigger/step/execution domain models (foundation only) |
| `notifications` | Email provider abstraction + Celery-backed sending |
| `file_storage` | Public vs private storage abstraction (local disk / S3-compatible) |
| `audit` | Append-only audit log |
