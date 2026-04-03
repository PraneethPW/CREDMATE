import { AxiosError } from "axios";
import API from "./axios";

export function registerUser(username: string, email: string, password: string) {
  return API.post("/auth/register", {
    username: username.trim(),
    email: email.trim(),
    password,
  });
}

/** OAuth2 password flow: form field `username` is the email (matches FastAPI auth). */
export function loginWithPassword(email: string, password: string) {
  const formData = new URLSearchParams();
  formData.append("username", email.trim());
  formData.append("password", password);

  return API.post("/auth/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

export function getApiErrorMessage(err: unknown): string {
  if (err instanceof AxiosError) {
    if (err.code === "ERR_NETWORK" || err.code === "ECONNABORTED" || !err.response) {
      return (
        "Cannot reach the API. Start the backend (e.g. port 8000), or set VITE_API_URL " +
        "to your deployed API. In dev, Vite proxies /auth to localhost:8000 when base URL is empty."
      );
    }
    const data = err.response.data as { detail?: unknown } | undefined;
    const detail = data?.detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail)) {
      return detail
        .map((d: { msg?: string }) => d?.msg)
        .filter(Boolean)
        .join(", ");
    }
    if (detail && typeof detail === "object") {
      return JSON.stringify(detail);
    }
    return err.response.statusText || `Request failed (${err.response.status})`;
  }
  if (err instanceof Error) return err.message;
  return "Something went wrong";
}
