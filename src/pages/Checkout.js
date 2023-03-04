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

const Checkout = () => {
  const listCartItem = useSelector(getCartSelector);
  const userInfor = useSelector(getUserSelector);
  const addresses = useSelector(getAddressSelector);

  const [fullname, setFullname] = useState("");
  const [line, setLine] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setprovince] = useState("");
  const [zipcode, setZipcode] = useState("");

  const [country, setCountry] = useState("");
  const [changecountry, setchangeCountry] = useState(country);

  useEffect(() => {
    if (userInfor.id) {
      setFullname(userInfor.fullname);
      if (listCartItem.length) {
        const isDefaultAddress = addresses.find((add) => add.isDefault);
        setCountry(isDefaultAddress.countryName);

        setchangeCountry(isDefaultAddress);

        // setLine(isDefaultAddress.addressLine);
        // setDistrict(isDefaultAddress.district);
        // setprovince(isDefaultAddress.province);
        // setZipcode(isDefaultAddress.countryName);
      }
    }
  }, [userInfor.id, listCartItem.length > 0]);

  //set SubTotal
  const subTotal = listCartItem.reduce((total, init) => {
    return init.total + total;
  }, 0);

  const shipping = 10;

  //handle click
  const handelClickCountry = (e) => {

    const address = addresses.find((add) => add.countryName = e.target.value);

    setchangeCountry(address);

    // setCountry(isDefaultAddress.countryName);
    // setLine(isDefaultAddress.addressLine);
    // setDistrict(isDefaultAddress.district);
    // setprovince(isDefaultAddress.province);
    // setZipcode(isDefaultAddress.countryName);
  };

  const handleChangeFullname = () => {};

  const handleChangeLine = () => {};

  const handleChangeDistrict = () => {};

  const handleChangeProvince = () => {};

  const handleChangeZipCode = () => {};

  const handleContinueToShipping = (e) => {};
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
              <form
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <select
                    value={country}
                    onChange={handelClickCountry}
                    name=""
                    className="form-control form-select"
                    id=""
                  >
                    {addresses.map((ad) => (
                      <option key={ad.id} value={ad.countryName}>
                        {ad.countryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Fullname"
                    className="form-control"
                    value={fullname}
                    // readOnly
                    onChange={handleChangeFullname}
                  />
                </div>

                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    value={line}
                    onChange={handleChangeLine}
                  />
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="District"
                    className="form-control"
                    value={district}
                    onChange={handleChangeDistrict}
                  />
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Province"
                    className="form-control"
                    value={province}
                    onChange={handleChangeProvince}
                  />
                </div>

                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Zipcode"
                    className="form-control"
                    value={zipcode}
                    onChange={handleChangeZipCode}
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
              <h5 className="total-price">$ {subTotal + shipping}</h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
