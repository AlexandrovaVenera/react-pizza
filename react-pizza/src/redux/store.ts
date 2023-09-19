import { configureStore } from '@reduxjs/toolkit';
import filter from './Slice/filterSlice';
import card from './Slice/cardSlice.ts';
import pizza from './Slice/pizzaSlice';
export const store = configureStore({
  reducer: {
    filter,
    card,
    pizza,
  },
});
