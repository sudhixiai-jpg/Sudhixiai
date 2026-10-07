import { apiFetch } from "./client";
import type { PaginatedResponse, ProductListItem } from "./types";

export async function getProducts(): Promise<ProductListItem[]> {
  const response = await apiFetch<PaginatedResponse<ProductListItem>>("/api/v1/products/");
  return response.results;
}
