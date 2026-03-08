const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5199/api";

function getToken(): string | null {
  return localStorage.getItem("token");
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(url, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.message ?? data?.Message ?? data?.title ?? res.statusText;
    throw new Error(typeof msg === "string" ? msg : "Request failed");
  }
  return data as T;
}

// Auth
export interface LoginRes {
  token: string;
  email: string;
  fullName: string;
  isAdmin?: boolean;
}
export interface MeRes {
  id: string;
  email: string;
  fullName: string;
  isAdmin: boolean;
}

export const authApi = {
  login: (email: string, password: string) =>
    request<LoginRes>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  register: (email: string, password: string, fullName: string) =>
    request<{ message?: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, fullName }),
    }),
  getMe: () => request<MeRes>("/auth/me"),
};

// Categories (API shape)
export interface CategoryDto {
  id: number;
  name: string;
  description?: string | null;
}
export const categoriesApi = {
  getAll: () => request<CategoryDto[]>("/categories"),
};

// Products (API shape)
export interface ProductDto {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  stockQuantity: number;
  categoryId: number;
  categoryName?: string | null;
}
export const productsApi = {
  getAll: () => request<ProductDto[]>("/products"),
  getById: (id: number) => request<ProductDto>(`/products/${id}`),
};
