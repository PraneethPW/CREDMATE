import axios from "axios";

function apiBaseUrl(): string {
  const env = import.meta.env.VITE_API_URL as string | undefined;
  if (env && env.trim()) return env.trim();
  if (import.meta.env.DEV) return "";
  return "http://localhost:8000";
}

const api = axios.create({
  baseURL: apiBaseUrl(),
});

api.interceptors.request.use((config) => {
  const url = config.url ?? "";
  const isPublicAuth = url.includes("/auth/login") || url.includes("/auth/register");

  const token = localStorage.getItem("token");

  if (token && config.headers && !isPublicAuth) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
});

export default api;
