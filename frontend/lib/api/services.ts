import { apiFetch } from "./client";
import type { PaginatedResponse, ServiceDetail, ServiceListItem } from "./types";

export async function getServices(): Promise<ServiceListItem[]> {
  const response = await apiFetch<PaginatedResponse<ServiceListItem>>("/api/v1/services/");
  return response.results;
}

export async function getServiceBySlug(slug: string): Promise<ServiceDetail> {
  return apiFetch<ServiceDetail>(`/api/v1/services/${slug}/`);
}
