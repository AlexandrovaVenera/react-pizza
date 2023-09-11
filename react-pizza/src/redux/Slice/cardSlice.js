import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  items: [],
  totalPrice: 0,
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    // addItems: (state, action) => {
    //   state.items.push(action.payload);
    //   state.totalPrice = state.items.reduce(
    //     (sum, current) => sum + current.price,
    //     0
    //   );
    // },
    addItems: (state, action) => {
      const findItem = state.items.find((obj) => obj.id == action.payload);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = state.items.reduce(
        (sum, current) => sum + current.price,
        0
      );
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItem: (state, action) => {
      state.items = [];
    },
  },
});

export const { addItems, removeItem, clearItem } = cardSlice.actions;

export default cardSlice.reducer;
