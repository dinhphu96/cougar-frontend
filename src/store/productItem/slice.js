import { createSlice } from "@reduxjs/toolkit";
import {
  getProductItem,
  addNewProductItem,
  updateProductItem,
  deleteProductItem,
//   getOneProductItem,
} from "./api";
const productItemSlice = createSlice({
  name: "productItem",
  initialState: {
    productItems: [],
    product: {},
    status: "idle",
    error: null,
  },
  reducers: {
    getOneProductItem: (state, action) => {
      const existing = state.productItems.find(
        (pr) => pr.id === action.payload
      );
      if (existing) {
        state.product = existing;
      }
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder

      //get
      .addCase(getProductItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductItem.fulfilled, (state, action) => {
        state.productItems = action.payload;
        state.status = "idle";
      })

      //getOne
      //   .addCase(getOneProductItem.pending, (state) => {
      //     state.status = "loading";
      //   })

      //   .addCase(getOneProductItem.fulfilled, (state, action) => {
      //     const existing = state.productItems.find(
      //       (pr) => pr.id === action.payload);
      //     if (existing) {
      //       state.product = existing;
      //     }
      //     state.status = "idle";
      //   })

      //post
      .addCase(addNewProductItem.fulfilled, (state, action) => {
        state.productItems.push(action.payload);
        state.status = "succeeded";
      })

      .addCase(addNewProductItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //put
      .addCase(updateProductItem.fulfilled, (state, action) => {
        const updatedPrI = action.payload;
        const existing = state.productItems.find(
          (prI) => prI.id === updatedPrI.id
        );
        if (existing) {
          Object.assign(existing, updatedPrI);
        }
        state.status = "succeeded";
      })

      .addCase(updateProductItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //delete
      .addCase(deleteProductItem.fulfilled, (state, action) => {
        const id = action.payload;
        const existing = state.productItems.find((pr) => pr.id === id);
        if (existing) {
          state.productItems = state.productItems.filter((pr) => pr.id !== id);
        }
        state.status = "succeeded";
      })

      .addCase(deleteProductItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default productItemSlice;
