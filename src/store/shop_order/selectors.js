
//shopOrder
export const getCartSelector = (state) => state.ShopOrder.cartItems;
export const getShopOrderSelector = (state) => state.ShopOrder.shopOrder;
export const getUserSelector = (state) => state.ShopOrder.user;



//product
export const getPrISelector = (state) => state.ShopOrder.productItems;

export const getPrISelectorHome = (state) =>
  state.ShopOrder.productItems.filter((pr, index) => index < 8);

export const getOnePrISelector = (id) => (state) =>
  state.ShopOrder.productItems.find((pr) => pr.id == id);

export const getRelatedProductItemsSelector = (productItem) => (state) =>
  state.ShopOrder.productItems.filter((pr) => pr.product.id === productItem.product.id);







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