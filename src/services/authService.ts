import { api, setToken, removeToken } from "./api";

export interface AuthUser {
  _id: string;
  fullName: string;
  email: string;
  role: "user" | "admin";
}

interface AuthResponse {
  token: string;
  user: AuthUser;
}

export const authService = {
  // POST /api/auth/register
  register: async (fullName: string, email: string, password: string): Promise<AuthResponse> => {
    const data = await api<AuthResponse>("/auth/register", {
      method: "POST",
      body: { fullName, email, password },
    });
    setToken(data.token);
    return data;
  },

  // POST /api/auth/login
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const data = await api<AuthResponse>("/auth/login", {
      method: "POST",
      body: { email, password },
    });
    setToken(data.token);
    return data;
  },

  // GET /api/auth/me — get current user from token
  getMe: async (): Promise<AuthUser> => {
    return api<AuthUser>("/auth/me");
  },

  logout: () => {
    removeToken();
  },
};
