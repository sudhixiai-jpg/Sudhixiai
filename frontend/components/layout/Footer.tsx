import Link from "next/link";
import { siteConfig, footerNav } from "@/config/site";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] bg-surface-container-lowest">
      {/* Top gradient accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tertiary/40 to-transparent" />

      <div className="mx-auto max-w-content px-grid-margin-mobile py-space-3xl md:px-grid-margin-desktop">
        <div className="grid grid-cols-1 gap-space-2xl md:grid-cols-4">
          {/* Brand column */}
          <div className="flex flex-col gap-space-sm md:col-span-1">
            <div className="flex items-center gap-space-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-tertiary/30 bg-gradient-to-br from-tertiary/20 to-primary/10 font-mono text-mono-label font-bold text-tertiary shadow-glow-cyan">
                S
              </div>
              <span className="bg-gradient-to-r from-white to-on-surface bg-clip-text font-sans text-headline-sm font-semibold text-transparent">
                SUDHIXAI
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              {siteConfig.description}
            </p>
            <span className="font-mono text-mono-caption uppercase tracking-wider text-on-surface-variant">
              {siteConfig.legalName}
            </span>
          </div>

          <FooterColumn title="Solutions" links={footerNav.solutions} />
          <FooterColumn title="Company" links={footerNav.company} />

          <div className="flex flex-col gap-space-sm">
            <span className="font-mono text-mono-label uppercase tracking-wider text-on-surface-variant">
              Contact
            </span>
            {siteConfig.contactEmail && (
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="font-body-sm text-body-sm text-on-surface-variant transition-colors hover:text-tertiary"
              >
                {siteConfig.contactEmail}
              </a>
            )}
            {siteConfig.contactPhone && (
              <a
                href={`tel:${siteConfig.contactPhone.replace(/\s/g, "")}`}
                className="font-body-sm text-body-sm text-on-surface-variant transition-colors hover:text-tertiary"
              >
                {siteConfig.contactPhone}
              </a>
            )}
            {siteConfig.address && (
              <span className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                {siteConfig.address}
              </span>
            )}
            {/* Status indicator */}
            <div className="flex items-center gap-space-xs">
              <div className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80] animate-pulse" />
              <span className="font-mono text-mono-caption text-on-surface-variant">
                All systems operational
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-space-2xl flex flex-col gap-space-sm border-t border-white/[0.06] pt-space-lg md:flex-row md:items-center md:justify-between">
          <span className="font-mono text-mono-caption text-on-surface-variant">
            &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </span>
          <div className="flex gap-space-base">
            {footerNav.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body-sm text-body-sm text-on-surface-variant transition-colors hover:text-tertiary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div className="flex flex-col gap-space-sm">
      <span className="font-mono text-mono-label uppercase tracking-wider text-on-surface-variant">
        {title}
      </span>
      <nav className="flex flex-col gap-space-xs">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center gap-1 font-body-sm text-body-sm text-on-surface-variant transition-colors hover:text-tertiary"
          >
            <span className="inline-block w-0 overflow-hidden transition-all duration-200 group-hover:w-2 text-tertiary text-xs">›</span>
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
