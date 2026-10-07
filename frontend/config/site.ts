// Centralized company/site configuration.
// Per project spec: never scatter these values through the codebase,
// and never invent contact details that haven't been supplied.

export const siteConfig = {
  brand: "SUDHIXAI",
  legalName: "SUDHIXAI TECHNOLOGY PRIVATE LIMITED",
  tagline: "Enterprise AI & Custom Software Engineering",
  description:
    "SUDHIXAI delivers next-generation AI solutions, autonomous workflows, and custom software engineering for scaling businesses worldwide. Proudly developed in India.",
  url: "https://sudhixai.com",
  location: {
    city: "Patna",
    state: "Bihar",
    country: "India",
    countryCode: "IN",
    region: "Bihar",
  },
  keywords: [
    "AI company in Patna",
    "software company in Patna",
    "software development company Bihar",
    "AI solutions Patna",
    "custom software Patna Bihar",
    "best IT company in Patna",
    "software company in Bihar",
    "artificial intelligence company India",
    "AI automation Patna",
    "digital transformation Bihar",
    "web development company Patna",
    "machine learning company Bihar",
    "enterprise software Patna",
    "software solutions Bihar India",
    "top IT company Patna",
    "technology company Bihar",
    "SUDHIXAI",
    "hire AI developers Patna",
    "digital marketing agency Patna",
    "SEO company Patna Bihar",
  ],
  // Contact details
  contactEmail: "kaushalkumar.aien@gmail.com" as string | null,
  contactPhone: "+91-6206476736" as string | null,
  address: "Venus Capital Heights, Hathia Kandh, Patna, Bihar 800001, India" as string | null,
  social: {
    // Populate when real social profiles are supplied.
    linkedin: null as string | null,
    twitter: null as string | null,
    github: null as string | null,
  },
} as const;

export const primaryNav = [
  { label: "Solutions", href: "/solutions" },
  { label: "Products", href: "/products" },
  { label: "Technology", href: "/technology" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
  { label: "Company", href: "/about" },
] as const;

export const footerNav = {
  solutions: [
    { label: "AI Solutions", href: "/solutions/ai" },
    { label: "Software Engineering", href: "/solutions/software" },
    { label: "Automation", href: "/solutions/automation" },
    { label: "Digital Transformation", href: "/solutions/digital-transformation" },
    { label: "Digital Marketing", href: "/solutions/digital-marketing" },
    { label: "SEO", href: "/solutions/seo" },
    { label: "Web & E-commerce", href: "/solutions/web-ecommerce" },
    { label: "Data & Analytics", href: "/solutions/data-analytics" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Insights", href: "/insights" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
} as const;
