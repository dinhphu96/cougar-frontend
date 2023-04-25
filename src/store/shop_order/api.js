import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Shoporder
export const getShopOrderByUserId = createAsyncThunk(
  "Order/get",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:8080/api/v1/shopOrders/${userId}`
    );
    return response.data;
  }
);

export const addNewOrder = createAsyncThunk(
  "Order/add",
  async (orderorderDetail) => {
    const response = await axios.post(
      "http://localhost:8080/api/v1/shopOrders",
      orderorderDetail
    );
    return response.data;
  }
);

export const updateOrder = createAsyncThunk(
  "Order/update",
  async ([payment, UpdateShopOrder]) => {
    if (payment === null) {
      const response = await axios.put(
        `http://localhost:8080/api/v1/shopOrders/${UpdateShopOrder.id}`,
        UpdateShopOrder
      );
      return response.data;
    } else {
      const paymentResponse = await axios.post(
        "http://localhost:8080/api/v1/userPaymentMethods",
        payment
      );
      UpdateShopOrder.userPaymentMethod = paymentResponse.data;
      const response = await axios.put(
        `http://localhost:8080/api/v1/shopOrders/${UpdateShopOrder.id}`,
        UpdateShopOrder
      );
      return response.data; 
    }
  }
);

/*-------------------------------------------------------------------------*/

//orderDetail
export const addNewOrderDetail = createAsyncThunk(
  "OrderDetail/add",
  async (orderDetail) => {
    const response = await axios.post(
      "http://localhost:8080/api/v1/orderDetails",
      orderDetail
    );
    return response.data;
  }
);

export const updateOrderDetail = createAsyncThunk(
  "OrderDetail/update",
  async (OrderDetail) => {
    const response = await axios.put(
      `http://localhost:8080/api/v1/orderDetails/${OrderDetail.id}`,
      OrderDetail
    );
    return response.data;
  }
);

export const getOrderDetailByShopId = createAsyncThunk(
  "OrderDetail/getListOrderDetail",
  async (shopOrderId) => {
    const response = await axios.get(
      `http://localhost:8080/api/v1/orderDetails/${shopOrderId}`
    );
    return response.data;
  }
);

export const deleteOrderDetaiById = createAsyncThunk(
  "OrderDetail/delete",
  async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/orderDetails/${id}`);
    return id;
  }
);

/*-------------------------------------------------------------------------*/

//user
// export const getUserById = createAsyncThunk('User/getById', async (id) => {
//   const response = await axios.get(`http://localhost:8080/rest/users/${id}`);
//   return response.data;
// });

export const updateUser = createAsyncThunk("User/update", async (user) => {
  if(user.checkImage){
    const response = await axios.put(
      `http://localhost:8080/api/v1/users/updateWithAvatar`,
      user.user
    );
    return response.data;
  }else{
    const response = await axios.put(
      `http://localhost:8080/api/v1/users/update`,
      user.user
    );
    return response.data;
  }
});

/*-------------------------------------------------------------------------*/

//addesses
export const getAddressesByUserId = createAsyncThunk(
  "Addess/get",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:8080/api/v1/addresses/${userId}`
    );
    return response.data;
  }
);

export const addNewAddress = createAsyncThunk(
  "Address/add",
  async (address) => {
    const response = await axios.post(
      "http://localhost:8080/api/v1/addresses",
      address
    );
    return response.data;
  }
);

export const updateAddress = createAsyncThunk(
  "Address/update",
  async (address) => {
    const response = await axios.put(
      `http://localhost:8080/api/v1/addresses/${address.id}`,
      address
    );
    return response.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "Address/delete",
  async (IdAddress) => {
    await axios.delete(`http://localhost:8080/api/v1/addresses/${IdAddress}`);
    return IdAddress;
  }
);

export const setAsDefaultAddress = createAsyncThunk(
  "Addess/setAsDefault",
  async (address) => {
    const response = await axios.put(
      `http://localhost:8080/api/v1/addresses/setAsDefault`,
      address
    );
    return response.data;
  }
);

/*-------------------------------------------------------------------------*/

//DeliveryMethod
export const getDeliveryByUserId = createAsyncThunk(
  "DeliveryMethod/get",
  async () => {
    const response = await axios.get(
      `http://localhost:8080/api/v1/deliveryMethods`
    );
    return response.data;
  }
);

/*-------------------------------------------------------------------------*/

//UserPaymenMethod
export const getUserPaymenMethodByUserId = createAsyncThunk(
  "UserPaymentMethod/get",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:8080/api/v1/userPaymentMethods/${userId}`
    );
    return response.data;
  }
);

export const addNewUserPayment = createAsyncThunk(
  "UserPaymentMethod/add",
  async (payment) => {
    const response = await axios.post(
      "http://localhost:8080/api/v1/userPaymentMethods",
      payment
    );
    return response.data;
  }
);

export const getListPaymentType = createAsyncThunk(
  "PaymentType/get",
  async () => {
    const response = await axios.get(`http://localhost:8080/api/v1/paymentTypes`);
    return response.data;
  }
);

/*-------------------------------------------------------------------------*/

//listProduct
export const getProductItem = createAsyncThunk("productItem/get", async () => {
  const response = await axios.get("http://localhost:8080/api/v1/productItems");
  return response.data;
});

/*-------------------------------------------------------------------------*/

//logogin
export const doLogin = createAsyncThunk(
  "auth/signin",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/signin",
        credentials
      );
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
export const getWishListByUserId = createAsyncThunk(
  "WishList/get",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:8080/api/v1/wishLists/${userId}`
    );
    return response.data;
  }
);

export const addWishList = createAsyncThunk(
  "WishList/add",
  async (wishList) => {
    const response = await axios.post(
      "http://localhost:8080/api/v1/wishLists",
      wishList
    );
    return response.data;
  }
);

export const deleteWishListById = createAsyncThunk(
  "WishList/delete",
  async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/wishLists/${id}`);
    return id;
  }
);

export const doChangePassword = createAsyncThunk(
  "auth/changepassword",
  async (info, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/change-password",
        info
      );
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

export const getAllInvoiceByUserId = createAsyncThunk('getAllInvoiceByUserId', async (id) => {
  const response = await axios.get(`http://localhost:8080/api/v1/shopOrders/all/${id}`);
  return response.data;
});

export const getAllInvoiceDetailByUserId = createAsyncThunk('getAllInvoiceDetailByUserId', async (id) => {
  const response = await axios.get(`http://localhost:8080/api/v1/orderDetails/all/${id}`);
  return response.data;
});
