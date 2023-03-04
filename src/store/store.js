import { configureStore } from "@reduxjs/toolkit";
import ShopOrderSlice from "./shop_order/slice";
import loginSlice from "./login/slice";
const store = configureStore({
  reducer: {
    ShopOrder: ShopOrderSlice.reducer,
    AuthLogin: loginSlice.reducer
  },
});

export default store;
