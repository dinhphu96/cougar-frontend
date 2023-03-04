
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




//adress
export const getAddressSelector = (state) => state.ShopOrder.userAddresses;