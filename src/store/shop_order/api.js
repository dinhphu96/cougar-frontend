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

export const updateOrderAndPayment = createAsyncThunk('Order/updateOrderAndPayment', async ([payment,UpdateShopOrder]) => {
  const paymentResponse = await axios.post("http://localhost:8080/rest/userPaymentMethods", payment);
  UpdateShopOrder.userPaymentMethod = paymentResponse.data;
  const response = await axios.put(`http://localhost:8080/rest/shopOrders/${UpdateShopOrder.id}`, UpdateShopOrder);
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
// export const getUserById = createAsyncThunk('User/getById', async (id) => {
//   const response = await axios.get(`http://localhost:8080/rest/users/${id}`);
//   return response.data;
// });

export const updateUser = createAsyncThunk('User/update', async (user) => {
  const response = await axios.put(`http://localhost:8080/rest/users/update/${user.id}`, user);
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

export const updateAddress = createAsyncThunk('Address/update', async (address) => {
  const response = await axios.put(`http://localhost:8080/rest/addresses/${address.id}`, address);
  return response.data;
});

export const deleteAddress = createAsyncThunk('Address/delete', async (IdAddress) => {
  await axios.delete(`http://localhost:8080/rest/addresses/${IdAddress}`);
  return IdAddress;
});

export const setAsDefaultAddress = createAsyncThunk('Addess/setAsDefault', async (address) => {
  const response = await axios.put(`http://localhost:8080/rest/addresses/setAsDefault`, address);
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
export const getUserPaymenMethodByUserId = createAsyncThunk('UserPaymentMethod/get', async (userId) => {
  const response = await axios.get(`http://localhost:8080/rest/userPaymentMethods/${userId}`);
  return response.data;
});

export const addNewUserPayment = createAsyncThunk("UserPaymentMethod/add", async(payment)=>{
  const response = await axios.post("http://localhost:8080/rest/userPaymentMethods", payment);
  return response.data;
})

export const getListPaymentType = createAsyncThunk('PaymentType/get', async () => {
  const response = await axios.get(`http://localhost:8080/rest/paymentTypes`);
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


export const doChangePassword = createAsyncThunk(
  'auth/changepassword',
  async (info, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/change-password', info);
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        throw error;
      }
    }
  }
);

export const doReview = createAsyncThunk(
  'auth/review',
  async (review, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/review', review);
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        throw error;
      }
    }
  }
);