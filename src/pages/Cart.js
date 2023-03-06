import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CartItem from "../components/CartItem";
import { useSelector } from "react-redux/es/exports";
import { getCartSelector } from "../store/shop_order/selectors";
import { useEffect } from "react";

const Cart = () => {

   //cuộn trang
   useEffect(() => {
    window.scrollTo(0, 200);
  }, []);

  const listCartItem = useSelector(getCartSelector);
  const subTotal = listCartItem.reduce((total, init) => {
    return init.total + total;
  }, 0);


  const handleClick = (e)=>{
    if(listCartItem.length < 1){
      e.preventDefault();
    }
    
  }


  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1 ps-5">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            <div className="cartItem">
              {listCartItem.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button">
                Continue To Shopping
              </Link>
              <div className="d-flex flex-column align-items-end">
                <h4>SubTotal: $ {subTotal}</h4>
                <p>Taxes and shipping calculated at checkout</p>
                <Link to="/checkout" className="button" onClick={handleClick}>
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
