import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Color from "../components/Color";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/exports";
import {
  addNewOrderDetail,
  updateOrderDetail,
  addNewOrder,
} from "../store/shop_order/api";
import {
  getCartSelector,
  getUserSelector,
  getShopOrderSelector,
  getOnePrISelector,
  getRelatedProductItemsSelector,
} from "../store/shop_order/selectors";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";





const SingleProduct = () => {
  const { id } = useParams();
  const [changProductItem, setChangProductItem] = useState(id);

  //cuộn trang
  useEffect(() => {
    window.scrollTo(0, 300);
  }, []);

  const navigate = useNavigate();
  const singleProduct = useSelector(getOnePrISelector(changProductItem));
  const [borderColor, setBorderColor] = useState(0);
  const [listColor, setListColor] = useState([]);

  const listRelatedProductItems = useSelector(
    getRelatedProductItemsSelector(singleProduct)
  );

  useEffect(() => {
    if(listRelatedProductItems.length){
      const listCol = listRelatedProductItems.map((pro=>pro.color))

       setListColor(listCol);
    }
  
  }, [listRelatedProductItems.length]);

  useEffect(()=>{
    
    if(singleProduct){
      setBorderColor(singleProduct.id);
    }

  },[singleProduct])


  if (singleProduct) {
    var image = singleProduct.image;
    var brand = singleProduct.product.brand.name;
    var description = singleProduct.product.description;
    var name = singleProduct.product.name;
    var price = singleProduct.price;
    var categoryName = singleProduct.product.subcategory.name;
    var inStock = singleProduct.qtyInStock !== 0 ? "In Stock" : "Out of Stock";
  }

  // const [orderedProduct, setorderedProduct] = useState(true); //Write a Review
  const copyToClipboard = (text) => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  // const shopOrder = useSelector(getShopOrderSelector);
  const listCartItem = useSelector(getCartSelector);
  const userr = useSelector(getUserSelector);
  const shopOrder = useSelector(getShopOrderSelector);
  const dispatch = useDispatch();
  const [quty, setQuty] = useState(1);
  const setQuantity = (e) => {
    setQuty(+e.target.value);
  };
  const handleAddToCart = () => {
    if (userr.id !== undefined) {
      const { color, size, ...productAdd } = singleProduct;
      if (listCartItem.length !== 0) {
        const cartItem = {
          qty: quty,
          price: singleProduct.price,
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
            qty: quty,
            price: singleProduct.price,
            productItem: productAdd,
            shopOrder: shopOrder,
          };
          dispatch(addNewOrderDetail(cartItem));
        } else {
          const shopO = {
            user: userr,
          };

          const cartItem = {
            qty: quty,
            price: singleProduct.price,
            productItem: productAdd,
          };

          dispatch(addNewOrder({ shopOrder: shopO, orderDetail: cartItem }));
        }
      }

      toast.info(`Added - (${quty}) ${name}`, {
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

  const handleClickImage = (pro) => {
    setChangProductItem(pro);
    setBorderColor(pro.id);
  };
  return (
    <>
      <Meta title={"Product Name"} />
      <BreadCrumb title="Product Name" />
      <Container class1="main-product-wrapper py-3 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <img
                  src={
                    singleProduct
                      ? `https://res.cloudinary.com/dmjh7imwd/image/upload/${image}`
                      : `logo192.png`
                  }
                  alt="ima"
                />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              {listRelatedProductItems.map((pro) => (
                <div
                  key={pro.id}
                  className={`${borderColor === pro.id ? "border border-2 border-danger": "border border-dark"}`}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    onClick={() => handleClickImage(pro.id)}
                    src={`https://res.cloudinary.com/dmjh7imwd/image/upload/${pro.image}`}
                    className="img-fluid"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{name}</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">{`$${price}`}</p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={4}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">( 2 Reviews )</p>
                </div>
                <a className="review-btn" href="#review">
                  Write a Review
                </a>
              </div>
              <div className=" py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Brand :</h3>
                  <p className="product-data">{brand}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category :</h3>
                  <p className="product-data">{categoryName}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Availablity :</h3>
                  <p className="product-data">{inStock}</p>
                </div>
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Size :</h3>
                  <div className="d-flex flex-wrap gap-15">
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      S
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      M
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XL
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XXL
                    </span>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Color :</h3>
                  <ul className="colors ps-0">
                    {
                      listColor.map(col=>(
                        <Color key={col} color={col}/>
                      ))
                    }
                  </ul>
                </div>
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  <h3 className="product-heading">Quantity :</h3>
                  <div className="">
                    <input
                      type="number"
                      name=""
                      value={quty}
                      onChange={setQuantity}
                      min={1}
                      max={10}
                      className="form-control"
                      style={{ width: "70px" }}
                      id=""
                    />
                  </div>
                  <div className="d-flex align-items-center gap-30 ms-5">
                    <button
                      onClick={handleAddToCart}
                      className="button border-0"
                      type="button"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    <Link>
                      <AiOutlineHeart className="fs-5 me-2" /> Add to Wishlist
                    </Link>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column  my-3">
                  <h3 className="product-heading">Shipping & Returns :</h3>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br /> We
                    ship all US domestic orders within
                    <b>5-10 business days!</b>
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-3">
                  <h3 className="product-heading">Product Link:</h3>
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      copyToClipboard(
                        `https://res.cloudinary.com/dmjh7imwd/image/upload/${image}`
                      );
                    }}
                  >
                    Copy Product Link
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper py3 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p>{description}</p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Based on 2 Reviews</p>
                  </div>
                </div>
                {true && (
                  <div>
                    <Link className="text-dark text-decoration-underline">
                      Write a Review
                    </Link>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Write a Review</h4>
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={true}
                      activeColor="#ffd700"
                    />
                  </div>
                  <div>
                    <textarea
                      name=""
                      id=""
                      className="w-100 form-control"
                      cols="30"
                      rows="4"
                      placeholder="Comments"
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="button border-0">Submit Review</button>
                  </div>
                </form>
              </div>
              <div className="reviews mt-4">
                <div className="review">
                  <div className="d-flex gap-10 align-items-center">
                    <h6 className="mb-0">Navdeep</h6>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                  </div>
                  <p className="mt-3">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Consectetur fugit ut excepturi quos. Id reprehenderit
                    voluptatem placeat consequatur suscipit ex. Accusamus dolore
                    quisquam deserunt voluptate, sit magni perspiciatis quas
                    iste?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
