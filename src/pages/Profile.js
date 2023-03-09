import React from "react";
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
import { getUserSelector } from "../store/shop_order/selectors";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

export default function Profile() {
  const userrr = useSelector(getUserSelector);
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
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
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
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="2">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="10">
                    <input
                      style={{ outline: "none" }}
                      className="border-0"
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
                      className="border-0"
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
                      className="border-0"
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
                    >
                      <AiOutlinePlus className="me-2" />
                      Add New Address
                    </Link>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="12">
                    <h6 className="border-bottom w-25">Address</h6>
                  </MDBCol>
                  <MDBCol sm="8">
                    <div style={{ marginBottom: "7px" }}>
                      {userrr.fullname}
                      <span style={{ fontSize: "14px", color: "grey" }}>
                        {" "}
                        | 0398026876
                      </span>
                    </div>
                    <div style={{ fontSize: "14px", color: "grey" }}>
                      <p className="mb-0">18/29 Tổ 18 Kp 2, Tổ 18 Kp2</p>
                      <p className="mb-0">
                        Phường Tân Chánh Hiệp, Quận 12, TP. Hồ Chí Minh
                      </p>
                      <span style={{ padding: "1px 5px 1px 5px", color: "#ee4d2d", border: "1px solid #ee4d2d"}} className="bg-transparent">Default</span>
                    </div>
                    
                  </MDBCol>
                  <MDBCol sm="4" className="text-end" style={{fontSize: "14px"}}>
                    <Link className="text-end">Edit</Link><br/>
                    <button style={{ borderRadius: "3px",cursor: "no-drop"}} className="border px-3 py-1 bg-transparent">Set as default</button>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
