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
  getListPaymentTypeSelector,
} from "../store/shop_order/selectors";
import CheckOutItem from "../components/CheckOutItem";
import { useEffect } from "react";
import {
  getAddressesByUserId,
  getDeliveryByUserId,
  getUserPaymenMethodByUserId,
  updateOrder,
  getListPaymentType,
  addNewAddress,
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
  const [provider, setProvider] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [number2, setNumber2] = useState("");
  const [line2, setLine2] = useState("");
  const [district2, setDistrict2] = useState("");
  const [province2, setprovince2] = useState("");
  const [country2, setCountry2] = useState("");

  const [addressCheckOut, setAddressCheckOut] = useState();
  const [defa, setDefa] = useState(0);

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
    setSelect(PaymentTypeName);

    if (PaymentTypeName === "Creadit card/ Debit card") {
      const exist = userPaymenMethod.find(
        (pa) => pa.paymentType.value === PaymentTypeName
      );

      if (exist) {
        setAccountNumber(exist.accountNumber);
        setProvider(exist.provider);
        setExpiryDate(exist.expiryDate);
      }
    }
  };

  const handleChooseShipping = (ShippingPrice) => {
    const deli = listDeliveryMethod.find((de) => de.price === ShippingPrice);

    if (deli) {
      setOrderTotal(subTotal + ShippingPrice);
      setShipping(ShippingPrice);
      setDelivery(deli);
    }
  };

  const handleChangeNumber = (e) => {
    if (!isNaN(e.target.value)) {
      setNumber2(e.target.value);
    }
  };
  const handleChangeLine = (e) => {
    setLine2(e.target.value);
  };
  const handleChangeDistrict = (e) => {
    setDistrict2(e.target.value);
  };
  const handleChangeProvice = (e) => {
    setprovince2(e.target.value);
  };
  const handleChangeCountry = (e) => {
    setCountry2(e.target.value);
  };

  const navigate = useNavigate();
  const handleContinueToShipping = (e) => {
    if (addresses.length > 0) {
      const UpdateShopOrder = {
        id: shopOrder.id,
        orderTotal: orderTotal,
        orderStatus: 0,
        userPaymentMethod: null,
        address: addressCheckOut,
        deliveryMethod: delivery,
        user: userInfor,
      };

      if (select === null) {
        dispatch(updateOrder([null, UpdateShopOrder]));

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
        }, 500);
      } else {
        const exist = userPaymenMethod.find(
          (pa) => pa.paymentType.value === select
        );

        if (exist) {
          if (exist.paymentType.value === "Creadit card/ Debit card") {
            if (payment !== null) {
              if (exist.provider === payment.provider) {
                UpdateShopOrder.userPaymentMethod = exist;
                dispatch(updateOrder([null, UpdateShopOrder]));
              } else {
                payment.id = exist.id;
                dispatch(updateOrder([payment, UpdateShopOrder]));
              }

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
              }, 500);
            } else {
              toast.error(`Fill in your credit card information!`, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          } else {
            UpdateShopOrder.userPaymentMethod = exist;

            dispatch(updateOrder([null, UpdateShopOrder]));

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
            }, 500);
          }
        } else {
          if (select !== "Creadit card/ Debit card") {
            const payType = listPaymentType.find((pt) => pt.value === select);

            const pay = {
              user: userInfor,
              paymentType: payType,
            };

            dispatch(updateOrder([pay, UpdateShopOrder]));

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
            }, 500);
          } else {
            if (payment !== null) {
              dispatch(updateOrder([payment, UpdateShopOrder]));
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
              }, 500);
            } else {
              toast.error(`Fill in your credit card information!`, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          }
        }
      }
    } else {
      toast.error(`No address yet!`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleChangeProvider = (e) => {
    if (isNaN(e.target.value) || e.target.value === "") {
      setProvider(e.target.value);
    }
  };

  const handleChangeAccountNumber = (e) => {
    if (!isNaN(e.target.value)) {
      setAccountNumber(e.target.value);
    }
  };

  const handlechangeExpiryDate = (e) => {
    setExpiryDate(e.target.value);
  };

  const handleSubmitCreaditCard = () => {
    const payType = listPaymentType.find((pt) => pt.value === select);
    if (provider !== "" && accountNumber !== "" && expiryDate !== "") {
      const userPaymentMethod = {
        user: userInfor,
        paymentType: payType,
        provider: provider,
        accountNumber: accountNumber,
        expiryDate: expiryDate,
      };

      setPayment(userPaymentMethod);
    }
  };

  const handleSubmitNewAddress = () => {
    if (
      number2 !== "" &&
      line2 !== "" &&
      district2 !== "" &&
      province2 !== "" &&
      country2 !== ""
    ) {
      const newAddress = {
        unitNumber: number2,
        addressLine: line2,
        district: district2,
        province: province2,
        countryName: country2,
        isDefault: true,
        user: userInfor,
      };

      const exist = addresses.find((ad) => ad.isDefault === true);

      if (exist) {
        newAddress.isDefault = false;
      }

      dispatch(addNewAddress(newAddress));

      toast.info(`Added!`, {
        position: "top-right",
        autoClose: 600,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setNumber2("");
      setLine2("");
      setDistrict2("");
      setprovince2("");
      setCountry2("");
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
                  <div style={{ width: "94%" }}>
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
                  <div
                    style={{
                      marginLeft: "10px",
                      paddingTop: "24px",
                    }}
                  >
                    <Link
                      style={{
                        backgroundColor: "#ee4d2d",
                        color: "white",
                        padding: "7px",
                        borderRadius: "3px",
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      // onClick={handleClickNewAddress}
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
                                    value={number2}
                                    onChange={handleChangeNumber}
                                  />
                                </div>

                                <div className="col-6 pe-0">
                                  <input
                                    type="text"
                                    placeholder="Address"
                                    className="form-control"
                                    value={line2}
                                    onChange={handleChangeLine}
                                  />
                                </div>
                              </div>

                              <div className="row pe-0">
                                <div className="col-6">
                                  <input
                                    type="text"
                                    placeholder="District"
                                    className="form-control"
                                    value={district2}
                                    onChange={handleChangeDistrict}
                                  />
                                </div>
                                <div className="col-6 pe-0">
                                  <input
                                    type="text"
                                    placeholder="Province"
                                    className="form-control"
                                    value={province2}
                                    onChange={handleChangeProvice}
                                  />
                                </div>
                              </div>
                              <div className="col-12">
                                <input
                                  type="text"
                                  placeholder="Country"
                                  className="form-control"
                                  value={country2}
                                  onChange={handleChangeCountry}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleSubmitNewAddress}
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
                    />
                  </div>
                  <div className="col-6 pe-0">
                    <input
                      type="text"
                      placeholder="Province"
                      className="form-control"
                      value={province}
                      readOnly
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
                      onClick={() => handleChoosePayment(paymentT.value)}
                      data-bs-toggle="modal"
                      data-bs-target={
                        paymentT.value === "Creadit card/ Debit card"
                          ? "#addNewUserPaymentMethod"
                          : "#modalAddOther"
                      }
                    >
                      <img className="card-icon" src={paymentT.icon} alt="" />
                      <div className="card-main-content-text-container">
                        <p
                          className="card-title"
                          data-spm-anchor-id="a2o4n.shipping.0.i0.78935d0aHGGmh5"
                        >
                          {paymentT.value}
                        </p>
                      </div>
                    </Link>
                    {/* Modal add creadit card */}
                    <div
                      className="modal fade"
                      id="addNewUserPaymentMethod"
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
                              Payment by {select}
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
                                    placeholder="provider"
                                    className="form-control"
                                    value={provider}
                                    onChange={handleChangeProvider}
                                  />
                                </div>

                                <div className="col-6 pe-0">
                                  <input
                                    type="text"
                                    placeholder="accountNumber"
                                    className="form-control"
                                    value={accountNumber}
                                    onChange={handleChangeAccountNumber}
                                  />
                                </div>
                              </div>
                              <div className="col-12">
                                <input
                                  type="date"
                                  placeholder="expiryDate"
                                  className="form-control"
                                  value={expiryDate}
                                  onChange={handlechangeExpiryDate}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleSubmitCreaditCard}
                              data-bs-dismiss="modal"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Modal add other */}
                    <div
                      className="modal fade"
                      id="modalAddOther"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div
                          className="modal-content"
                          style={{ width: "350px" }}
                        >
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id="exampleModalLabel"
                            >
                              Payment by {select}
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
                              <img
                                src={
                                  select === "Momo"
                                    ? "https://res.cloudinary.com/dmjh7imwd/image/upload/v1678983019/CougarStore/momo_idpc7u.jpg"
                                    : select === "Internet Banking"
                                    ? "https://thumbs.dreamstime.com/b/beautiful-meticulously-designed-mobile-internet-banking-icon-mobile-internet-banking-icon-120822742.jpg"
                                    : "https://res.cloudinary.com/dmjh7imwd/image/upload/v1678983730/CougarStore/zalopay_zrftj5.png"
                                }
                                alt="imagePayment"
                              />
                            </div>
                          </div>
                          <div className="modal-footer"></div>
                        </div>
                      </div>
                    </div>
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
