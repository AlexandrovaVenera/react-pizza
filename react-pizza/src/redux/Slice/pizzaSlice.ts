import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IItem, Pizza, RootState, Status } from "../../@types/type";

const initialState: Pizza = {
  items: [],
  status: Status.LOADING,
};

export const fetchPizzas = createAsyncThunk<IItem[], Record<string, string>>(
  "pizza/fetchPizzasStatus",
  async ({ category, sortBy, search, order, currentPage }) => {
    const response = await axios.get<IItem[]>(
      `https://64e8873499cf45b15fdfb707.mockapi.io/items?page=${currentPage}&limit=4&category=${category}&sortBy=${sortBy}&order=${order}&search=${search}`
    );
    return response.data;
  }
);

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<IItem[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    }),
      builder.addCase(
        fetchPizzas.fulfilled,
        (state, action: PayloadAction<IItem[]>) => {
          state.items = action.payload;
          state.status = Status.SUCCESS;
        }
      ),
      builder.addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
