import { apiFetch, ensureCsrfToken } from "./client";
import type { ContactSubmissionPayload } from "./types";

export async function submitContactForm(payload: ContactSubmissionPayload) {
  const token = await ensureCsrfToken();
  return apiFetch<null>("/api/v1/contact/", {
    method: "POST",
    credentials: "include",
    csrfToken: token,
    body: JSON.stringify(payload),
  });
}
