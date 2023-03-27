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
  getProductItem,
  getWishListByUserId,
} from "./store/shop_order/api";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  getShopOrderSelector,
  getUserSelector,
} from "./store/shop_order/selectors";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import ShopOrderSlice from "./store/shop_order/slice";
import YourOrder from "./pages/YourOrder";

function App() {
  const dispatch = useDispatch();
  
  const sessionUser = JSON.parse(sessionStorage.getItem("SHARE_USER"));
 
  
  useEffect(()=>{
    dispatch(getProductItem());
  },[dispatch])

    useEffect(()=>{
      if(sessionUser){
        dispatch(ShopOrderSlice.actions.getUser(sessionUser));
      }
    },[dispatch, sessionUser !== null])

  const user = useSelector(getUserSelector);
  
  useEffect(() => {
    if (user.id) {
      dispatch(getShopOrderByUserId(user.id));
      dispatch(getWishListByUserId(user.id))
    }
  }, [dispatch, user.id]);

  const shopOrder = useSelector(getShopOrderSelector);
  useEffect(() => {
    if (shopOrder) {
       dispatch(getOrderDetailByShopId(shopOrder.id));
    }
  }, [dispatch, shopOrder]);
  const userLogin = sessionStorage.getItem("SHARE_USER");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            {userLogin ? (<Route path="yourorder" element={<YourOrder />} />) : null}
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
            <Route path="profile" element={<Profile />}/>
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
