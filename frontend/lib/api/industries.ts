import { apiFetch } from "./client";
import type { Industry, PaginatedResponse } from "./types";

export async function getIndustries(): Promise<Industry[]> {
  const response = await apiFetch<PaginatedResponse<Industry>>("/api/v1/industries/");
  return response.results;
}
