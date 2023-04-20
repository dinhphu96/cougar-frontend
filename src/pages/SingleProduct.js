import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Color from "../components/Color";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import moment from 'moment';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux";
import {
  addNewOrderDetail,
  updateOrderDetail,
  addNewOrder,
  addWishList
} from "../store/shop_order/api";
import {
  getCartSelector,
  getUserSelector,
  getShopOrderSelector,
  getListWishListSelector,
  getPrISelector
} from "../store/shop_order/selectors";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { doReview, doUpdateReview, getListReview } from "../store/review/api";
import StarRatings from "react-star-ratings";
import jwtDecode from "jwt-decode";
import { getListReviewByIdProductItem } from "../store/review/selectors";

const SingleProduct = () => {
  const { id } = useParams();
  const [singleProduct, setChangProductItem] = useState(null);
  const listWishList = useSelector(getListWishListSelector);
  const productItems = useSelector(getPrISelector);
  const [listRelatedProductItems, setlistRelatedProductItems] = useState([]);
  const listReviews = useSelector(getListReviewByIdProductItem);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    if (id && productItems.length) {
      const prI = productItems.find((pr) => pr.id === +id);
      if (prI) {
        setChangProductItem(prI);
        const listRelatedProductItems = () => productItems.filter((pr) => pr.product.id === prI.product.id);
        setlistRelatedProductItems(listRelatedProductItems);
      }
    }

  }, [productItems.length > 0, id]);

  //cuộn trang
  useEffect(() => {
    window.scrollTo(0, 300);
  }, []);

  const [borderColor, setBorderColor] = useState(0);
  const [listColor, setListColor] = useState([]);
  // const [listReview, setListReview] = useState([]);


  useEffect(() => {
    if (listRelatedProductItems.length) {
      const listCol = listRelatedProductItems.map((pro => pro.color));
      setListColor(listCol);
    }

  }, [listRelatedProductItems.length]);

  useEffect(() => {
    if (singleProduct) {
      setBorderColor(singleProduct.id);
      dispatch(getListReview(singleProduct.id));
    }
  }, [singleProduct]);

  useEffect(() => {
    if (listReviews.length > 0) {
      const newAverageRating = (
        listReviews.reduce((total, review) => total + review.ratingValue, 0) /
        listReviews.length
      ).toFixed(1);
      setAverageRating(newAverageRating);
    }
  }, [listReviews]);



  if (singleProduct) {
    var image = singleProduct.image;
    var brand = singleProduct.product.brand.name;
    var description = singleProduct.product.description;
    var name = singleProduct.product.name;
    var price = singleProduct.price;
    var sku = singleProduct.sku;
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
  const [quty, setQuty] = useState(1);
  const setQuantity = (e) => {
    setQuty(+e.target.value);
  };
  const handleAddToCart = () => {
    const token = localStorage.getItem("accessToken_cougarshop");
    const now = Math.floor(Date.now() / 1000);
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp < now) {
        localStorage.removeItem('SHARE_USER');
        localStorage.removeItem('accessToken_cougarshop');
        toast.error('Token has expired please login again!', {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
          onClose: () => {
            navigate('/login');
          }
        });

      } else {
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
      }
    } else {
      toast.error('You need to login to add products to cart!', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
        onClose: () => {
          navigate('/login');
        }
      });
    }
    // if (userr.id !== undefined) {

    // } else {
    //   navigate("/login");
    // }
  };

  const handleClickImage = (pro) => {
    setChangProductItem(pro);
    //  setBorderColor(pro.id);
  };


  const handleAddtoWishList = () => {


    const exist = listWishList.find(wi => wi.productItem.id === singleProduct.id)

    if (!exist) {
      const newWishList = {
        user: userr,
        productItem: singleProduct
      }

      dispatch(addWishList(newWishList));

      toast.info(`Added to Wishlist`, {
        position: "top-right",
        autoClose: 700,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

  }

  //Rating and comment
  const [selectedReview, setSelectedReview] = useState(null);
  const [rating, setRating] = useState(selectedReview?.ratingValue || 0);
  const [comment, setComment] = useState(selectedReview?.comment || "");
  const [averageRating, setAverageRating] = useState("");

  //Rating and comment

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const userLogin = JSON.parse(localStorage.getItem("SHARE_USER"))

  const handleSubmitReview = (event) => {
    event.preventDefault();
    if(comment === ""){
      toast.error("Please write somethings about this product", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (userLogin) {
      const newReview = {
        user: userLogin,
        productItem: singleProduct,
        ratingValue: rating,
        comment: comment
      };
      dispatch(doReview(newReview)).then((response) => {
        if (response.type === doReview.fulfilled.toString()) {
          toast.success("Thanks for review!", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setComment("");
          setShowReviewForm(false);
        } else if (response.type === doReview.rejected.toString()) {
          console.log(response.payload.message);
          toast.error(response.payload.message, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
    } else {
      toast.error("Please login to review this product!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => {
          navigate('/login');
        },
      })
    }
  }

  const handleUpdateReview = async (event) => {
    event.preventDefault();
    const updatedReview = {
      ...selectedReview,
      comment: comment,
      ratingValue: rating // sử dụng giá trị của rating hiện tại
    };
    console.log(updatedReview);
    const updateResponse = await dispatch(doUpdateReview(updatedReview));
    if (updateResponse.type === doUpdateReview.fulfilled.toString()) {
      toast.success("Updated!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setComment("");
    setShowReviewForm(false);
    console.log("after rating value: ", rating);
    setEditReview(null);
  };

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [visibleComments, setVisibleComments] = useState(3);
  const [editingReview, setEditReview] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);

  const showMoreComments = () => {
    setVisibleComments(visibleComments + 5);
  };

  const hideComments = () => {
    setVisibleComments(3);
  };



  const handleEditReview = (newReview) => {
    console.log(newReview.id);
    setShowReviewForm(true);
    setEditReview(true);
    setSelectedReview(newReview);
    setComment(newReview.comment);
    setRating(newReview.ratingValue);
    setEditingReviewId(newReview.id);
    console.log("Current rating value: ", newReview.ratingValue);
  }


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
                  className={`${borderColor === pro.id ? "border border-2 border-danger" : "border border-dark"}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleClickImage(pro)}
                >
                  <img
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
                  <StarRatings
                    rating={listReviews && listReviews.length > 0 ? (listReviews.reduce(
                      (total, review) => total + review.ratingValue,
                      0
                    ) / listReviews.length) : 0}
                    starRatedColor="#ffd700"
                    starHoverColor="#ffd700"
                    numberOfStars={5}
                    starDimension="30px"
                    name="rating"
                  />
                  <p className="mb-0 t-review">( {listReviews.length} Reviews )</p>
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
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">SKU :</h3>
                  <p className="product-data">{sku}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-3">

                </div>
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Size :</h3>
                  <div className="d-flex flex-wrap gap-15">
                    {
                      listRelatedProductItems.map(pro => (
                        <span key={pro.id} className={`badge border bg-white text-dark ${borderColor === pro.id ? 'border-2 border-primary' : "border-1 border-secondary"}`}>
                          {pro.size}
                        </span>
                      ))
                    }


                  </div>
                </div>
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Color :</h3>
                  <ul className="colors ps-0">
                    {
                      listRelatedProductItems.map(col => (
                        <Color key={col.id} color={col.color} />
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
                    <Link onClick={handleAddtoWishList}>
                      <AiFillHeart style={{ color: singleProduct && listWishList.some(wi => wi.productItem.id === singleProduct.id) ? "red" : "grey", fontSize: "30px" }} /> Add to Wishlist
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
                    <StarRatings
                      rating={listReviews && listReviews.length > 0 ? (listReviews.reduce(
                        (total, review) => total + review.ratingValue,
                        0
                      ) / listReviews.length) : 0}
                      starRatedColor="#ffd700"
                      starHoverColor="#ffd700"
                      numberOfStars={5}
                      starDimension="30px"
                      name="rating"
                    />
                    <p className="mb-0">({listReviews && listReviews.length > 0 ? (parseFloat(averageRating) || "0.0") : "0.0"}) Based on {listReviews.length} Reviews</p>
                  </div>
                </div>
                {true && (
                  <div>
                    <button onClick={() => setShowReviewForm(true)} className="button-17">
                      Write a Review
                    </button>
                  </div>
                )}
              </div>
              {showReviewForm && (
                <div className="review-form py-4">
                  <h4>{editingReview ? 'Edit' : 'Write a'} Review</h4>
                  <div className="d-flex flex-column gap-15">
                    <div>
                      <ReactStars
                        count={5}
                        onChange={handleRatingChange}
                        size={20}
                        value={rating}
                        edit={true}
                        activeColor="#ffd700"
                      />
                    </div>
                    <div>
                      <textarea
                        name="comment"
                        id=""
                        value={comment}
                        onChange={handleCommentChange}
                        className="w-100 form-control"
                        cols="30"
                        rows="4"
                        placeholder="Comments"
                      ></textarea>
                    </div>
                    <div className="d-flex justify-content-end">
                      {editingReview ? (<button onClick={handleUpdateReview} className="button border-0">Save Change</button>) : <button onClick={handleSubmitReview} className="button border-0">Submit Review</button>}
                    </div>
                  </div>
                </div>
              )}
              <div className="reviews mt-4">
                <div className="reviews mt-4">
                  {listReviews && listReviews.length > 0 ? (
                    listReviews.slice(0, visibleComments).map((review) => {
                      const isCurrentUserReview = review.user && userLogin && review.user.email === userLogin.email;
                      const createDate = moment.utc(review.createDate);
                      const now = moment();
                      const diffSeconds = now.diff(createDate, 'seconds');
                      const diffMin = Math.floor(diffSeconds / 60);
                      let timeAgo;
                      if (diffMin < 1) {
                        timeAgo = `now`;
                      } else if (diffMin > 60) {
                        const diffHours = Math.floor(diffMin / 60);
                        if (diffHours > 24) {
                          const diffDays = Math.floor(diffHours / 24);
                          if (diffDays > 30) {
                            const diffMonths = Math.floor(diffDays / 30);
                            if (diffMonths > 12) {
                              const diffYears = Math.floor(diffMonths / 12);
                              timeAgo = `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
                            } else {
                              timeAgo = `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
                            }
                          } else {
                            timeAgo = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
                          }
                        } else {
                          timeAgo = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
                        }
                      } else {
                        timeAgo = `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
                      }
                      return (
                        <div key={review.id} className="review">
                          <div className="d-flex gap-10 justify-content-between align-items-center">
                            <h6 className="mb-0">{review.user.fullname}</h6> <span style={{ fontStyle: "italic" }}>{review.edited === true ? "( Edited )" : ""}</span>
                            <span className="d-inline-block ">
                              <ReactStars
                                count={5}
                                size={15}
                                value={review.ratingValue}
                                edit={false}
                                activeColor="#ffd700"
                              />
                            </span>
                          </div>
                          <p className="mt-3 justify-content-between align-items-center d-flex">{review.comment}
                            <span className="ml-auto">
                              {isCurrentUserReview && (
                                <button
                                  className="button-16"
                                  style={{ outline: "none" }}
                                  onClick={() => handleEditReview(review)}
                                >
                                  {review.edited === true ? "" : "( Edit )"}
                                </button>
                              )}
                            </span>
                          </p>
                          <span style={{ fontSize: "12px", marginTop: "-20px", marginBottom: "10px" }} className="d-flex justify-content-end fst-italic">{timeAgo}</span>
                        </div>
                      )
                    })
                  ) : (
                    <div>Không có bình luận nào về sản phẩm này!</div>
                  )}
                  <div>
                    {listReviews.length > visibleComments ? (
                      <div>
                        <button
                          className="text-dark text-decoration-underline"
                          onClick={showMoreComments}
                        >
                          Show more comments
                        </button>
                      </div>
                    ) : null}

                    {listReviews.length > visibleComments && visibleComments > 5 ? (
                      <div>
                        <button
                          className="text-dark text-decoration-underline"
                          onClick={hideComments}
                        >
                          Hide comments
                        </button>
                      </div>
                    ) : null}

                  </div>
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
