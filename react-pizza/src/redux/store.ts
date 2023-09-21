import { configureStore } from '@reduxjs/toolkit';
import filter from './Slice/filterSlice';
import card from './Slice/cardSlice';
import pizza from './Slice/pizzaSlice';
export const store = configureStore({
  reducer: {
    filter,
    card,
    pizza,
  },
});
