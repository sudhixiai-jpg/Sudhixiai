# SUDHIXAI — Frontend (Phase 1 / P0)

Next.js implementation of the SUDHIXAI homepage, built from the approved
Stitch design system ("Deep Tech Architecture").

## Status

**Done (this phase):**
- Design tokens (color, spacing, type scale) ported 1:1 from the Stitch
  `tailwind.config` block into `tailwind.config.ts`.
- Responsive `Navbar` (mobile drawer + desktop Solutions mega-menu) and `Footer`.
- All 14 homepage sections, reproducing the mobile Stitch screen's exact copy
  and structure, extrapolated responsively for tablet/desktop (no desktop
  homepage screen was supplied — see Known Gaps).
- Data-driven content (`/data/*.ts`) instead of hardcoded markup, so services,
  industries, products, insights etc. can later be swapped for a Django API
  response with no component changes.
- `npx tsc --noEmit` and `npx next build` both pass cleanly.

**Not built yet (later phases, per the P0→P3 priority order):**
- Every other route (`/solutions/*`, `/products`, `/technology`, `/industries`,
  `/insights/[slug]`, `/about`, `/careers`, `/contact`, `/privacy`, `/terms`).
- The Django backend, database, admin, auth, AI/automation architecture,
  Docker, and docs (PDD/PRD/ARCHITECTURE/API/SECURITY/DEPLOYMENT).
- Contact form and newsletter wiring (no backend exists yet to submit to).
- Tests.

## Known gaps / decisions made without you

- **No desktop Homepage screen was in the upload** (only
  `sudhixai_official_homepage_mobile`). Desktop/tablet layouts here are a
  reasonable extrapolation using the same design system and component
  patterns seen in other desktop screens in the bundle — not a 1:1
  reproduction of an approved desktop comp. Flag anything that looks off so
  it can be corrected against a real desktop reference.
- **Featured Insights article image**: the Stitch design referenced a
  Google-hosted placeholder image URL. Per the "never fabricate imagery /
  don't hotlink assets we don't control" rule, this was replaced with an
  abstract CSS gradient instead.
- **JetBrains Mono**: the design spec calls for it, but fetching Google Fonts
  at build time requires network access this sandbox didn't have. Geist Mono
  (self-hosted via the official `geist` npm package, zero network calls) is
  used as the closest-fidelity stand-in. To get pixel-exact JetBrains Mono:
  download the font files, drop them in `public/fonts/`, and load them with
  `next/font/local` in `app/layout.tsx` — a small, mechanical swap.
- **Contact details**: no real email/phone/address was supplied, so the
  footer shows "Contact details coming soon." rather than inventing one.

## Local development

```bash
cd frontend
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run lint
```

## Project structure

```
frontend/
├── app/                  # Next.js App Router (layout, homepage, globals.css)
├── components/
│   ├── layout/           # Navbar, Footer
│   ├── ui/               # SectionHeader, Reveal (scroll-in animation)
│   └── sections/         # One component per homepage section
├── config/site.ts        # Centralized company/nav config — edit values here
├── data/                 # Data-driven content (services, industries, etc.)
├── lib/accent.ts         # Design-token accent-color helpers
├── types/                # Shared TypeScript interfaces
└── tailwind.config.ts    # Design tokens ported from the Stitch design system
```
