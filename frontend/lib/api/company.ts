import { apiFetch } from "./client";
import type { SiteConfiguration } from "./types";

export async function getSiteConfiguration(): Promise<SiteConfiguration> {
  return apiFetch<SiteConfiguration>("/api/v1/company/");
}
