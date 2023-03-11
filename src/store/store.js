import { configureStore } from "@reduxjs/toolkit";
import ShopOrderSlice from "./shop_order/slice";
import signupSlice from "./signup/slice";
import filtersSlice from "./filtersStore/filtersSlice";
const store = configureStore({
  reducer: {
    ShopOrder: ShopOrderSlice.reducer,
    SignUp: signupSlice.reducer,
    filters: filtersSlice.reducer
  },
});

export default store;
