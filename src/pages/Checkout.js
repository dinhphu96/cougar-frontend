import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";

import { useSelector } from "react-redux/es/exports";
import {
  getCartSelector,
  getUserSelector,
  getAddressSelector,
  getDeliveryMethodSelector,
  getUserPaymenMethodSelector,
  getShopOrderSelector,
  getListPaymentTypeSelector
} from "../store/shop_order/selectors";
import CheckOutItem from "../components/CheckOutItem";
import { useEffect } from "react";
import {
  getAddressesByUserId,
  getDeliveryByUserId,
  getUserPaymenMethodByUserId,
  updateOrder,
  getListPaymentType
} from "../store/shop_order/api";
import { useDispatch } from "react-redux/es/exports";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

const Checkout = () => {
  //cuộn trang
  useEffect(() => {
    window.scrollTo(0, 200);
  }, []);

  const dispatch = useDispatch();
  const userInfor = useSelector(getUserSelector);

  //get list Address by User and list DeliveryMethod
  useEffect(() => {
    if (userInfor.id) {
      dispatch(getAddressesByUserId(userInfor.id));
      dispatch(getDeliveryByUserId());
      dispatch(getListPaymentType());
      dispatch(getUserPaymenMethodByUserId(userInfor.id));
    }
  }, [dispatch, userInfor.id]);

  const listCartItem = useSelector(getCartSelector);
  const addresses = useSelector(getAddressSelector);
  const listDeliveryMethod = useSelector(getDeliveryMethodSelector);
  const userPaymenMethod = useSelector(getUserPaymenMethodSelector);
  const shopOrder = useSelector(getShopOrderSelector);
  const listPaymentType = useSelector(getListPaymentTypeSelector);

  const [fullname, setFullname] = useState("");
  const [number, setNumber] = useState("");
  const [line, setLine] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setprovince] = useState("");
  const [def, setDef] = useState(1);
  const [country, setCountry] = useState("");
  const [shipping, setShipping] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [payment, setPayment] = useState(null);
  const [delivery, setDelivery] = useState({});
  const [select, setSelect] = useState(null);

  const [addressCheckOut, setAddressCheckOut] = useState();

  useEffect(() => {
    if (listDeliveryMethod.length) {
      setShipping(
        listDeliveryMethod.find((deli) => deli.name === "Fast").price
      );
    }
  }, [listDeliveryMethod.length > 0]);

  //set SubTotal
  useEffect(() => {
    if (listCartItem.length) {
      const subTotal = listCartItem.reduce((total, init) => {
        return init.total + total;
      }, 0);

      setSubTotal(subTotal);
      const deli = listDeliveryMethod.find((de) => de.price === shipping);

      if (deli) {
        setShipping(deli.price);
        setOrderTotal(subTotal + deli.price);
        setDelivery(deli);
      }
    }
  }, [listCartItem.length, shipping, listCartItem, listDeliveryMethod]);

  useEffect(() => {
    if (userInfor.id) {
      setFullname(userInfor.fullname);

      if (addresses.length) {
        const isDefaultAddress = addresses.find((add) => add.isDefault);
        setAddressCheckOut(isDefaultAddress);

        setDef(isDefaultAddress.isDefault);
        setNumber(isDefaultAddress.unitNumber);
        setLine(isDefaultAddress.addressLine);
        setDistrict(isDefaultAddress.district);
        setprovince(isDefaultAddress.province);
        setCountry(isDefaultAddress.countryName);
      }
    }
  }, [userInfor.id, listCartItem.length, addresses, userInfor.fullname]);

  //handle click
  const handelChooseCountry = (e) => {
    const value = e.target.value;

    const address = addresses.find((add) => add.addressLine === value);

    setAddressCheckOut(address);

    setDef(address.isDefault);
    setNumber(address.unitNumber);
    setLine(address.addressLine);
    setDistrict(address.district);
    setprovince(address.province);
    setCountry(address.countryName);
  };

  const handleChoosePayment = (PaymentTypeName) => {
    const exist = userPaymenMethod.find(
      (pa) => pa.paymentType.value === PaymentTypeName
    );

    if (exist) {
      setPayment(exist);
    } else {
      setPayment(null);
    }
    setSelect(PaymentTypeName);
  };

  const handleChooseShipping = (ShippingPrice) => {
    const deli = listDeliveryMethod.find((de) => de.price === ShippingPrice);

    if (deli) {
      setOrderTotal(subTotal + ShippingPrice);
      setShipping(ShippingPrice);
      setDelivery(deli);
    }
  };

  const navigate = useNavigate();
  const handleContinueToShipping = (e) => {
    if (addresses.length > 0) {
      const UpdateShopOrder = {
        id: shopOrder.id,
        orderTotal: orderTotal,
        orderStatus: 0,
        userPaymentMethod: payment,
        address: addressCheckOut,
        deliveryMethod: delivery,
        user: userInfor,
      };

      dispatch(updateOrder(UpdateShopOrder));

      toast.success(`Order Success!`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      toast.error(`Create Delivery Address!`, {
        position: "top-center",
        autoClose: 600,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    }
  };

  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Cougar Shop</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">
                <span className="text-danger">{userInfor.fullname}</span> (
                <Link to={userInfor.email}>{userInfor.email}</Link>)
              </p>
              <h4 className="mb-3">Shipping Address</h4>
              <div className="gap-15 row">
                <div className="col-12 d-flex">
                  <div style={{width: "95%"}}>  
                    <span
                      className="text-primary"
                      style={{ fontWeight: "500" }}
                    >
                      Choose Delivery Address:
                    </span>
                    <span
                      className="text-danger float-end"
                      style={{ fontStyle: "italic" }}
                    >
                      {`${def ? "Default" : "Other"}`}
                    </span>
                    <select
                      value={line}
                      onChange={handelChooseCountry}
                      name=""
                      className="form-control form-select"
                      id=""
                    >
                      {addresses.map((ad) => (
                        <option key={ad.id} value={ad.addressLine}>
                          {`${ad.unitNumber}, ${ad.addressLine}, ${ad.district}, ${ad.province}, ${ad.countryName}.`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={{width: "5%", paddingLeft: "10px", paddingTop: "24px"}}>
                    <Link
                      style={{
                        backgroundColor: "#ee4d2d",
                        color: "white",
                        padding: "7px",
                        borderRadius: "3px",
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <AiOutlinePlus />
                    </Link>
                    {/* Modal */}
                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id="exampleModalLabel"
                            >
                              New Address
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <div className="gap-15 row">
                              <div className="row pe-0">
                                <div className="col-6">
                                  <input
                                    type="text"
                                    placeholder="UnitNumber"
                                    className="form-control"
                                    // value={number}
                                    // onChange={handleChangeNumber}
                                  />
                                </div>

                                <div className="col-6 pe-0">
                                  <input
                                    type="text"
                                    placeholder="Address"
                                    className="form-control"
                                    // value={line}
                                    // onChange={handleChangeLine}
                                  />
                                </div>
                              </div>

                              <div className="row pe-0">
                                <div className="col-6">
                                  <input
                                    type="text"
                                    placeholder="District"
                                    className="form-control"
                                    // value={district}
                                    // onChange={handleChangeDistrict}
                                  />
                                </div>
                                <div className="col-6 pe-0">
                                  <input
                                    type="text"
                                    placeholder="Province"
                                    className="form-control"
                                    // value={province}
                                    // onChange={handleChangeProvice}
                                  />
                                </div>
                              </div>
                              <div className="col-12">
                                <input
                                  type="text"
                                  placeholder="Country"
                                  className="form-control"
                                  // value={country}
                                  // onChange={handleChangeCountry}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-primary"
                              // onClick={}
                              data-bs-dismiss="modal"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
               
                <div className="col-12">
                  <input
                    type="text"
                    placeholder="Fullname"
                    className="form-control"
                    value={fullname}
                    readOnly
                  />
                </div>
                <div className="row pe-0">
                  <div className="col-6">
                    <input
                      type="text"
                      placeholder="UnitNumber"
                      className="form-control"
                      value={number}
                      readOnly
                    />
                  </div>

                  <div className="col-6 pe-0">
                    <input
                      type="text"
                      placeholder="Address"
                      className="form-control"
                      value={line}
                      readOnly
                      onChange={() => {}}
                    />
                  </div>
                </div>

                <div className="row pe-0">
                  <div className="col-6">
                    <input
                      type="text"
                      placeholder="District"
                      className="form-control"
                      value={district}
                      readOnly
                      onChange={() => {}}
                    />
                  </div>
                  <div className="col-6 pe-0">
                    <input
                      type="text"
                      placeholder="Province"
                      className="form-control"
                      value={province}
                      readOnly
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    placeholder="Country"
                    className="form-control"
                    value={country}
                    readOnly
                    onChange={() => {}}
                  />
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    <button
                      className="button border-0"
                      onClick={handleContinueToShipping}
                    >
                      Continue to Shipping
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-5">
            {/* list */}
            {listCartItem.map((item) => (
              <CheckOutItem key={item.id} item={item} />
            ))}

            {/* list end */}

            <div className="payment-card-container">
              <div className="payment-card-header-wrapper">
                <div className="payment-card-header-title">
                  Select Payment Method
                </div>
              </div>

              <div className="card-list-wrapper">
                <div className="card-container">
                  <Link
                    className={`card-main-content ${
                      select === null
                        ? "border border-2 border-primary"
                        : "border border-dark"
                    }`}
                    onClick={() => handleChoosePayment(null)}
                  >
                    <img
                      className="card-icon"
                      src="https://lzd-img-global.slatic.net/g/tps/tfs/TB1ZP8kM1T2gK0jSZFvXXXnFXXa-96-96.png_2200x2200q80.png_.webp"
                      alt=""
                    />
                    <div className="card-main-content-text-container">
                      <p className="card-title">Cash On Delivery</p>
                    </div>
                  </Link>
                </div>
                {listPaymentType.map((paymentT) => (
                  <div key={paymentT.id} className="card-container">
                    <Link
                      className={`card-main-content ${
                        select === paymentT.value
                          ? "border border-2 border-primary"
                          : "border border-dark"
                      }`}
                      onClick={() =>
                        handleChoosePayment(paymentT.value)
                      }
                    >
                      <img
                        className="card-icon"
                        src={paymentT.icon}
                        alt=""
                      />
                      <div className="card-main-content-text-container">
                        <p
                          className="card-title"
                          data-spm-anchor-id="a2o4n.shipping.0.i0.78935d0aHGGmh5"
                        >
                          {paymentT.value}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="payment-card-container2">
              <div className="payment-card-header-wrapper">
                <div className="payment-card-header-title">Shipping Option</div>
              </div>

              <div className="card-list-wrapper2">
                {listDeliveryMethod.map((deli) => (
                  <div key={deli.id} className="card-container">
                    <Link
                      className={`card-title d-flex ${
                        shipping === deli.price ? "text-info" : "text-dark"
                      }`}
                      onClick={() => handleChooseShipping(deli.price)}
                    >
                      <p>{deli.name}</p>
                      <p>${deli.price}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">$ {subTotal}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">$ {shipping}</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">$ {orderTotal}</h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
