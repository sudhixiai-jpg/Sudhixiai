// Types mirroring the Django REST Framework serializers.
// Kept hand-written and explicit rather than `any` -- see apps/*/serializers.py
// for the source of truth. Consider generating these from /api/schema/ later.

export interface PaginatedResponse<T> {
  success: true;
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ServiceCategory {
  slug: string;
  name: string;
  description: string;
  sort_order: number;
}

export interface ServiceListItem {
  slug: string;
  title: string;
  short_description: string;
  icon: string;
  accent: "primary" | "secondary" | "tertiary";
  category: ServiceCategory | null;
  is_featured: boolean;
  sort_order: number;
}

export interface ServiceDetail extends ServiceListItem {
  description: string;
  hero_title: string;
  hero_description: string;
  overview: string;
  capabilities: Array<{ title: string; description: string }>;
  use_cases: unknown[];
  process: unknown[];
  technology: string[];
  cta_label: string;
  cta_url: string;
  seo_title: string;
  seo_description: string;
}

export type ProductStatus = "COMING_SOON" | "PRIVATE_PREVIEW" | "BETA" | "AVAILABLE" | "ARCHIVED";

export interface ProductListItem {
  slug: string;
  name: string;
  short_description: string;
  category: string;
  status: ProductStatus;
  build_tag: string;
  image: string | null;
  is_featured: boolean;
  sort_order: number;
}

export interface Industry {
  slug: string;
  name: string;
  description: string;
  icon: string;
  hero_description: string;
  capabilities: unknown[];
  use_cases: unknown[];
  sort_order: number;
}

export interface Technology {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: { slug: string; name: string; sort_order: number } | null;
  website_url: string;
  sort_order: number;
}

export interface InsightListItem {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  cover_image: string | null;
  author: { slug: string; name: string; title: string } | null;
  category: { slug: string; name: string } | null;
  featured: boolean;
  published_at: string | null;
  reading_time_minutes: number | null;
}

export interface InsightDetail extends InsightListItem {
  content: string;
  tags: Array<{ slug: string; name: string }>;
  canonical_url?: string;
  seo_title?: string;
  seo_description?: string;
}

export interface SiteConfiguration {
  brand_name: string;
  legal_name: string;
  tagline: string;
  description: string;
  website_url: string;
  contact_email: string | null;
  contact_phone: string | null;
  address: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  github_url: string | null;
}

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  project_details: string;
  source?: string;
}
