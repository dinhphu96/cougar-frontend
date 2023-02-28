import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductItem = createAsyncThunk('productItem/get', async () => {
  const response = await axios.get('http://localhost:8080/rest/productItems');
  return response.data;
});

// export const getOneProductItem = createAsyncThunk('productItem/getOne', async (productId) => {
//   const response = await axios.get(`http://localhost:8080/rest/productItems/${productId}`);
//   console.log("vào")
//   return response.data;
// });

export const addNewProductItem = createAsyncThunk('productItem/add', async (productItem) => {
  const response = await axios.post('http://localhost:8080/rest/productItems', productItem);
  return response.data;
});

export const updateProductItem = createAsyncThunk('productItem/update', async (productItem) => {
  const response = await axios.put(`http://localhost:8080/rest/productItems/${productItem.id}`, productItem);
  return response.data;
});

export const deleteProductItem = createAsyncThunk('productItem/delete', async (id) => {
  await axios.delete(`http://localhost:8080/rest/productItems/${id}`);
  return id;
});