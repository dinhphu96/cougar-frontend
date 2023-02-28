export const getPrISelector = (state) => state.ProductItem.productItems;
export const getPrISelectorHome = (state) => state.ProductItem.productItems.filter((pr,index)=>index < 8);
export const getOnePrISelector = (state) => state.ProductItem.product;