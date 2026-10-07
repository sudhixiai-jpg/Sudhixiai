# Authentication

Strategy: **HttpOnly session cookies**, chosen over token auth per the
project's stated preference for browser clients talking to a same-site
(or CORS-with-credentials) Django API over HTTPS.

## Flow

1. `GET /api/v1/auth/csrf/` -- sets the `csrftoken` cookie. Call once
   before any unsafe request (SPA bootstrap).
2. `POST /api/v1/auth/register/` -- creates the user (inactive email
   verification state) and sends a verification email via Celery.
3. `POST /api/v1/auth/login/` -- authenticates and calls Django's
   `login()`, issuing the session cookie. Requires the `X-CSRFToken` header
   to match the `csrftoken` cookie.
4. `POST /api/v1/auth/logout/` -- clears the session.
5. `GET /api/v1/auth/me/` -- returns the current user.
6. `POST /api/v1/auth/password-reset/` and
   `POST /api/v1/auth/password-reset/confirm/` -- token-based reset,
   tokens expire after 24 hours and are single-use. The request endpoint
   always returns the same message whether or not the email exists, to
   avoid leaking account existence.
7. `POST /api/v1/auth/email-verification/confirm/` -- confirms the emailed
   token.

## Notes

- No long-lived secret is ever placed in `localStorage`.
- `AuthThrottle` rate-limits register/login/password-reset to blunt
  credential-stuffing and enumeration attempts.
- Staff/admin API access (`apps.common.permissions.IsStaffUser`) is
  separate from organization membership (`apps.organizations.permissions`),
  which governs SaaS tenant isolation.
