// Contact page metadata — separate from page.tsx since it is a client component
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact SUDHIXAI — Enterprise Software & AI Engineering",
  description:
    "Get in touch with SUDHIXAI. Inquire about custom software engineering, AI systems, autonomous workflows, and enterprise digital transformation.",
  keywords: [
    "contact SUDHIXAI",
    "hire AI developers Patna",
    "software company contact Bihar",
    "AI company Patna contact",
    "get quote software development Bihar",
    "IT company contact Patna",
  ],
  alternates: { canonical: "https://sudhixai.com/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

