import { api } from "./axios";
import { getAccessToken, setAccessToken } from "./authToken";

export function setupInterceptors() {
  api.interceptors.request.use((config) => {
    const t = getAccessToken();
    if (t) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${t}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    async (err) => {
      const original = err?.config;

      if (err?.response?.status === 401 && original && !original._retry) {
        original._retry = true;

        try {
          const r = await api.post("/admin/auth/refresh");
          const token = r?.data?.accessToken;

          if (!token) {
            setAccessToken("");
            return Promise.reject(err);
          }

          setAccessToken(token);

          original.headers = original.headers ?? {};
          original.headers.Authorization = `Bearer ${token}`;

          return api(original);
        } catch (e) {
          setAccessToken("");
          return Promise.reject(e);
        }
      }

      return Promise.reject(err);
    }
  );
}
