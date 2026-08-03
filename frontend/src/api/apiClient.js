import axios from "axios";

const getApiBaseUrl = () => {
  const configuredUrl =
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    "";

  const normalizedUrl = configuredUrl.trim();

  if (
    normalizedUrl &&
    !normalizedUrl.includes("localhost") &&
    !normalizedUrl.includes("127.0.0.1")
  ) {
    return normalizedUrl;
  }

  if (import.meta.env.PROD) {
    return "https://xllent-food.onrender.com";
  }

  return "http://localhost:8082";
};

const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("xllent_token");

    const isLoginRequest =
      config.url?.includes("/auth/login");

    const hasValidToken =
      token &&
      token !== "null" &&
      token !== "undefined" &&
      token.trim() !== "";

    if (hasValidToken && !isLoginRequest) {
      config.headers.Authorization =
        `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem(
        "xllent_token"
      );
      localStorage.removeItem(
        "xllent_user"
      );
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (
        window.location.pathname !==
        "/login"
      ) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;