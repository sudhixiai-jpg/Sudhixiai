import { apiFetch } from "./client";
import type { InsightDetail, InsightListItem, PaginatedResponse } from "./types";

export async function getInsights(params: { featured?: boolean } = {}): Promise<InsightListItem[]> {
  const query = params.featured ? "?featured=true" : "";
  const response = await apiFetch<PaginatedResponse<InsightListItem>>(`/api/v1/insights/${query}`);
  return response.results;
}

export async function getInsightBySlug(slug: string): Promise<InsightDetail> {
  return apiFetch<InsightDetail>(`/api/v1/insights/${slug}/`);
}
