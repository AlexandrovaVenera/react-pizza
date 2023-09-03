import { configureStore } from "@reduxjs/toolkit";
import filter from "./Slice/filterSlice";

export default configureStore({
  reducer: {
    filter,
  },
});
