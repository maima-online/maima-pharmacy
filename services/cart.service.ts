import axios from "axios";
import { getSession } from "next-auth/react";
import api from "./apis";

export interface CartItem {
  productId: string;
  quantity: number;
}

export const cartService = {
  addToCart,
  removeCartItem,
  updateCartItem,
};

// async function addToCart(cart: CartItem) {
//   const session = await getSession();
//   axios.defaults.headers.common["Authorization"] = `Bearer ${
//     session?.accessToken ?? ""
//   }`;
//   return axios.post(`${process.env.NEXT_PUBLIC_BASE_API}/accounts/cart`, cart);
// }
async function addToCart(cart: CartItem) {
  api.post("/cart", cart);
}

async function removeCartItem(id: string) {
  const session = await getSession();
  axios.defaults.headers.common["Authorization"] = `Bearer ${
    session?.accessToken ?? ""
  }`;
  return axios.delete(
    `${process.env.NEXT_PUBLIC_BASE_API}/accounts/cart/${id}`
  );
}

async function updateCartItem(id: string, data: any) {
  const session = await getSession();
  axios.defaults.headers.common["Authorization"] = `Bearer ${
    session?.accessToken ?? ""
  }`;
  return axios.patch(
    `${process.env.NEXT_PUBLIC_BASE_API}/accounts/cart/${id}`,
    data
  );
}
