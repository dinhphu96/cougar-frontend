import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import wish from "../images/wish.svg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch } from "react-redux/es/exports";
import {
  getShopOrderSelector,
  getCartSelector,
  getUserSelector,
} from "../store/shop_order/selectors";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  addNewOrderDetail,
  updateOrderDetail,
  addNewOrder,
} from "../store/shop_order/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ProductCard = (props) => {
  const { grid, productItem } = props;
  const { color, size, ...productAdd } = productItem;
  
  const image = productItem.image;
  const brand = productItem.product.brand.name;
  const description = productItem.product.description;
  const name = productItem.product.name;
  const price = productItem.price;
  const idPr = productItem.id;

  let location = useLocation();

  const shopOrder = useSelector(getShopOrderSelector);
  const listCartItem = useSelector(getCartSelector);
  const userr = useSelector(getUserSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleAddProdTocart = () => {
    if (userr.id !== undefined) {
      if (listCartItem.length !== 0) {
        const cartItem = {
          qty: 1,
          price: price,
          productItem: productAdd,
          shopOrder: shopOrder,
        };
        const proExist = listCartItem.find(
          (ite) => ite.productItem.id === cartItem.productItem.id
        );
        if (proExist) {
          cartItem.id = proExist.id;
          cartItem.qty += proExist.qty;
          dispatch(updateOrderDetail(cartItem));
        } else {
          dispatch(addNewOrderDetail(cartItem));
        }
      } else {
        if (shopOrder) {
          const cartItem = {
            qty: 1,
            price: price,
            productItem: productAdd,
            shopOrder: shopOrder,
          };
          dispatch(addNewOrderDetail(cartItem));
        } else {
          const shopO = {
            user: userr,
          };

          const cartItem = {
            qty: 1,
            price: price,
            productItem: productAdd,
          };

          dispatch(addNewOrder({ shopOrder: shopO, orderDetail: cartItem }));
        }
      }

      toast.success(`Added - (1) ${name}`, {
        position: "top-right",
        autoClose: 700,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div
        className={` ${
          location.pathname === "/product"
            ? `gr-${grid}`
            : "col-lg-3 col-md-4 col-sm-6 col-12 p-2"
        } `}
      >
        <div className="product-card position-relative">
          <div className="wishlist-icon position-absolute">
            <button className="border-0 bg-transparent">
              <img src={wish} alt="wishlist" />
            </button>
          </div>
          <div className="product-image">
            <Link
              className="p"
              to={`${
                location.pathname === "/"
                  ? "product/" + idPr
                  : location.pathname === "/product"
                  ? idPr
                  : "/"
              }`}
            >
              <img
                src={`https://res.cloudinary.com/dmjh7imwd/image/upload/${image}`}
                className="img-fluid"
                alt="product image1"
              />
            </Link>
          </div>
          <div className="product-details">
            <h6 className="brand">{brand}</h6>
            <h5 className="product-title">
              <Link
                className="title"
                to={`${
                  location.pathname === "/"
                    ? "product/" + idPr
                    : location.pathname === "/product"
                    ? idPr
                    : "/"
                }`}
              >
                {name}
              </Link>
            </h5>
            <ReactStars count={5} size={24} value={3} activeColor="#ffd700" />
            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
              {description}
            </p>
            <p className="price">{`$${price}`}</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <Link
                to={`${
                  location.pathname === "/"
                    ? "product/" + idPr
                    : location.pathname === "/product"
                    ? idPr
                    : "/"
                }`}
                className="border-0 bg-transparent mb-2"
              >
                <img src={view} alt="view" />
              </Link>
              <button
                onClick={handleAddProdTocart}
                className="border-0 bg-transparent"
              >
                <img src={addcart} alt="addcart" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
