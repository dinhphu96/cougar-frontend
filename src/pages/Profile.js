import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import {
  getAddressSelector,
  getUserSelector,
} from "../store/shop_order/selectors";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { getAddressesByUserId, addNewAddress } from "../store/shop_order/api";

export default function Profile() {
  const userrr = useSelector(getUserSelector);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [number, setNumber] = useState("");
  const [line, setLine] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setprovince] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (userrr.id) {
      dispatch(getAddressesByUserId(userrr.id));

      setName(userrr.fullname);
      setEmail(userrr.email);
      setPhone(userrr.phone);
    }
  }, [dispatch, userrr.id]);

  const addresses = useSelector(getAddressSelector);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePhone = (e) => {
    if (!isNaN(e.target.value) && e.target.value.length <= 10) {
      setPhone(e.target.value);
    }
  };

  const handleNewAddress = () => {
    if (
      number !== "" &&
      line !== "" &&
      district !== "" &&
      province !== "" &&
      country !== ""
    ) {
      const newAddress = {
        unitNumber: number,
        addressLine: line,
        district: district,
        province: province,
        countryName: country,
        isDefault: false,
        user: userrr,
      };

      dispatch(addNewAddress(newAddress));
    }
  };

  const handleChangeNumber = (e) => {
    setNumber(e.target.value);
  };
  const handleChangeLine = (e) => {
    setLine(e.target.value);
  };
  const handleChangeDistrict = (e) => {
    setDistrict(e.target.value);
  };
  const handleChangeProvice = (e) => {
    setprovince(e.target.value);
  };
  const handleChangeCountry = (e) => {
    setCountry(e.target.value);
  };

  const handleSubmit = () => {};

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <Meta title={"Profile"} />
      <BreadCrumb title="Profile" />
      <MDBContainer className="py-2">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={
                    userrr.avatar
                      ? `https://res.cloudinary.com/dmjh7imwd/image/upload/${userrr.avatar}`
                      : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  }
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />
                <p className="text-muted mb-1">{userrr.fullname}</p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-2">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="2">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="10">
                    <input
                      style={{ outline: "none" }}
                      className="border-0 w-100"
                      value={name}
                      onChange={handleChangeName}
                    ></input>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="2">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="10">
                    <input
                      type={"email"}
                      style={{ outline: "none" }}
                      className="border-0 w-100"
                      value={email}
                      onChange={handleChangeEmail}
                    ></input>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="2">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="10">
                    <input
                      type={"phone"}
                      style={{ outline: "none" }}
                      className="border-0 w-50"
                      value={phone}
                      onChange={handleChangePhone}
                    ></input>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow className="align-items-center">
                  <MDBCol sm="8">
                    <p className="mb-0">My Addresses</p>
                  </MDBCol>
                  <MDBCol sm="4">
                    <Link
                      style={{
                        backgroundColor: "#ee4d2d",
                        color: "white",
                        padding: "10px",
                        borderRadius: "3px",
                      }}
                      className="w-100"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <AiOutlinePlus className="me-2" />
                      Add New Address
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
                                    value={number}
                                    onChange={handleChangeNumber}
                                  />
                                </div>

                                <div className="col-6 pe-0">
                                  <input
                                    type="text"
                                    placeholder="Address"
                                    className="form-control"
                                    value={line}
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
                                    value={district}
                                    onChange={handleChangeDistrict}
                                  />
                                </div>
                                <div className="col-6 pe-0">
                                  <input
                                    type="text"
                                    placeholder="Province"
                                    className="form-control"
                                    value={province}
                                    onChange={handleChangeProvice}
                                  />
                                </div>
                              </div>
                              <div className="col-12">
                                <input
                                  type="text"
                                  placeholder="Country"
                                  className="form-control"
                                  value={country}
                                  onChange={handleChangeCountry}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleNewAddress}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="12">
                    <h6 className="border-bottom w-25">Address</h6>
                  </MDBCol>
                </MDBRow>

                {addresses.map((ad) => (
                  <MDBRow key={ad.id} className="mb-3">
                    <MDBCol sm="8">
                      <div style={{ marginBottom: "7px" }}>
                        {userrr.fullname}
                        <span style={{ fontSize: "14px", color: "grey" }}>
                          {" "}
                          | 0398026876
                        </span>
                      </div>
                      <div style={{ fontSize: "14px", color: "grey" }}>
                        <p className="mb-0">
                          {ad.unitNumber}, {ad.addressLine}
                        </p>
                        <p className="mb-0">
                          {ad.district}, {ad.province}, {ad.countryName}
                        </p>
                        {ad.isDefault ? (
                          <span
                            style={{
                              padding: "1px 5px 1px 5px",
                              color: "#ee4d2d",
                              border: "1px solid #ee4d2d",
                            }}
                            className="bg-transparent"
                          >
                            Default
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </MDBCol>
                    <MDBCol
                      sm="4"
                      className="text-end"
                      style={{ fontSize: "14px" }}
                    >
                      <Link className="text-end">Edit</Link>
                      <br />
                      <button
                        style={{
                          borderRadius: "3px",
                          cursor: `${ad.isDefault ? "no-drop" : "pointer"}`,
                          color: `${ad.isDefault ? "grey" : "black"}`,
                        }}
                        className="border px-3 py-1 bg-transparent"
                      >
                        Set as default
                      </button>
                    </MDBCol>
                  </MDBRow>
                ))}
              </MDBCardBody>
            </MDBCard>
            <button
              className="button float-end border-0"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
