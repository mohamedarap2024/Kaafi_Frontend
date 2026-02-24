import { api } from "./api";
import { CartItem } from "@/types/product";

export interface Order {
  _id: string;
  user: string;
  items: { product: string; name: string; price: number; quantity: number }[];
  total: number;
  shippingAddress: string;
  phone: string;
  status: string;
  createdAt: string;
}

export const orderService = {
  // POST /api/orders
  create: async (data: {
    items: CartItem[];
    total: number;
    shippingAddress: string;
    phone: string;
  }): Promise<Order> => {
    return api<Order>("/orders", {
      method: "POST",
      body: {
        items: data.items.map((item) => ({
          product: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total: data.total,
        shippingAddress: data.shippingAddress,
        phone: data.phone,
      },
    });
  },

  // GET /api/orders/my — user's orders
  getMyOrders: async (): Promise<Order[]> => {
    return api<Order[]>("/orders/my");
  },
};
