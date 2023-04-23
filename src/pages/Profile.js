import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
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
import {
  getAddressesByUserId,
  addNewAddress,
  updateUser,
  deleteAddress,
  updateAddress,
  setAsDefaultAddress,
} from "../store/shop_order/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AvatarEditor from "react-avatar-editor";

export default function Profile() {
  const userrr = useSelector(getUserSelector);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [idAd, setIdAd] = useState(0);
  const [number, setNumber] = useState("");
  const [line, setLine] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setprovince] = useState("");
  const [country, setCountry] = useState("");
  const [defa, setDefa] = useState(0);
  const [checkChange, setCheckChange] = useState(false);
  
  //image
  const [image, setImage] = useState(null);
  const [editor, setEditor] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  const [changeProImage, setChangeProImage] = useState(false);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    setCheckChange(true);
    setChangeProImage(true);
    setFileImage(event.target.files[0]);
  };

  useEffect(() => {
    if (userrr.id) {
      dispatch(getAddressesByUserId(userrr.id));

      setName(userrr.fullname);
      setEmail(userrr.email);
      setPhone(userrr.phone);
      
      if (userrr.avatar !== null) {
        setImage(
          `https://res.cloudinary.com/dmjh7imwd/image/upload/${userrr.avatar}`
        );
        setFileImage(userrr.avatar);
      } else {
        setImage(
          "https://res.cloudinary.com/dmjh7imwd/image/upload/v1678190935/CougarStore/149071_s8mfea.png"
        );
      }
    }
  }, [dispatch, userrr.id]);

  const addresses = useSelector(getAddressSelector);

  const handleChangeName = (e) => {
    setName(e.target.value);
    setCheckChange(true);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setCheckChange(true);
  };

  const handleChangePhone = (e) => {
    if (!isNaN(e.target.value) && e.target.value.length <= 10) {
      setPhone(e.target.value);
      setCheckChange(true);
    }
  };

  const resetForm = ()=>{
    setIdAd(0);
    setNumber("");
    setLine("");
    setDistrict("");
    setprovince("");
    setCountry("");
    setDefa(0);
    setCheckChange(false);
  }

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
        isDefault: true,
        user: userrr,
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
    }

    setIdAd(0);
    setNumber("");
    setLine("");
    setDistrict("");
    setprovince("");
    setCountry("");
    setDefa(0);
    setCheckChange(false);
  };

  const handleChangeNumber = (e) => {
      setNumber(e.target.value);
      setCheckChange(true);
  };
  const handleChangeLine = (e) => {
    setLine(e.target.value);
    setCheckChange(true);
  };
  const handleChangeDistrict = (e) => {
    setDistrict(e.target.value);
    setCheckChange(true);
  };
  const handleChangeProvice = (e) => {
    setprovince(e.target.value);
    setCheckChange(true);
  };
  const handleChangeCountry = (e) => {
    setCountry(e.target.value);
    setCheckChange(true);
  };

  const handleSubmit = (e) => {

    if (checkChange) {
      if (name !== "" && email !== "" && phone !== "" && phone.length === 10) {
        if (changeProImage) {


          const canvas = editor.getImageScaledToCanvas();
          const image = canvas.toDataURL();

          const upUser = {
            id: userrr.id,
            fullname: name,
            phone: phone,
            email: email,
            avatar: image,
          };
  
          dispatch(updateUser({user: upUser, checkImage: true}));
          setCheckChange(false);
          setChangeProImage(false);
          console.log("up có hinh");
         
        } else {
          const upUser = {
            id: userrr.id,
            fullname: name,
            phone: phone,
            email: email,
            avatar: fileImage,
          };
  
          dispatch(updateUser({user: upUser, checkImage: false}));
          setCheckChange(false);
          console.log("up khong hinh");
        }

        toast.success('Update User Successed!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light'
        });
      }
    }
  };

  const handleDeleteAddress = (id) => {
    dispatch(deleteAddress(id));

    toast.success(`Deleted Address!`, {
      position: "top-right",
      autoClose: 600,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleSetAsDefault = (address) => {
    dispatch(setAsDefaultAddress(address));
  };

  const handleEditAddress = () => {
    if (checkChange) {
      if (
        number !== "" &&
        line !== "" &&
        district !== "" &&
        province !== "" &&
        country !== ""
      ) {
        const upAddress = {
          id: idAd,
          unitNumber: number,
          addressLine: line,
          district: district,
          province: province,
          countryName: country,
          isDefault: defa,
          user: userrr,
        };

        dispatch(updateAddress(upAddress));

        toast.info(`Updated!`, {
          position: "top-right",
          autoClose: 600,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }

    setIdAd(0);
    setNumber("");
    setLine("");
    setDistrict("");
    setprovince("");
    setCountry("");
    setDefa(0);
    setCheckChange(false);
  };

  const handlefillEdit = (adress) => {
    setIdAd(adress.id);
    setNumber(adress.unitNumber);
    setLine(adress.addressLine);
    setDistrict(adress.district);
    setprovince(adress.province);
    setCountry(adress.countryName);
    setDefa(adress.isDefault);
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <Meta title={"Profile"} />
      <BreadCrumb title="Profile" />
      <MDBContainer className="py-2">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                {image && (
                  <AvatarEditor
                    ref={(ref) => setEditor(ref)}
                    image={image}
                    width={160}
                    height={160}
                    border={0}
                    color={[255, 255, 255, 1]}
                    borderRadius={360}
                  />
                )}
                <br />
                <div className="chooseImage">
                  <input type="file" onChange={handleImageChange} />
                </div>
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
                      onClick={resetForm}
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
                              className="btn btn-danger"
                              onClick={resetForm}
                            >
                              Reset
                            </button>

                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleNewAddress}
                              data-bs-dismiss="modal"
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
                          | {userrr.phone}
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
                      <Link
                        className="text-end"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal2"
                        onClick={() => handlefillEdit(ad)}
                      >
                        Edit
                      </Link>
                      {/* Modal */}
                      <div
                        className="modal fade"
                        id="exampleModal2"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel2"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                              >
                                Edit Address
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
                                onClick={handleEditAddress}
                                data-bs-dismiss="modal"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <span>&nbsp;</span>
                      <span>&nbsp;</span>
                      <span>&nbsp;</span>
                      {!ad.isDefault ? (
                        <Link
                          onClick={() => handleDeleteAddress(ad.id)}
                          className="text-end"
                        >
                          Delete
                        </Link>
                      ) : (
                        ""
                      )}
                      <br />

                      {!ad.isDefault ? (
                        <button
                          style={{
                            borderRadius: "3px",
                            cursor: `${ad.isDefault ? "no-drop" : "pointer"}`,
                            color: `${ad.isDefault ? "grey" : "black"}`,
                          }}
                          className="border px-3 py-1 bg-transparent"
                          onClick={() => handleSetAsDefault(ad)}
                        >
                          Set as default
                        </button>
                      ) : (
                        ""
                      )}
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
