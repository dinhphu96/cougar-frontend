// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchProduct = createAsyncThunk('todos/fetchTodos', async () => {
//   const response = await axios.get('http://localhost:8080/rest/products');
//   return response.data;
// });

// export const addNewProduct = createAsyncThunk('todos/addProduct', async (todo) => {
//   const response = await axios.post('http://localhost:8080/rest/products', todo);
//   return response.data;
// });

// export const updateProduct = createAsyncThunk('todos/updateProduct', async (todo) => {
//   const response = await axios.put(`http://localhost:8080/rest/products/${todo.id}`, todo);
//   return response.data;
// });

// export const deleteProduct = createAsyncThunk('todos/deleteTodo', async (id) => {
//   await axios.delete(`http://localhost:8080/rest/products/${id}`);
//   return id;
// });