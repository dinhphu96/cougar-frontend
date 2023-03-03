import { createSlice } from "@reduxjs/toolkit";
import { getOrder, addNewOrder, updateOrder } from "./api";
const ShopOrderSlice = createSlice({
  name: "ShopOrder",
  initialState: {
    cartItems: [],
    amount: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    createCartItem: (state, action) => {
      const item = action.payload;
      const exist = state.cartItems.find((ite) => ite.id === item.id);

      if (exist) {
        state.cartItems.map((ite) =>
          ite.id === item.id ? (ite.quantity += item.quantity) : ite
        );
        state.cartItems.map((ite) =>
          ite.id === item.id ? (ite.total = ite.quantity * ite.price) : ite
        );
      } else {
        state.cartItems.push(action.payload);
        state.amount++;
      }
    },

    getCart: (state) => {
      return state.cartItems;
    },

    changQuantityInCart: (state, action) => {
      state.cartItems.map((ite) =>
        ite.id === action.payload.id
          ? (ite.quantity = action.payload.quantity)
          : action.payload
      );

      state.cartItems.map((ite) =>
        ite.id === action.payload.id
          ? (ite.total = ite.price * ite.quantity)
          : action.payload
      );
    },

    delateItem: (state, action) => {
        const exist = state.cartItems.find((ite) => ite.id === action.payload);
        if (exist) {
          state.cartItems = state.cartItems.filter((ite) => ite.id !== action.payload);
        }
        state.status = "succeeded";
      },
  },
  extraReducers: (builder) => {
    builder

      //get
      .addCase(getOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.productItems = action.payload;
        state.status = "idle";
      })

      //post
      .addCase(addNewOrder.fulfilled, (state, action) => {
        state.productItems.push(action.payload);
        state.status = "succeeded";
      })

      .addCase(addNewOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //put
      .addCase(updateOrder.fulfilled, (state, action) => {
        const updatedPrI = action.payload;
        const existing = state.productItems.find(
          (prI) => prI.id === updatedPrI.id
        );
        if (existing) {
          Object.assign(existing, updatedPrI);
        }
        state.status = "succeeded";
      })

      .addCase(updateOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //post orderDetail
      .addCase(addNewOrder.fulfilled, (state, action) => {
        state.productItems.push(action.payload);
        state.status = "succeeded";
      })

      .addCase(addNewOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});
export default ShopOrderSlice;
