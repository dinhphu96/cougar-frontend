// import { createSlice } from "@reduxjs/toolkit";
// import { fetchProduct, addNewProduct, updateProduct, deleteProduct } from "./api";
// const productSlice = createSlice({
//   name: "product",
//   initialState: {
//     products: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {
//     // ...
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProduct.pending, (state, action) => {
//         state.status = "loading";
//       })
//       .addCase(fetchProduct.fulfilled, (state, action) => {
//         state.products = action.payload;
//         state.status = "idle";
//       })

//       .addCase(addNewProduct.fulfilled, (state, action) => {
//         state.products.push(action.payload);
//         state.status = "succeeded";
//       })

//       .addCase(addNewProduct.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       })

//       .addCase(updateProduct.fulfilled, (state, action) => {
//         const updatedTodo = action.payload;
//         const existingTodo = state.products.find(
//           (todo) => todo.id === updatedTodo.id
//         );
//         if (existingTodo) {
//           Object.assign(existingTodo, updatedTodo);
//         }
//         state.status = "succeeded";
//       })

//       .addCase(updateProduct.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       })

//       .addCase(deleteProduct.fulfilled, (state, action) => {
//         const id = action.payload;
//         const existingTodo = state.products.find((todo) => todo.id === id);
//         if (existingTodo) {
//           state.products = state.products.filter((todo) => todo.id !== id);
//         }
//         state.status = "succeeded";
//       })

//       .addCase(deleteProduct.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });
// export default productSlice;
