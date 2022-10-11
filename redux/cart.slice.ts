import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../features/types";
import { toast } from "react-toastify";

const initialState: CartItem[] = [];
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      let itemExists = state.find((item) => item.id === action.payload.id);
      if (itemExists && action.payload.quantity >= itemExists.quantity) {
        itemExists.quantity++;
      } else {
        state.push({ ...action.payload, quantity: 1 });
        toast.success("Added to cart");
      }
    },
    incrementQuantity: (state, action) => {
      let item: any = state.find((itm: CartItem) => itm.id === action.payload);
      item.quantity++;
      toast.info(`increased ${item.name} cart quantity`);
    },
    decrementQuantity: (state, action) => {
      const item: any = state.find(
        (itm: CartItem) => itm.id === action.payload
      );
      if (item.quantity === 1) {
        const index = state.findIndex((itm) => itm.id === action.payload);
        state.splice(index, 1);
      } else {
        item.quantity--;
      }
    },
    removeFromCart: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1);
      toast.success("Removed from the cart");
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
