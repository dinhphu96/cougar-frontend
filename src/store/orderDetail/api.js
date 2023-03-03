import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getOrderDetail = createAsyncThunk('OrderDetail/get', async () => {
  const response = await axios.get('http://localhost:8080/rest/orderDetails');
  return response.data;
});

// export const getOneOrderDetail = createAsyncThunk('OrderDetail/getOne', async (OrderDetailId) => {
//   const response = await axios.get(`http://localhost:8080/rest/orderDetails/${orderDetailId}`);
//   console.log("vào")
//   return response.data;
// });

export const addNewOrderDetail = createAsyncThunk('OrderDetail/add', async (OrderDetail) => {
  const response = await axios.post('http://localhost:8080/rest/orderDetails', OrderDetail);
  return response.data;
});

export const updateOrderDetail = createAsyncThunk('OrderDetail/update', async (OrderDetail) => {
  const response = await axios.put(`http://localhost:8080/rest/orderDetails/${OrderDetail.id}`, OrderDetail);
  return response.data;
});
