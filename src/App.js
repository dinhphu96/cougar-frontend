import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import OurStore from "./pages/OurStore";
import Blog from "./pages/Blog";
import SingleBlog from "./pages/SingleBlog";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Forgotpassword from "./pages/Forgotpassword";
import Signup from "./pages/Signup";
import Resetpassword from "./pages/Resetpassword";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import SingleProduct from "./pages/SingleProduct";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getOrderDetailByShopId,
  getShopOrderByUserId,
  getUserById,
  getProductItem
} from "./store/shop_order/api";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  getShopOrderSelector,
  getUserSelector,
} from "./store/shop_order/selectors";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  
  const useLogin = JSON.parse(sessionStorage.getItem("user"));

    useEffect(()=>{
      dispatch(getProductItem());
      if(useLogin){
        const useId  = useLogin.id;
        dispatch(getUserById(useId));

      }
    },[dispatch, useLogin !== null])

  const us = useSelector(getUserSelector);
  
  useEffect(() => {
    if (us.id) {
      dispatch(getShopOrderByUserId(us.id));
    }
  }, [dispatch, us.id]);

  const so = useSelector(getShopOrderSelector);
  useEffect(() => {
    if (so) {
       dispatch(getOrderDetailByShopId(so.id));
    }
  }, [dispatch, so]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="product" element={<OurStore />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="blogs" element={<Blog />} />
            <Route path="blog/:id" element={<SingleBlog />} />
            <Route path="cart" element={<Cart />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="forgot-password" element={<Forgotpassword />} />
            <Route path="signup" element={<Signup />} />
            <Route path="reset-password" element={<Resetpassword />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
