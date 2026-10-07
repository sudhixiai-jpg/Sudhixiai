"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { submitContactForm } from "@/lib/api/contact";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    project_details: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      await submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        service: formData.service || undefined,
        project_details: formData.project_details,
      });
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        project_details: "",
      });
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to submit message. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen px-grid-margin-mobile pb-space-4xl pt-space-3xl md:px-grid-margin-desktop md:pt-space-4xl">
      <div className="mx-auto max-w-content">
        <div className="grid gap-space-2xl md:grid-cols-2 md:gap-space-3xl">
          {/* Left Column: Context & Information */}
          <Reveal className="flex flex-col gap-space-lg">
            <div className="inline-flex w-fit items-center gap-space-xs rounded-full bg-surface-container-high px-space-sm py-space-2xs shadow-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-tertiary" />
              <span className="font-mono text-mono-caption uppercase tracking-wider text-tertiary">
                DIRECT ARCHITECTURE LINE
              </span>
            </div>

            <div className="flex flex-col gap-space-sm">
              <h1 className="font-sans text-display-hero-mobile font-semibold tracking-tight text-on-surface md:text-headline-lg">
                Let&apos;s build something exceptional.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Whether you need autonomous AI workflows, distributed infrastructure, or systemic digital transformation, our engineering leads are ready to evaluate your requirements.
              </p>
            </div>

            <div className="flex flex-col gap-space-md rounded-xl border border-surface-container-high bg-surface-container-low p-space-base">
              <div className="flex items-center gap-space-xs font-mono text-mono-label text-tertiary">
                <Sparkles className="h-4 w-4" />
                <span>WHAT TO EXPECT</span>
              </div>
              <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <li>&bull; Strict NDA &amp; intellectual property guarantees from day zero.</li>
                <li>&bull; Architecture scoping and preliminary feasibility estimate in &lt; 24 hours.</li>
                <li>&bull; Direct discussion with principal systems architects, not junior sales reps.</li>
              </ul>
            </div>

            <div className="flex flex-col gap-space-xs text-on-surface-variant font-mono text-mono-caption">
              <span>LEGAL ENTITY: {siteConfig.legalName}</span>
              <span>INQUIRY ROUTING: ACTIVE // BACKEND REST API CONNECTED</span>
            </div>
          </Reveal>

          {/* Right Column: Interactive Form */}
          <Reveal delay={0.1} className="rounded-2xl border border-surface-container-high bg-surface-container-low p-space-base shadow-xl md:p-space-xl">
            {success ? (
              <div className="flex flex-col items-center justify-center gap-space-md py-space-2xl text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-tertiary/10 text-tertiary">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-sans text-headline-sm font-semibold text-on-surface">
                  Message Dispatched Successfully
                </h3>
                <p className="font-body-base text-body-base text-on-surface-variant max-w-sm">
                  Thank you! Your project specification has been recorded in our secure database. Our systems team will review and reply shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="mt-space-sm rounded-xl bg-surface-container-high px-space-base py-space-xs font-body-sm text-on-surface hover:bg-surface-container"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
                <div className="flex flex-col gap-space-2xs">
                  <h2 className="font-sans text-headline-sm font-semibold text-on-surface">
                    Project Dispatch Specification
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    All fields routed directly to our internal Django services.
                  </p>
                </div>

                {errorMessage && (
                  <div className="flex items-center gap-space-xs rounded-xl bg-error/10 border border-error/30 p-space-sm text-error font-body-sm">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid gap-space-md sm:grid-cols-2">
                  <div className="flex flex-col gap-space-2xs">
                    <label htmlFor="name" className="font-mono text-mono-caption uppercase text-on-surface-variant">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      required
                      type="text"
                      placeholder="e.g. Kaushal Raj"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="rounded-xl border border-surface-container-high bg-surface-container-lowest px-space-sm py-space-xs font-body-base text-on-surface focus:border-tertiary focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-space-2xs">
                    <label htmlFor="email" className="font-mono text-mono-caption uppercase text-on-surface-variant">
                      Work Email *
                    </label>
                    <input
                      id="email"
                      required
                      type="email"
                      placeholder="kaushal@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="rounded-xl border border-surface-container-high bg-surface-container-lowest px-space-sm py-space-xs font-body-base text-on-surface focus:border-tertiary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-space-md sm:grid-cols-2">
                  <div className="flex flex-col gap-space-2xs">
                    <label htmlFor="company" className="font-mono text-mono-caption uppercase text-on-surface-variant">
                      Organization / Company
                    </label>
                    <input
                      id="company"
                      type="text"
                      placeholder="e.g. SUDHIXAI Global"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="rounded-xl border border-surface-container-high bg-surface-container-lowest px-space-sm py-space-xs font-body-base text-on-surface focus:border-tertiary focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-space-2xs">
                    <label htmlFor="phone" className="font-mono text-mono-caption uppercase text-on-surface-variant">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="rounded-xl border border-surface-container-high bg-surface-container-lowest px-space-sm py-space-xs font-body-base text-on-surface focus:border-tertiary focus:outline-none"
                    />
                  </div>
                </div>

                  <div className="flex flex-col gap-space-2xs">
                    <label htmlFor="service" className="font-mono text-mono-caption uppercase text-on-surface-variant">
                      Primary Domain Focus
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="rounded-xl border border-surface-container-high bg-surface-container-lowest px-space-sm py-space-xs font-body-base text-on-surface focus:border-tertiary focus:outline-none"
                    >
                      <option value="">Select Domain...</option>
                      <option value="ai">AI Solutions &amp; Autonomous Agents</option>
                      <option value="software">Custom Software Engineering</option>
                      <option value="automation">Enterprise Automation &amp; Workflows</option>
                      <option value="digital-transformation">Digital Transformation</option>
                      <option value="digital-marketing">Digital Marketing &amp; Growth</option>
                      <option value="seo">Algorithmic &amp; Programmatic SEO</option>
                      <option value="web-ecommerce">Web &amp; E-Commerce</option>
                      <option value="data-analytics">Data &amp; Lakehouse Analytics</option>
                    </select>
                  </div>

                <div className="flex flex-col gap-space-2xs">
                  <label htmlFor="details" className="font-mono text-mono-caption uppercase text-on-surface-variant">
                    Project Overview &amp; Requirements *
                  </label>
                  <textarea
                    id="details"
                    required
                    rows={4}
                    placeholder="Briefly describe your objectives, current architecture, target timeline, or technical challenges..."
                    value={formData.project_details}
                    onChange={(e) => setFormData({ ...formData, project_details: e.target.value })}
                    className="rounded-xl border border-surface-container-high bg-surface-container-lowest px-space-sm py-space-xs font-body-base text-on-surface focus:border-tertiary focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-12 items-center justify-center gap-space-xs rounded-xl bg-primary-container font-body-base font-medium text-on-primary-container shadow-md transition-opacity hover:opacity-95 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Dispatched To API...</span>
                  ) : (
                    <>
                      <span>Transmit Project Brief</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </main>
  );
}
