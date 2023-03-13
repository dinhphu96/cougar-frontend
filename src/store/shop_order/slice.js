import { createSlice } from "@reduxjs/toolkit";
import {
  getShopOrderByUserId,
  addNewOrder,
  updateOrder,
  addNewOrderDetail,
  getOrderDetailByShopId,
  updateOrderDetail,
  deleteOrderDetaiById,
  getUserById,
  getAddressesByUserId,
  getProductItem,
  getDeliveryByUserId,
  getUserPaymenMethodByUserId,
  doLogin,
  addWishList,
  getWishListByUserId,
  deleteWishListById,
  addNewAddress,
  doChangePassword,
  updateUser,
  deleteAddress,
  updateAddress,
  setAsDefaultAddress
} from "./api";

const ShopOrderSlice = createSlice({
  name: "ShopOrder",
  initialState: {
    productItems: [],
    user: {},
    wishLists: [],
    cartItems: [],
    shopOrder: null,
    userAddresses: [],
    deliverys: [],
    userPaymenMethod: [], //laListmaBip
    status: "idle",
    error: null,
  },
  reducers: {
    getCart: (state) => {
      return state.cartItems;
    },

    removeUser: (state) => {
      state.user = {};
      state.wishLists = [];
      state.cartItems = [];
      state.shopOrder = null;
      state.userAddresses = [];
      state.userPaymenMethod = {};
      state.deliverys = [];
    },
  },
  extraReducers: (builder) => {
    builder

      //get list,Product
      .addCase(getProductItem.pending, (state) => {
        state.status = "loading";
      })

      .addCase(getProductItem.fulfilled, (state, action) => {
       
        const list = action.payload.reduce((accumulator, currentValue) => {
          const { color, size, ...rest } = currentValue;
          const newPr = rest.productItem;
          newPr.color = currentValue.color;
          newPr.size = currentValue.size;
          accumulator.push(newPr);
         
          return accumulator;
        }, []);
        state.productItems = list;

        state.status = "idle";
      })

      //get shopOrder By UserId
      .addCase(getShopOrderByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getShopOrderByUserId.fulfilled, (state, action) => {
        state.shopOrder = action.payload;
        state.status = "idle";
      })

      //add shopOrder + orderDetail started
      .addCase(addNewOrder.fulfilled, (state, action) => {
        const item = action.payload.orderDetail;
        item.total = item.price * item.qty;

        state.productItems.forEach((proI) => {
          if (proI.id === item.productItem.id) {
            item.color = proI.color;
            item.size = proI.size;
          }
        });

        state.cartItems.push(item);
        state.shopOrder = action.payload.shopOrder;
        state.status = "succeeded";
      })

      .addCase(addNewOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //put shopOrder
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.shopOrder = null;
        state.cartItems = [];
      })

      .addCase(updateOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      /*-----------------------------------------------------------------------------*/

      //OrderDetail
      //get orderdetail By ShopId
      .addCase(getOrderDetailByShopId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrderDetailByShopId.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.cartItems.map((item) => (item.total = item.qty * item.price));

        state.cartItems.forEach((item) => {
          state.productItems.forEach((pro) => {
            if (item.productItem.id === pro.id) {
              item.color = pro.color;
              item.size = pro.size;
            }
          });
        });

        state.status = "idle";
      })

      //post orderDetail if shopID
      .addCase(addNewOrderDetail.fulfilled, (state, action) => {
        const item = action.payload;
        item.total = item.price * item.qty;

        state.productItems.forEach((proI) => {
          if (proI.id === item.productItem.id) {
            item.color = proI.color;
            item.size = proI.size;
          }
        });

        state.cartItems.push(item);
        state.status = "succeeded";
      })

      .addCase(addNewOrderDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //update orderDetail
      .addCase(updateOrderDetail.fulfilled, (state, action) => {
        const item = action.payload;
        item.total = item.price * item.qty;

        state.productItems.forEach((proI) => {
          if (proI.id === item.productItem.id) {
            item.color = proI.color;
            item.size = proI.size;
          }
        });

        const existing = state.cartItems.find((ite) => ite.id === item.id);
        if (existing) {
          Object.assign(existing, item);
        }

        state.status = "succeeded";
      })

      .addCase(updateOrderDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //update orderDetail end

      //delete orderdetail
      .addCase(deleteOrderDetaiById.fulfilled, (state, action) => {
        const id = action.payload;
        const existing = state.cartItems.find((ite) => ite.id === id);
        if (existing) {
          state.cartItems = state.cartItems.filter((ite) => ite.id !== id);
        }

        state.status = "succeeded";
      })

      .addCase(deleteOrderDetaiById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      /*------------------------------------------------------------------ */

      //getUserById
      .addCase(getUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        const { password, ...userpayload } = action.payload;
        state.user = userpayload;
        state.status = "idle";
      })

      .addCase(updateUser.fulfilled, (state, action)=>{
        const { password, ...userpayload } = action.payload;
        state.user = userpayload;

        state.status = "Successed";
      })
      .addCase(updateUser.rejected, (state)=>{
        state.status = "Error";
      })

      //get addesses By UserId
      .addCase(getAddressesByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAddressesByUserId.fulfilled, (state, action) => {
        state.userAddresses = action.payload;
        state.status = "idle";
      })

      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.userAddresses.push(action.payload);
        state.status = "Successed";
      })
      .addCase(addNewAddress.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(updateAddress.fulfilled, (state, action) => {
        const exit = state.userAddresses.find(ad=>ad.id === action.payload.id);

        if(exit){
          Object.assign(exit, action.payload);
        }
        state.status = "Successed";
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.userAddresses = state.userAddresses.filter(ad=>ad.id !== action.payload);
        state.status = "Delete Successed";
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(setAsDefaultAddress.fulfilled, (state, action) => {
        state.userAddresses = action.payload;
        state.status = "Successed";
      })
      .addCase(setAsDefaultAddress.rejected, (state, action) => {
        state.error = action.error.message;
      })

      //get list deliveryMethod
      .addCase(getDeliveryByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDeliveryByUserId.fulfilled, (state, action) => {
        state.deliverys = action.payload;
        state.status = "idle";
      })

      //get UserPaymenMethod by user id
      .addCase(getUserPaymenMethodByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserPaymenMethodByUserId.fulfilled, (state, action) => {
        state.userPaymenMethod = action.payload;
        state.status = "idle";
      })

      //login
      .addCase(doLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        sessionStorage.setItem("user", JSON.stringify(action.payload));
        state.error = "Successed";
      })

      .addCase(doLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = {};
        state.error = action.payload;
      })

      //get wishList by user id
      .addCase(getWishListByUserId.pending, (state) => {
        state.status = "Loading...";
      })
      .addCase(getWishListByUserId.fulfilled, (state, action) => {
        state.wishLists = action.payload;
        state.status = "Idle";
      })

      //add wishlist
      .addCase(addWishList.fulfilled, (state, action) => {
        state.wishLists.push(action.payload);

        state.status = "Successed";
      })
      .addCase(addWishList.rejected, (state, action) => {
        state.error = action.error.message;
      })

      //delete wishlist
      .addCase(deleteWishListById.fulfilled, (state, action) => {
        const exist = state.wishLists.find((wi) => wi.id === action.payload);

        if (exist) {
          state.wishLists = state.wishLists.filter(
            (wi) => wi.id !== action.payload
          );
        }

        state.state = "Successed";
      })
      .addCase(deleteWishListById.rejected, (state, action) => {
        state.error = action.error.message;
      })

      //Change-password
      .addCase(doChangePassword.fulfilled, (state, action) => {
        state.status = "Successed";
      })
      .addCase(doChangePassword.rejected, (state, action) => {
        state.status = "Failed";
      });
  },
});
export default ShopOrderSlice;
