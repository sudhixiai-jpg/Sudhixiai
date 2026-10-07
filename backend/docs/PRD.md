# Product Requirements (backend scope)

Turn the existing SUDHIXAI Next.js frontend (currently a static P0
homepage) into a real, API-driven platform without changing its visual
design. See `docs/ARCHITECTURE.md` for the system diagram and
`docs/API.md` for the concrete contract. Content that cannot yet be
verified (performance claims, compliance claims, product availability,
customer data) must never be presented as fact -- it stays
admin-editable and defaults to neutral/empty states (see
`docs/SECURITY.md` and the "no fake data" rule throughout the codebase).
