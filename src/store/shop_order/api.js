import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//Shoporder
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


/*-------------------------------------------------------------------------*/

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

/*-------------------------------------------------------------------------*/

//user
export const getUserById = createAsyncThunk('User/getById', async (id) => {
  const response = await axios.get(`http://localhost:8080/rest/users/${id}`);
  return response.data;
});

/*-------------------------------------------------------------------------*/

//addesses
export const getAddressesByUserId = createAsyncThunk('Addess/get', async (userId) => {
  const response = await axios.get(`http://localhost:8080/rest/addresses/${userId}`);
  return response.data;
});

export const addNewAddress = createAsyncThunk('Address/add', async (address) => {
  const response = await axios.post("http://localhost:8080/rest/addresses", address);
  return response.data;
});

/*-------------------------------------------------------------------------*/

//DeliveryMethod
export const getDeliveryByUserId = createAsyncThunk('DeliveryMethod/get', async () => {
  const response = await axios.get(`http://localhost:8080/rest/deliveryMethods`);
  return response.data;
});

/*-------------------------------------------------------------------------*/

//UserPaymenMethod
export const getUserPaymenMethodByUserId = createAsyncThunk('UserPaymenMethod/get', async (userId) => {
  const response = await axios.get(`http://localhost:8080/rest/UserPaymenMethods/${userId}`);
  return response.data;
});

/*-------------------------------------------------------------------------*/

//listProduct
export const getProductItem = createAsyncThunk('productItem/get', async () => {
  const response = await axios.get('http://localhost:8080/rest/productItems');
  return response.data;
});

/*-------------------------------------------------------------------------*/

//logogin
export const doLogin = createAsyncThunk(
  'auth/signin',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signin', credentials);
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue("Unexpected error occurred");
      }
    }
  }
);

/*-------------------------------------------------------------------------*/

//list wishlist
export const getWishListByUserId = createAsyncThunk('WishList/get', async (userId) => {
  const response = await axios.get(`http://localhost:8080/rest/wishLists/${userId}`);
  return response.data;
});


export const addWishList = createAsyncThunk('WishList/add', async (wishList) => {
  const response = await axios.post("http://localhost:8080/rest/wishLists", wishList);
  return response.data;
});

export const deleteWishListById = createAsyncThunk('WishList/delete', async (id) => {
  await axios.delete(`http://localhost:8080/rest/wishLists/${id}`);
  return id;
});


export const doChangePassword = createAsyncThunk('auth/change-password', async (password) => {
  const response = await axios.post("http://localhost:8080/api/auth/change-password", password);
  return response.data;
});
