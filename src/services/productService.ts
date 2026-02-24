import { api } from "./api";
import { Product, Category } from "@/types/product";

export const productService = {
  // GET /api/products
  getAll: async (): Promise<Product[]> => {
    return api<Product[]>("/products");
  },

  // GET /api/products/:id
  getById: async (id: string): Promise<Product> => {
    return api<Product>(`/products/${id}`);
  },

  // GET /api/products/category/:category
  getByCategory: async (category: string): Promise<Product[]> => {
    return api<Product[]>(`/products/category/${category}`);
  },

  // GET /api/categories
  getCategories: async (): Promise<Category[]> => {
    return api<Category[]>("/categories");
  },
  // Admin: create a product (requires auth/admin)
  create: async (data: {
    name: string;
    description?: string;
    price: number;
    category?: string;
    countInStock?: number;
    image?: string;
  }) => {
    return api<{ _id: string }>("/products", {
      method: "POST",
      body: data,
    });
  },

  // Admin: update a product
  update: async (id: string, data: Partial<{ name: string; description: string; price: number; category: string; countInStock: number; image: string }>) => {
    return api(`/products/${id}`, {
      method: "PUT",
      body: data,
    });
  },

  // Admin: delete a product
  remove: async (id: string) => {
    return api(`/products/${id}`, {
      method: "DELETE",
    });
  },
};
