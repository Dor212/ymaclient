import axios from "axios";
import { API_BASE } from "./axios";

export const authClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});
