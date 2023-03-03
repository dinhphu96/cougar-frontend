export const getPrISelector = (state) => state.ProductItem.productItems;

export const getPrISelectorHome = (state) =>
  state.ProductItem.productItems.filter((pr, index) => index < 8);

export const getOnePrISelector = (id) => (state) =>
  state.ProductItem.productItems.find((pr) => pr.id == id);

export const getRelatedProductItemsSelector = (productItem) => (state) =>
  state.ProductItem.productItems.filter((pr) => pr.product.id === productItem.product.id);
