import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";

import { useSelector } from "react-redux/es/exports";
import {
  getCartSelector,
  getUserSelector,
  getAddressSelector,
} from "../store/shop_order/selectors";
import CheckOutItem from "../components/CheckOutItem";
import { useEffect } from "react";
import { getAddressesByUsserId } from "../store/shop_order/api";
import { useDispatch } from "react-redux/es/exports";

import { object } from "yup";

const Checkout = () => {
  const dispatch = useDispatch();
  const listCartItem = useSelector(getCartSelector);
  const addresses = useSelector(getAddressSelector);
  const userInfor = useSelector(getUserSelector);

  //get list Address by User
  useEffect(() => {
    if (userInfor.id) {
      dispatch(getAddressesByUsserId(userInfor.id));
    }
  }, [dispatch, userInfor.id]);
  
 

  const [fullname, setFullname] = useState("");
  const [number, setNumber] = useState("");
  const [line, setLine] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setprovince] = useState("");
  const [def, setDef] = useState(1);
  const [country, setCountry] = useState("");
  const [shipping, setShipping] = useState(2);
  const [zipcode, setZipcode] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [paymentID, setPaymentID] = useState(2);
  
  const [addressCheckOut, setAddressCheckOut] = useState();


  //set SubTotal
  useEffect(() => {
    if (listCartItem.length) {
      const subTotal = listCartItem.reduce((total, init) => {
        return init.total + total;
      }, 0);
      setSubTotal(subTotal);
      setOrderTotal(subTotal + shipping)
    }
  }, [listCartItem.length,shipping,listCartItem]);




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

  

  const handleChoosePayment = (idPaymen) => {
    console.log(idPaymen);
    setPaymentID(idPaymen);
  };

  const handleChooseShipping = (Shippingprice) => {
    setOrderTotal(subTotal + Shippingprice);
    setShipping(Shippingprice)
  }


  const handleContinueToShipping = (e) => {
    const payment = paymentID;
    const UpdateShopOrder = {
      orderTotal: orderTotal,
      orderStatus: 0,
      userPaymentMethod: payment,
      address: addressCheckOut,
      deliveryMethod: object,
    };
  };

  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Dev Corner</h3>
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
              <form action="" className="gap-15 row">
                <div className="col-12">
                  <span className="text-primary" style={{ fontWeight: "500" }}>
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

                <div className="col-12">
                  <input
                    type="text"
                    placeholder="Zipcode"
                    className="form-control"
                    value={zipcode}
                    onChange={(e) => {
                      setZipcode(e.target.value);
                    }}
                  />
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    <Link
                      to={""}
                      className="button"
                      onClick={handleContinueToShipping}
                    >
                      Continue to Shipping
                    </Link>
                  </div>
                </div>
              </form>
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
                <div className="payment-card-header-action">
                  <Link>View all methods &gt;</Link>
                </div>
              </div>

              <div className="card-list-wrapper">
                <div className="card-container">
                  <Link
                    className={`card-main-content ${paymentID === 2? "border border-2 border-primary": "border border-dark"}`}
                    onClick={() => handleChoosePayment(2)}
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

                <div className="card-container">
                  <Link
                    className={`card-main-content ${paymentID === 4? "border border-2 border-primary": "border border-dark"}`}
                    onClick={() => handleChoosePayment(4)}
                  >
                    <img
                      className="card-icon"
                      src="https://lzd-img-global.slatic.net/g/tps/tfs/TB17BAYE7L0gK0jSZFAXXcA9pXa-80-80.png_2200x2200q80.png_.webp"
                      alt=""
                    />
                    <div className="card-main-content-text-container">
                      <p
                        className="card-title"
                        data-spm-anchor-id="a2o4n.shipping.0.i0.78935d0aHGGmh5"
                      >
                        ZaloPay Wallet
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="payment-card-container2">
              <div className="payment-card-header-wrapper">
                <div className="payment-card-header-title">Shipping Option</div>
              </div>

              <div className="card-list-wrapper2">
                <div className="card-container">
                  <Link
                     className={`card-title d-flex ${shipping === 2? "text-info": "text-dark"}`}
                    onClick={()=>handleChooseShipping(2)}
                  >
                      <p>Fast</p>
                      <p className="receive" style={{ fontSize: "12px" }}>Receive from 2 to 3 days</p>
                      <p>$2</p>
                  
                  </Link>
                </div>
                <div className="card-container">
                  <Link
                     className={`card-title d-flex ${shipping === 4? "text-info": "text-dark"}`}
                     onClick={()=>handleChooseShipping(4)}
                  >
                      <p>Supper Speed</p>
                      <p className="receive" style={{ fontSize: "12px" }}>Receive in 1 day</p>
                      <p>$4</p>
                  
                  </Link>
                </div>
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
