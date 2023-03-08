import { configureStore } from "@reduxjs/toolkit";
import ShopOrderSlice from "./shop_order/slice";
import signupSlice from "./signup/slice";
const store = configureStore({
  reducer: {
    ShopOrder: ShopOrderSlice.reducer,
    SignUp: signupSlice.reducer
  },
});

export default store;
