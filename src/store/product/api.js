import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk('product/get', async () => {
  const response = await axios.get('http://localhost:8080/rest/products');
  return response.data;
});

// export const getOneProduct = createAsyncThunk('product/getOne', async (productId) => {
//   const response = await axios.get(`http://localhost:8080/rest/products/${productId}`);
//   console.log("vào")
//   return response.data;
// });

export const addNewProduct = createAsyncThunk('product/add', async (product) => {
  const response = await axios.post('http://localhost:8080/rest/products', product);
  return response.data;
});

export const updateProduct = createAsyncThunk('product/update', async (product) => {
  const response = await axios.put(`http://localhost:8080/rest/products/${product.id}`, product);
  return response.data;
});

export const deleteProduct = createAsyncThunk('product/delete', async (id) => {
  await axios.delete(`http://localhost:8080/rest/products/${id}`);
  return id;
});