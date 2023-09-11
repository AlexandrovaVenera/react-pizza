import { configureStore } from '@reduxjs/toolkit';
import filter from './Slice/filterSlice';
import card from './Slice/cardSlice';
export default configureStore({
  reducer: {
    filter,
    card,
  },
});
