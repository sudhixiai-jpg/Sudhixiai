import { apiFetch, ensureCsrfToken } from "./client";

export async function subscribeToNewsletter(email: string, source?: string) {
  const token = await ensureCsrfToken();
  return apiFetch<null>("/api/v1/newsletter/subscribe/", {
    method: "POST",
    credentials: "include",
    csrfToken: token,
    body: JSON.stringify({ email, source }),
  });
}
