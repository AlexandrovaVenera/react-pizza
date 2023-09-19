import { createSlice } from '@reduxjs/toolkit';
import { IFilter } from '../../@types/type';

const initialState: IFilter = {
  categoryId: 0,
  sort: {
    name: 'популярности (asc)',
    sortProperty: '-rating',
  },
  currentPage: 1,
  searchValue: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.currentPage = +action.payload.currentPage;
      state.sort = action.payload.sort;
      state.categoryId = +action.payload.categoryId;
    },
    setSearch: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearch } =
  filterSlice.actions;

export default filterSlice.reducer;
