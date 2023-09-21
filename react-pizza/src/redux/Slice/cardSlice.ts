import { createSlice } from "@reduxjs/toolkit";
import { ICardItem } from "../../@types/type";

interface ICard {
  items: ICardItem[];
  totalPrice: number;
}
const initialState: ICard = {
  items: [],
  totalPrice: 0,
};

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addItems: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = state.items.reduce(
        (sum, current) => sum + current.price * current.count,
        0
      );
    },
    removeItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce(
        (sum, current) => sum + current.price * current.count,
        0
      );
    },
    removeItems: (state, action) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce(
        (sum, current) => sum + current.price * current.count,
        0
      );
    },
    clearItem: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItems, removeItem, removeItems, clearItem } =
  cardSlice.actions;

export default cardSlice.reducer;
