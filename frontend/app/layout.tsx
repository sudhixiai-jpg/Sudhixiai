import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `SUDHIXAI — Enterprise AI & Custom Software Engineering`,
    template: `%s | SUDHIXAI`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: "SUDHIXAI Technology", url: siteConfig.url }],
  creator: "SUDHIXAI Technology Private Limited",
  publisher: "SUDHIXAI Technology Private Limited",
  category: "Technology",
  classification: "AI Company, Software Development Company, IT Company",

  // Open Graph
  openGraph: {
    title: "SUDHIXAI — Enterprise AI & Custom Software Engineering",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "SUDHIXAI",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SUDHIXAI — Enterprise AI & Software Engineering",
      },
    ],
  },

  // Twitter / X Card
  twitter: {
    card: "summary_large_image",
    title: "SUDHIXAI — Enterprise AI & Custom Software Engineering",
    description: siteConfig.description,
    images: ["/og-image.png"],
  },

  // Geo / Location metadata (helps local SEO)
  other: {
    "geo.region": "IN-BR",
    "geo.placename": "Patna, Bihar, India",
    "DC.language": "en",
    "DC.coverage": "Patna, Bihar, India",
    "ICBM": "25.5941, 85.1376", // Patna coordinates
    "geo.position": "25.5941;85.1376",
    "og:country-name": "India",
    "og:region": "Bihar",
    "og:locality": "Patna",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification placeholders — add your real codes here
  verification: {
    google: "your-google-search-console-verification-code",
  },

  alternates: {
    canonical: siteConfig.url,
    languages: {
      "en-IN": siteConfig.url,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // LocalBusiness JSON-LD structured data for Google local search
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "SoftwareApplication", "Organization"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.legalName,
    alternateName: ["SUDHIXAI", "Sudhix AI", "SudhixAI Technology"],
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    image: `${siteConfig.url}/og-image.png`,
    foundingDate: "2024",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Venus Capital Heights, Hathia Kandh",
      addressLocality: "Patna",
      addressRegion: "Bihar",
      addressCountry: "IN",
      postalCode: "800001",
    },
    telephone: "+91-6206476736",
    email: "kaushalkumar.aien@gmail.com",
    areaServed: [
      { "@type": "City", name: "Patna" },
      { "@type": "State", name: "Bihar" },
      { "@type": "Country", name: "India" },
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 25.5941,
        longitude: 85.1376,
      },
      geoRadius: "500000",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.5941,
      longitude: 85.1376,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Technology Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Solutions & Autonomous Agents", description: "Custom AI systems, machine learning, and autonomous workflow automation for businesses in Patna and across India." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Software Development", description: "Enterprise-grade custom software development services in Patna, Bihar." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Enterprise Automation", description: "Intelligent business process automation and workflow orchestration." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Transformation", description: "End-to-end digital transformation consulting for businesses in Bihar and India." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO & Digital Marketing", description: "Programmatic SEO, digital marketing, and growth strategies for Indian businesses." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web & E-Commerce Development", description: "Modern web application and e-commerce development for Patna and Bihar businesses." } },
      ],
    },
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Custom Software Development",
      "Enterprise Automation",
      "Digital Transformation",
      "Web Development",
      "Digital Marketing",
      "SEO",
      "Cloud Computing",
      "Data Analytics",
    ],
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.twitter,
      siteConfig.social.github,
    ].filter(Boolean),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-6206476736",
      email: "kaushalkumar.aien@gmail.com",
      contactType: "Customer Service",
      availableLanguage: ["English", "Hindi"],
      areaServed: "IN",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: "SUDHIXAI",
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/insights?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-IN",
  };

  return (
    <html lang="en-IN" className={`dark ${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {/* Structured data for Google local business search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="relative flex min-h-screen flex-col bg-surface font-sans text-body-base text-on-surface antialiased selection:bg-tertiary selection:text-surface-container-lowest">
        {/* Ambient atmospheric lighting orbs */}
        <div className="pointer-events-none fixed -left-48 -top-48 h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle,rgba(76,215,246,0.13)_0%,transparent_70%)] blur-[90px] z-0" />
        <div className="pointer-events-none fixed -right-48 top-1/3 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(77,142,255,0.11)_0%,transparent_70%)] blur-[100px] z-0" />
        <div className="pointer-events-none fixed bottom-10 left-1/4 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(192,193,255,0.07)_0%,transparent_70%)] blur-[90px] z-0" />

        {/* Global cyber grid pattern overlay */}
        <div className="pointer-events-none fixed inset-0 z-0 bg-cyber-grid mask-radial opacity-70" />

        {/* Main application tree */}
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <main className="flex flex-1 flex-col pt-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
