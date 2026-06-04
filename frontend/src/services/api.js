import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use((config) => {
  const storedAuth = localStorage.getItem("placementPortalAuth");

  if (storedAuth) {
    try {
      const { token } = JSON.parse(storedAuth);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      localStorage.removeItem("placementPortalAuth");
    }
  }

  return config;
});

export default api;
