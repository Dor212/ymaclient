import { api } from "./axios";
import { getAccessToken, setAccessToken } from "./authToken";

export function setupInterceptors() {
  api.interceptors.request.use((config) => {
    const t = getAccessToken();
    if (t) config.headers.Authorization = `Bearer ${t}`;
    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    async (err) => {
      const original = err.config;
      if (err.response?.status === 401 && !original?._retry) {
        original._retry = true;
        const r = await api.post("/admin/auth/refresh");
        setAccessToken(r.data.accessToken);
        original.headers.Authorization = `Bearer ${r.data.accessToken}`;
        return api(original);
      }
      return Promise.reject(err);
    }
  );
}
