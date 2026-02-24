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
};
