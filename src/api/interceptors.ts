import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { api } from "./axios";
import { authClient } from "./authClient";
import { setAccessToken } from "./authToken";

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let refreshPromise: Promise<string | null> | null = null;

async function getFreshAccessToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = authClient
      .post("/admin/auth/refresh")
      .then((r) => (r.data?.accessToken ? String(r.data.accessToken) : null))
      .catch(() => null)
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

export function setupInterceptors() {
  api.interceptors.response.use(
    (res) => res,
    async (err: AxiosError) => {
      if (!axios.isAxiosError(err)) return Promise.reject(err);

      const original = err.config as RetryConfig | undefined;
      const status = err.response?.status;
      const url = String(original?.url || "");

      if (
        url.includes("/admin/auth/refresh") ||
        url.includes("/admin/auth/login") ||
        url.includes("/admin/auth/logout")
      ) {
        return Promise.reject(err);
      }

      if (status === 401 && original && !original._retry) {
        original._retry = true;

        const token = await getFreshAccessToken();

        if (!token) {
          setAccessToken(null);
          return Promise.reject(err);
        }

        setAccessToken(token);

        original.headers = original.headers ?? {};
        original.headers.Authorization = `Bearer ${token}`;

        return api(original);
      }

      return Promise.reject(err);
    }
  );
}
