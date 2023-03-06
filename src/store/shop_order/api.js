import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getShopOrderByUserId = createAsyncThunk('Order/get', async (userId) => {
  const response = await axios.get(`http://localhost:8080/rest/shopOrders/${userId}`);
  return response.data;
});

export const addNewOrder = createAsyncThunk('Order/add', async (orderorderDetail) => {
  const response = await axios.post('http://localhost:8080/rest/shopOrders', orderorderDetail);
  return response.data;
});

export const updateOrder = createAsyncThunk('Order/update', async (Order) => {
  const response = await axios.put(`http://localhost:8080/rest/shopOrders/${Order.id}`, Order);
  return response.data;
});

export const deleteOrder = createAsyncThunk('Order/delete', async (id) => {
  console.log("vào api");
  await axios.delete(`http://localhost:8080/rest/shopOrders/${id}`);
  
});




//orderDetail
export const addNewOrderDetail = createAsyncThunk('OrderDetail/add', async (orderDetail) => {
  const response = await axios.post("http://localhost:8080/rest/orderDetails", orderDetail);
  return response.data;
});

export const updateOrderDetail = createAsyncThunk('OrderDetail/update', async (OrderDetail) => {
  const response = await axios.put(`http://localhost:8080/rest/orderDetails/${OrderDetail.id}`, OrderDetail);
  return response.data;
});


export const getOrderDetailByShopId = createAsyncThunk('OrderDetail/getListOrderDetail', async (shopOrderId) => {
  const response = await axios.get(`http://localhost:8080/rest/orderDetails/${shopOrderId}`);
  return response.data;
});

export const deleteOrderDetaiById = createAsyncThunk('OrderDetail/delete', async (id) => {
  await axios.delete(`http://localhost:8080/rest/orderDetails/${id}`);
  return id;
});



//user
export const getUserById = createAsyncThunk('User/getById', async (id) => {
  const response = await axios.get(`http://localhost:8080/rest/users/${id}`);
  return response.data;
});


//addesses
export const getAddressesByUserId = createAsyncThunk('Addess/get', async (userId) => {
  const response = await axios.get(`http://localhost:8080/rest/addresses/${userId}`);
  return response.data;
});


//DeliveryMethod
export const getDeliveryByUserId = createAsyncThunk('DeliveryMethod/get', async () => {
  const response = await axios.get(`http://localhost:8080/rest/deliveryMethods`);
  return response.data;
});


//UserPaymenMethod
export const getUserPaymenMethodByUserId = createAsyncThunk('UserPaymenMethod/get', async (userId) => {
  const response = await axios.get(`http://localhost:8080/rest/UserPaymenMethods/${userId}`);
  return response.data;
});


//listProduct
export const getProductItem = createAsyncThunk('productItem/get', async () => {
  const response = await axios.get('http://localhost:8080/rest/productItems');
  return response.data;
});


//logogin
export const doLogin = createAsyncThunk('auth/signin', async (credentials) => {
  const response = await axios.post('http://localhost:8080/api/auth/signin', credentials);
  return response.data;
});