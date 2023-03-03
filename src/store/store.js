import { configureStore } from "@reduxjs/toolkit";
import productItemSlice from "./productItem/slice";
import ShopOrderSlice from "./shop_order/slice";
const store = configureStore({
  reducer: {
    ProductItem: productItemSlice.reducer,
    ShopOrder: ShopOrderSlice.reducer
  },
});

export default store;
