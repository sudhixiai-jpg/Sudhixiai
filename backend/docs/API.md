# API Reference

Base path: `/api/v1/`. Interactive docs: `/api/docs/` (Swagger UI),
`/api/redoc/` (ReDoc), raw schema at `/api/schema/` (drf-spectacular).

## Response envelope

List endpoints (DRF pagination):
```json
{"success": true, "count": 42, "next": "...", "previous": null, "results": [...]}
```

Action endpoints:
```json
{"success": true, "message": "...", "data": {...}}
```

Errors:
```json
{"success": false, "message": "...", "errors": {...}, "request_id": "..."}
```

## Public endpoints

| Method | Path | Notes |
|---|---|---|
| GET | `/services/`, `/services/{slug}/` | filter: `category__slug`, `is_featured`; search; ordering |
| GET | `/services/categories/` | |
| GET | `/services/faqs/` | filter: `category__slug`, `service__slug` |
| GET | `/products/`, `/products/{slug}/` | only `is_active & is_public` |
| GET | `/insights/`, `/insights/{slug}/` | only `PUBLISHED`; filter: `category__slug`, `tags__slug`, `featured` |
| GET | `/insights/categories/` | |
| GET | `/industries/`, `/industries/{slug}/` | |
| GET | `/technology/`, `/technology/{slug}/`, `/technology/categories/` | |
| GET | `/careers/jobs/`, `/careers/jobs/{slug}/` | only `OPEN`; empty list if none |
| POST | `/careers/jobs/{slug}/apply/` | multipart, resume required |
| POST | `/contact/` | rate-limited, honeypot field `website` |
| POST | `/newsletter/subscribe/`, `/newsletter/unsubscribe/` | |
| GET | `/company/` | site configuration |
| POST | `/auth/register/`, `/auth/login/`, `/auth/logout/` | see AUTHENTICATION.md |
| POST | `/auth/password-reset/`, `/auth/password-reset/confirm/` | |
| POST | `/auth/email-verification/confirm/` | |
| GET | `/auth/csrf/`, `/auth/me/` | |

## Private endpoints (auth required)

| Method | Path | Auth |
|---|---|---|
| GET | `/contact/submissions/` | staff only |
| GET/POST | `/organizations/` | authenticated; scoped to the user's own orgs |
| POST | `/ai/generate/`, `/ai/chat/`, `/ai/embed/` | authenticated, rate-limited, foundation only (see below) |

## AI endpoints

These are wired end-to-end (auth, throttling, usage logging) but return a
`503` with `{"errors": {"code": "provider_not_configured"}}` until a real
vendor is enabled in `AIProviderConfig` **and** the matching API key
environment variable is set. This is intentional per the "no fake
implementations" rule -- the foundation is real, the vendor call is not
pretended.
