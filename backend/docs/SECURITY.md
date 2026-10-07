# Security

- `DEBUG=False` in production (`config/settings/production.py`).
- `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`, `CSRF_TRUSTED_ORIGINS` are all
  environment-driven; `CORS_ALLOW_ALL_ORIGINS` is never set to `True`.
- Passwords hashed with Argon2 (`PASSWORD_HASHERS`), Django's validators
  enforce a 10-character minimum plus the standard checks.
- Authentication is HttpOnly, `SameSite=Lax` session-cookie based
  (`apps.accounts`), matching the Next.js + Django REST + HTTPS
  architecture. CSRF is enforced on all unsafe requests; the frontend
  reads the CSRF cookie via `/api/v1/auth/csrf/` and sends
  `X-CSRFToken` on POST/PUT/PATCH/DELETE.
- Production hardens: `SECURE_SSL_REDIRECT`, `SESSION_COOKIE_SECURE`,
  `CSRF_COOKIE_SECURE`, HSTS (1 year, subdomains, preload),
  `SECURE_PROXY_SSL_HEADER` for the Nginx-terminated-TLS setup.
- Consistent security headers: `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`.
- All API errors are normalized through `apps.common.exceptions.api_exception_handler`;
  stack traces, DB errors, and secrets are never returned to the client --
  only logged server-side with a `request_id` for correlation.
- Rate limiting (DRF `ScopedRateThrottle`) on contact, newsletter, auth,
  job applications, and AI endpoints; public content GETs are unthrottled
  by default so the site itself stays fast.
- AI provider API keys live only in environment variables
  (`OPENAI_API_KEY`, etc.) read by `apps/ai/providers.py`; they are never
  persisted to the database or returned by any API response.
- Resume uploads (`apps.careers`) are validated by extension and size,
  renamed to a random filename, and stored in `private_storage`
  (never reachable through a public media URL).
- `AuditLog` is append-only in the admin (add/change/delete all disabled)
  and never stores secrets in `metadata`.
