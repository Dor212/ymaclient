import axios from "axios";
import { getAccessToken } from "./authToken";

const RAW_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_BASE = RAW_BASE.replace(/\/$/, "") + "/api";

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const t = getAccessToken();
  if (t) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${t}`;
  }
  return config;
});
