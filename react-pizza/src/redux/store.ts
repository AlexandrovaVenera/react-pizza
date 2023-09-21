import { configureStore } from "@reduxjs/toolkit";
import filter from "./Slice/filterSlice";
import card from "./Slice/cardSlice";
import pizza from "./Slice/pizzaSlice";
import { useDispatch } from "react-redux";
export const store = configureStore({
  reducer: {
    filter,
    card,
    pizza,
  },
});

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
