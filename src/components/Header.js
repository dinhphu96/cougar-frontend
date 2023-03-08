import React from "react";
import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import wishlist from "../images/wishlist.svg";
import userAv from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import logo from "../images/cougar-logo.png";
import { useSelector } from "react-redux/es/exports";
import {
  getCartSelector,
  getUserSelector,
} from "../store/shop_order/selectors";

const Header = () => {
  const userrr = useSelector(getUserSelector);
  const listCartItem = useSelector(getCartSelector);
  const subTotal = listCartItem.reduce((total, init) => {
    return init.total + total;
  }, 0);

  const amount = listCartItem.length;

  // const [avatar, setAvatar] = useState(userAv);

  // useEffect(()=>{
  //   if(userSession){
  //     if(userSession.avatar !== null){
  //       setAvatar(`https://res.cloudinary.com/dmjh7imwd/image/upload/${userSession.avatar}`);
  //     }
  //   }
  // },[userSession])

  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Free Shipping Over $100 & Free Returns
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
                />
                <Link
                  to={"/"}
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
                  <Link
                    to="/login"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img className="img-fluid w-25 rounded-circle ms-2" src={userrr.avatar ? `https://res.cloudinary.com/dmjh7imwd/image/upload/${userrr.avatar}` : userAv} alt="user" />
                    <p className="mb-0">
                      {userrr.fullname !== undefined
                        ? userrr.fullname
                        : "Log in"}
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cart} alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">{amount}</span>
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
                      <span className="me-5 d-inline-block">
                        Shop Categories
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu py-0"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Men
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          women
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Kids
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
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
