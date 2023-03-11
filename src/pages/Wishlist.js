import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import cross from "../images/cross.svg";
import { useSelector } from "react-redux";
import { getListWishListSelector } from "../store/shop_order/selectors";
import { useDispatch } from "react-redux";
import { deleteWishListById } from "../store/shop_order/api";
const Wishlist = () => {
  const listWishList = useSelector(getListWishListSelector);
  const dispatch = useDispatch();

  const handleDeleteWishList = (id)=>{
    dispatch(deleteWishListById(id));
  }

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
                  onClick={()=>handleDeleteWishList(wi.id)}
                />

                <div className="wishlist-card-image bg-white">
                  <img
                    src={`https://res.cloudinary.com/dmjh7imwd/image/upload/${wi.productItem.image}`}
                    className="img-fluid w-100"
                    alt="watch"
                  />
                </div>

                <div className="py-3 px-3">
                  <h5 className="title">{wi.productItem.product.name}</h5>
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
