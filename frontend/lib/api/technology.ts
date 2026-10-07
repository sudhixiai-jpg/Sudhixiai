import { apiFetch } from "./client";
import type { Technology } from "./types";

export async function getTechnologies(): Promise<Technology[]> {
  // Technology list is unpaginated (pagination_class = None on the backend).
  return apiFetch<Technology[]>("/api/v1/technology/");
}
