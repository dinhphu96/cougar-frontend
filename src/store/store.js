import { configureStore } from "@reduxjs/toolkit";
import ShopOrderSlice from "./shop_order/slice";
const store = configureStore({
  reducer: {
    ShopOrder: ShopOrderSlice.reducer,
  },
});

export default store;
