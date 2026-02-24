// Base API client for Node.js/Express/MongoDB backend
// Change VITE_API_URL in your .env file to point to your backend
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface RequestOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

export const api = async <T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
  const token = localStorage.getItem("token");

  const config: RequestInit = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Something went wrong");
  }

  return data;
};

// Auth token helpers
export const setToken = (token: string) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const removeToken = () => localStorage.removeItem("token");
