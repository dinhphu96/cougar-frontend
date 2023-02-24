import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
// import wishlist from "../images/wishlist.svg";
import product01 from "../images/product/BlocktechParka-women-pink.png";
import product03 from "../images/product/product-03.png";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";

const ProductCard = (props) => {
  const { grid } = props;
  // console.log(grid);
  let location = useLocation();

  return (
    <>
      <div className={` ${location.pathname === "/product" ? `gr-${grid}` : "col-lg-3 col-md-4 col-sm-6 col-12 p-2"} `}>
        <div className="product-card position-relative">
          <div className="wishlist-icon position-absolute">
            <button className="border-0 bg-transparent">
              <img src={wish} alt="wishlist" />
            </button>
          </div>
          <div className="product-image">
            <Link className="p" to={`${location.pathname === "/" ? "/product/:id" : location.pathname === "/product/:id" ? "/product/:id" : ":id"}`}>
              <img src={product01} className="img-fluid" alt="product image1" />
            </Link>
          </div>
          <div className="product-details">
            <h6 className="brand">Kappa</h6>
            <h5 className="product-title">
              <Link className="title" to={`${location.pathname === "/" ? "/product/:id" : location.pathname === "/product/:id" ? "/product/:id" : ":id"}`}>
              Cotton Tshirts Women 2023 Summer
              </Link>
            </h5>
            <ReactStars
              count={5}
              size={24}
              value={4}
              edit={false}
              activeColor="#ffd700"
            />
            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt...
            </p>
            <p className="price">$100.00</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <button className="border-0 bg-transparent">
                <img src={prodcompare} alt="compare" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={view} alt="view" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={addcart} alt="addcart" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={` ${location.pathname === "/product" ? `gr-${grid}` : "col-lg-3 col-md-4 col-sm-6 col-12 p-2"} `}>
        <div className="product-card position-relative">
          <div className="wishlist-icon position-absolute">
            <button className="border-0 bg-transparent">
              <img className="phu" src={wish} alt="wishlist" />
            </button>
          </div>
          <div className="product-image">
            <Link className="p" to={`${location.pathname === "/" ? "/product/:id" : location.pathname === "/product/:id" ? "/product/:id" : ":id"}`}>
              <img src={product03} className="img-fluid" alt="product image1" />
            </Link>
          </div>
          <div className="product-details">
            <h6 className="brand">Zefit</h6>
            <h5 className="product-title">
              <Link className="title" to={`${location.pathname === "/" ? "/product/:id" : location.pathname === "/product/:id" ? "/product/:id" : ":id"}`}>
              Fashional Wearing Baseball Cap
              </Link>
            </h5>
            <ReactStars
              count={5}
              size={24}
              value={4}
              edit={false}
              activeColor="#ffd700"
            />
            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt...
            </p>
            <p className="price">$100.00</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <button className="border-0 bg-transparent">
                <img src={prodcompare} alt="compare" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={view} alt="view" />
              </button>
              <button className="border-0 bg-transparent">
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
