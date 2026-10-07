"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, ChevronDown, CircleUser, Sparkles } from "lucide-react";
import { primaryNav } from "@/config/site";
import { services } from "@/data/services";

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <header className="fixed top-0 z-50 w-full pt-safe bg-surface-container-lowest/75 backdrop-blur-2xl border-b border-white/[0.08] shadow-header">
      {/* Subtle glowing bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-tertiary/30 to-transparent" />

      <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-space-sm px-grid-margin-mobile md:px-grid-margin-desktop">
        <Link href="/" className="group flex items-center gap-space-sm" aria-label="SUDHIXAI home">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-container via-blue-600 to-tertiary font-mono text-mono-label font-bold text-white shadow-[0_0_16px_rgba(77,142,255,0.4)] transition-transform duration-300 group-hover:scale-105">
            S
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-sans text-headline-sm font-bold tracking-tight text-white transition-colors group-hover:text-primary">
              SUDHIXAI
            </span>
            <div className="mt-space-2xs flex items-center gap-space-xs">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tertiary shadow-[0_0_6px_#4cd7f6]" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-tertiary">
                SYS NORMAL // V4.2
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-space-lg md:flex" aria-label="Primary">
          {primaryNav.map((item) =>
            item.label === "Solutions" ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <button
                  className="flex items-center gap-space-2xs font-body-base text-body-base font-medium text-on-surface-variant transition-colors hover:text-white"
                  aria-expanded={solutionsOpen}
                  aria-haspopup="true"
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200" style={{ transform: solutionsOpen ? "rotate(180deg)" : "none" }} aria-hidden />
                </button>
                <AnimatePresence>
                  {solutionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-1/2 top-full grid w-[580px] -translate-x-1/2 grid-cols-2 gap-space-xs rounded-2xl border border-white/[0.12] bg-surface-container-low/95 p-space-sm shadow-drawer backdrop-blur-2xl"
                    >
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/solutions/${service.slug}`}
                          className="group flex items-start gap-space-sm rounded-xl p-space-sm transition-all duration-200 hover:bg-white/[0.06] hover:border-tertiary/30"
                        >
                          <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-tertiary group-hover:bg-tertiary/20 group-hover:text-white transition-colors">
                            <service.icon className="h-4 w-4" aria-hidden />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-body-base text-body-base font-medium text-on-surface group-hover:text-tertiary transition-colors">
                              {service.title}
                            </span>
                            <span className="font-body-sm text-[12px] text-on-surface-variant line-clamp-1">
                              {service.description}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="font-body-base text-body-base font-medium text-on-surface-variant transition-colors hover:text-white hover:text-primary"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-space-sm">
          <Link
            href="/contact"
            className="shimmer-btn hidden h-9 items-center justify-center rounded-xl bg-gradient-to-r from-primary-container to-blue-600 px-space-md font-body-sm text-body-sm font-semibold text-white shadow-glow transition-all hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(77,142,255,0.5)] sm:inline-flex"
          >
            Start a Project
          </Link>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.1] bg-surface-container-high text-on-surface">
            <CircleUser className="h-[18px] w-[18px]" aria-hidden />
          </div>
          <button
            aria-label={drawerOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface md:hidden"
          >
            {drawerOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-white/[0.08] bg-surface-container-low/95 px-grid-margin-mobile shadow-drawer backdrop-blur-2xl md:hidden"
          >
            <div className="flex items-center justify-between pb-space-sm pt-space-base border-b border-white/[0.06]">
              <span className="font-mono text-mono-label uppercase text-on-surface-variant">
                Directory
              </span>
              <span className="font-mono text-mono-caption text-tertiary">
                NODE_ACTIVE // PROD-AP1
              </span>
            </div>
            <nav className="flex flex-col gap-space-xs py-space-sm" aria-label="Mobile">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center justify-between rounded-xl px-space-sm py-space-sm font-body-base text-body-base text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="h-4 w-4 opacity-60" aria-hidden />
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-between rounded-xl px-space-sm py-space-sm font-body-base text-body-base text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
              >
                <span>Contact Us</span>
                <ChevronRight className="h-4 w-4 opacity-60" aria-hidden />
              </Link>
            </nav>
            <div className="pb-space-base pt-space-xs">
              <Link
                href="/contact"
                onClick={() => setDrawerOpen(false)}
                className="shimmer-btn flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-primary-container to-blue-600 font-body-base font-semibold text-white shadow-glow"
              >
                Start a Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
