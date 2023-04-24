import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import wishlist from "../images/wishlist.svg";
import userAv from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import logo from "../images/cougar-logo.png";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
  getCartSelector,
  getUserSelector,
} from "../store/shop_order/selectors";
import ShopOrderSlice from "../store/shop_order/slice";
import { subCategoriesList, productItems, categoriesList, categoriesSelector, headerSelector } from "../store/filtersStore/filtersSelector";
import { getCategories, getSubCategories } from "../store/filtersStore/api";
import { useEffect } from "react";
import filtersSlice from "../store/filtersStore/filtersSlice";

const Header = () => {
  const userrr = useSelector(getUserSelector);
  const listCartItem = useSelector(getCartSelector);
  const listSubCategories = useSelector(subCategoriesList);
  const listProductItems = useSelector(productItems);

  const categories = useSelector(categoriesList);
  const listCheckedCategories = useSelector(categoriesSelector);
  const headerCategories = useSelector(headerSelector);
  const [filterSearch, setFilterSearch] = useState('');

  const userL = localStorage.getItem("SHARE_USER");
  const subTotal = listCartItem.reduce((total, init) => {
    return init.total + total;
  }, 0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubCategories());
  }, [dispatch]);

  const amount = listCartItem.length;

  const handleLogout = () => {
    localStorage.removeItem("accessToken_cougarshop");
    localStorage.removeItem("SHARE_USER");
    dispatch(ShopOrderSlice.actions.removeUser());
  };

  const handleHome = () =>{
    dispatch(filtersSlice.actions.categoryHeaderChange(''));
    dispatch(filtersSlice.actions.productTagChooseChange(''));
  }

  const counts = (name, cate) => {
    var c = 0;
    listProductItems.map((pr) => {
      if (pr.product.subcategory.name === name && pr.product.subcategory.category.id === cate) {
        c++;
      }
    })
    return c;
  }

  const handleCategoryHeader = (cate) =>{
    dispatch(filtersSlice.actions.categoryHeaderChange(cate.target.id));
    dispatch(filtersSlice.actions.productTagChooseChange(cate.target.name));
  }

  const handleSearch = (text) =>{
    console.log(text.target.value);
    dispatch(filtersSlice.actions.searchChange(text.target.value));
  }

  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                The world's No. 1 prestigious sales shop
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:
                <span className="text-white">+84 399 797979</span>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-4">
              <Link to="/" className="text-white d-flex align-items-center">
                <img
                  style={{ width: "20%", marginRight: "10px" }}
                  src={logo}
                  alt="logo"
                />
                <h2>Cougar Shop</h2>
              </Link>
            </div>
            <div className="col-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                  onChange={handleSearch}
                />
                <Link
                  to="/product"
                  className="input-group-text p-3"
                  id="basic-addon2"
                >
                  <BsSearch className="fs-6" />
                </Link>
              </div>
            </div>
            <div className="col-4">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={wishlist} alt="wishlist" />
                    <p className="mb-0">
                      Favourite <br /> wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  {userrr.id ? (
                    <div className="dropdown">
                      <Link
                        className="d-flex align-items-center gap-10 text-white  dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          className="img-fluid w-25 rounded-circle ms-2"
                          src={
                            userrr.avatar
                              ? `https://res.cloudinary.com/dmjh7imwd/image/upload/${userrr.avatar}`
                              : userAv
                          }
                          alt="user"
                        />
                        <p className="mb-0">{userrr.fullname}</p>
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link
                            className="dropdown-item"
                            href="#"
                            to={"/profile"}
                          >
                            Edit profile
                          </Link>
                        </li>

                        <li>
                          <Link
                            className="dropdown-item"
                            to={"/change-password"}
                          >
                            Change password
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/"}
                            className="dropdown-item"
                            href="#"
                            onClick={handleLogout}
                          >
                            Log out
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <Link
                      to={"/login"}
                      className="d-flex align-items-center gap-10 text-white"
                    >
                      <img
                        className="img-fluid w-25 rounded-circle ms-2"
                        src={userAv}
                        alt="user"
                      />
                      <p className="mb-0">Log in</p>
                    </Link>
                  )}
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <div className="position-relative">
                      <img src={cart} alt="cart" />
                      <span className="badge bg-white text-dark position-absolute top-0 start-100 translate-middle rounded-pill">{amount}</span>
                    </div>
                    <div className="d-flex flex-column gap-10">
                      <p className="mb-0">${subTotal}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={menu} alt="" />
                      <span className="me-5 d-inline-block"> Shop Categories </span>
                    </button>

                    <ul className="dropdown-menu py-0" style={{ width: '1000px' }} aria-labelledby="dropdownMenuButton1">
                      <div className="row mx-5 my-3" >
                        <div className="col-4">
                          <h3 className="text-primary ">Men</h3>
                          <ul className="list-unstyled border-primary">
                            {
                              listSubCategories.map((sub) => {
                                if (sub.category.id === 1) {
                                  return <li key={sub.id} onClick={handleCategoryHeader}><Link id='Men' className=" text-white" name={sub.name} to="/product"> {sub.name} ({counts(sub.name, 1)})</Link></li>
                                }
                              })
                            }
                          </ul>
                        </div>
                        <div className="col-4">
                          <h3 className="text-warning">Women</h3>
                          <ul className="list-unstyled border-warning">
                            {
                              listSubCategories.map((sub) => {
                                if (sub.category.id === 2) {
                                  return <li key={sub.id} onClick={handleCategoryHeader}><Link id='Women' className=" text-white" name={sub.name} to="/product"> {sub.name} ({counts(sub.name, 2)})</Link></li>
                                }
                              })
                            }
                          </ul>
                        </div>
                        <div className="col-4" >
                          <h3 className="text-danger">Kids</h3>
                          <ul className="list-unstyled border-danger">
                            {
                              listSubCategories.map((sub) => {
                                if (sub.category.id === 3) {
                                  return <li key={sub.id} onClick={handleCategoryHeader}><Link id='Kids' className=" text-white" name={sub.name} to="/product"> {sub.name} ({counts(sub.name, 3)})</Link></li>
                                }
                              })
                            }
                          </ul>
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink onClick={handleHome} to="/">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    {userL ? <NavLink to="/yourorder">Your Order</NavLink> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
