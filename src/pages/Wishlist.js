import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import cross from "../images/cross.svg";
import { useSelector } from "react-redux";
import { getListWishListSelector } from "../store/shop_order/selectors";
import { useDispatch } from "react-redux";
import { deleteWishListById } from "../store/shop_order/api";
import { Link } from "react-router-dom";
const Wishlist = () => {
  const listWishList = useSelector(getListWishListSelector);
  const dispatch = useDispatch();

  const handleDeleteWishList = (id) => {
    dispatch(deleteWishListById(id));
  };

  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {listWishList.map((wi) => (
            <div key={wi.id} className="col-3">
              <div className="wishlist-card position-relative">
                <img
                  src={cross}
                  alt="cross"
                  className="position-absolute cross img-fluid"
                  onClick={() => handleDeleteWishList(wi.id)}
                />

                <div className="wishlist-card-image bg-white">
                  <Link to={"/product/" + wi.productItem.id}>
                    <img
                      src={`https://res.cloudinary.com/dmjh7imwd/image/upload/${wi.productItem.image}`}
                      className="img-fluid w-100"
                      alt="watch"
                    />
                  </Link>
                </div>

                <div className="py-3 px-3">
                  <Link to={"/product/" + wi.productItem.id}>
                    <h5 className="title">{wi.productItem.product.name}</h5>
                  </Link>
                  <h6 className="price">$ {wi.productItem.price}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
