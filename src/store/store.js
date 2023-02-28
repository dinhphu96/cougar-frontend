import { configureStore } from "@reduxjs/toolkit";
import productItemSlice from "./productItem/slice";

const store = configureStore({
  reducer: {
    ProductItem: productItemSlice.reducer,
  },
});

export default store;
