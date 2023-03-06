//product show home
export const getProductsSelector = (state) => state.ShopOrder.productItems.reduce((accumulator, currentValue) => {
    
    if (!accumulator.some(item => item.product.id === currentValue.product.id)) {
      accumulator.push(currentValue);
    }
    return accumulator;
  }, []);


