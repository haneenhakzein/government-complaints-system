import axios from "axios";
import { getApiBaseUrl } from "../config/apiEnv";
import { clearSession, getToken } from "../auth/session";
import { AUTH_ROUTES } from "@/features/auth/constants/authRoutes";

const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 120000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url ?? "";
    const isLoginRequest = url.includes("/auth/login");

    if (status === 401 && !isLoginRequest) {
      clearSession();
      if (window.location.pathname !== AUTH_ROUTES.login) {
        window.location.assign(AUTH_ROUTES.login);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
