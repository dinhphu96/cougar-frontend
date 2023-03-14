
//shopOrder
export const getCartSelector = (state) => state.ShopOrder.cartItems;
export const getShopOrderSelector = (state) => state.ShopOrder.shopOrder;
export const getUserSelector = (state) => state.ShopOrder.user;



//product
export const getPrISelector = (state) => state.ShopOrder.productItems;

//product show home
export const getProductsSelector = (state) => state.ShopOrder.productItems.reduce((accumulator, currentValue) => {
    
  if (!accumulator.some(item => item.product.id === currentValue.product.id)) {
    accumulator.push(currentValue);
  }
  return accumulator;
}, []);


export const getListWishListSelector = (state)=> state.ShopOrder.wishLists;

export const getOnePrISelector = (id) => (state) =>
  state.ShopOrder.productItems.find((pr) => pr.id === +id);

export const getRelatedProductItemsSelector = (productItem) => (state) =>
  state.ShopOrder.productItems.filter((pr) => pr.product.id === productItem.product.id);




//adress
export const getAddressSelector = (state) => state.ShopOrder.userAddresses;

//Delivery method
export const getDeliveryMethodSelector = (state) => state.ShopOrder.deliverys;

//userPaymenMethod
export const getUserPaymenMethodSelector = (state) => state.ShopOrder.userPaymenMethod;


//listProductCard
// export const getListCardSelector = (state)=> state.ShopOrder.cartItems;