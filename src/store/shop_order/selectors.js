export const getCartSelector = (state) => state.ShopOrder.cartItems;
export const getShopOrderSelector = (state) => state.ShopOrder.shopOrder;
export const getUserSelector = (state) => state.ShopOrder.user;
// export const getOptionsSelector = (state) => state.ShopOrder.options;







// .addCase(addNewOrderDetail.fulfilled, (state, action) => {
//     // action.payload == {orderDetail, listOption} listOption
//      const item = action.payload.orderDetail;
//      item.total = item.price * item.qty;
//      const sizeee = action.payload.listOption.find(op=>op.option.variation.name === "size");
//      // console.log(sizeee.option.value)
//      item.size = sizeee.option.value;
     
//      const colorr = action.payload.listOption.find(op=>op.option.variation.name === "color");
//      // console.log(colorr.option.value)
//      item.color = colorr.option.value;
//      state.cartItems.push(item);
//      state.options = action.payload.listOption;
     
//      state.status = "succeeded";
//    })