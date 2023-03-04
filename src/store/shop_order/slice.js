import { createSlice } from "@reduxjs/toolkit";
import {
  getShopOrderByUserId,
  addNewOrder,
  updateOrder,
  addNewOrderDetail,
  getOrderDetailByShopId,
  updateOrderDetail,
  deleteOrderDetaiById,
  getUserByEmail,
  deleteOrder,
  getAddressesByUsserId,
  getProductItem,
} from "./api";

const ShopOrderSlice = createSlice({
  name: "ShopOrder",
  initialState: {
    productItems: [],
    cartItems: [],
    shopOrder: null,
    user: {},
    userAddresses: [],
    status: "idle",
    error: null,
  },
  reducers: {
    getCart: (state) => {
      return state.cartItems;
    },
  },
  extraReducers: (builder) => {
    builder

      //get listProduct
      .addCase(getProductItem.pending, (state) => {
        state.status = "loading";
      })

      .addCase(getProductItem.fulfilled, (state, action) => {
        const list = action.payload;

        list.forEach((pr) => {
          const { color, size, ...rest } = pr;
          const newPr = rest.productItem;
          newPr.color = pr.color;
          newPr.size = pr.size;

          state.productItems.push(newPr);
        });

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

      // //put shopOrder
      // .addCase(updateOrder.fulfilled, (state, action) => {
      //   const updatedPrI = action.payload;
      //   const existing = state.productItems.find(
      //     (prI) => prI.id === updatedPrI.id
      //   );
      //   if (existing) {
      //     Object.assign(existing, updatedPrI);
      //   }
      //   state.status = "succeeded";
      // })

      // .addCase(updateOrder.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error.message;
      // })

      /*-----------------------------------------------------------------------------*/

      //OrderDetail
      //get orderdetail By ShopId
      .addCase(getOrderDetailByShopId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrderDetailByShopId.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.cartItems.map((item) => (item.total = item.qty * item.price));

        state.cartItems.map((item) => {
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

        const existing = state.cartItems.find(
          (ite) => ite.id === item.id
        );
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

      //get user By Email
      .addCase(getUserByEmail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserByEmail.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "idle";
      })

      //get addesses By UserId
      .addCase(getAddressesByUsserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAddressesByUsserId.fulfilled, (state, action) => {
        state.userAddresses = action.payload;
        state.status = "idle";
      });
  },
});
export default ShopOrderSlice;
