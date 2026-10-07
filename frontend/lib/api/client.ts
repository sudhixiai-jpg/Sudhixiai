// Thin fetch wrapper for the SUDHIXAI Django API.
// Never hardcode the backend origin -- always read NEXT_PUBLIC_API_URL.

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export interface ApiSuccess<T> {
  success: true;
  message?: string;
  data?: T;
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: T;
}

export interface ApiError {
  success: false;
  message: string;
  errors: Record<string, unknown>;
  request_id?: string;
}

export class ApiRequestError extends Error {
  status: number;
  errors: Record<string, unknown>;

  constructor(message: string, status: number, errors: Record<string, unknown>) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

interface RequestOptions extends RequestInit {
  csrfToken?: string;
}

/**
 * Reads the `csrftoken` cookie set by GET /api/v1/auth/csrf/.
 * Call this from a Client Component right before any unsafe (POST/PATCH/
 * DELETE) request -- Django's CsrfViewMiddleware requires it even for
 * endpoints that otherwise allow anonymous access (contact, newsletter,
 * register, login). Returns "" during SSR (no `document`).
 */
export function getCsrfToken(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/(?:^|; )csrftoken=([^;]+)/);
  return match && match[1] ? decodeURIComponent(match[1]) : "";
}

/**
 * Ensures a CSRF token exists by requesting /api/v1/auth/csrf/ if not yet in cookies.
 */
export async function ensureCsrfToken(): Promise<string> {
  let token = getCsrfToken();
  if (!token && typeof window !== "undefined") {
    try {
      const res = await fetch(`${API_URL}/api/v1/auth/csrf/`, { credentials: "include" });
      const data = await res.json().catch(() => null);
      token = data?.data?.csrfToken || getCsrfToken();
    } catch {
      // Fallback silently if offline
    }
  }
  return token;
}

/**
 * Server Components / server-side fetching: no credentials, cacheable.
 * Client Components (forms, auth, dashboard actions): pass credentials: "include".
 */
export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.csrfToken ? { "X-CSRFToken": options.csrfToken } : {}),
      ...options.headers,
    },
  });

  const body = await response.json().catch(() => null);

  if (!response.ok || (body && body.success === false)) {
    const message = body?.message ?? "Something went wrong. Please try again.";
    throw new ApiRequestError(message, response.status, body?.errors ?? {});
  }

  return (body?.data ?? body) as T;
}
