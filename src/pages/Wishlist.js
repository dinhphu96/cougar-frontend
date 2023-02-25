import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";

import cross from "../images/cross.svg";

import product02 from "../images/product/product-02.png";
import product03 from "../images/product/BlocktechParka-red.png";
import product04 from "../images/product/AirSense Jacket-beige.png";

const Wishlist = () => {
  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="wishlist-card position-relative">

              <img
                src={cross}
                alt="cross"
                className="position-absolute cross img-fluid"
              />

              <div className="wishlist-card-image bg-white">
                <img
                  src={product02}
                  className="img-fluid w-100"
                  alt="watch"
                />
              </div>

              <div className="py-3 px-3">
                <h5 className="title">
                  Watch
                </h5>
                <h6 className="price">$ 100</h6>
              </div>

            </div>
          </div>

          <div className="col-3">
            <div className="wishlist-card position-relative">
              <img
                src={cross}
                alt="cross"
                className="position-absolute cross img-fluid"
              />
              <div className="wishlist-card-image bg-white">
                <img
                  src={product03}
                  className="img-fluid w-100"
                  alt="watch"
                />
              </div>
              <div className="py-3 px-3">
                <h5 className="title">
                  Hat
                </h5>
                <h6 className="price">$ 100</h6>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="wishlist-card position-relative">
              <img
                src={cross}
                alt="cross"
                className="position-absolute cross img-fluid"
              />
              <div className="wishlist-card-image bg-white">
                <img
                  src={product04}
                  className="img-fluid w-100"
                  alt="watch"
                />
              </div>
              <div className="py-3 px-3">
                <h5 className="title">
                  Bag
                </h5>
                <h6 className="price">$ 100</h6>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
