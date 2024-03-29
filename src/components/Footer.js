import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";
import newsletter from "../images/newsletter.png";
import logo from "../images/cougar-logo.png";
const Footer = () => {
  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src={newsletter} alt="newsletter" />
                <h2 className="mb-0 text-white">Sign Up for Newsletter</h2>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Your Email Address"
                  aria-label="Your Email Address"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div>
                <address className="text-white fs-6">
                  Address : Quang Trung software area, <br /> District 12, HCM
                  City <br />
                  PinCode: 700000
                </address>
                <p className="mt-3 d-block mb-1 text-white">+84 399 797979</p>
                <p className="mt-2 d-block mb-0 text-white">
                  cougarshop@gmail.com
                </p>
                <div className="social_icons d-flex align-items-center gap-30 mt-4">
                  <Link className="text-white" to={"/"}>
                    <BsLinkedin className="fs-4" />
                  </Link>
                  <Link className="text-white" to={"/"}>
                    <BsInstagram className="fs-4" />
                  </Link>
                  <Link className="text-white" to={"/"}>
                    <BsGithub className="fs-4" />
                  </Link>
                  <Link className="text-white" to={"/"}>
                    <BsYoutube className="fs-4" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-4">
              <h4 className="text-white mb-4">Information</h4>
              <div className="footer-link d-flex flex-column">
                <p className="text-white py-2 mb-1">Privacy Policy</p>
                <p className="text-white py-2 mb-1">Refund Policy</p>
                <p className="text-white py-2 mb-1">Shipping Policy</p>
                <p className="text-white py-2 mb-1">Terms & Conditions</p>
                <p className="text-white py-2 mb-1">Blogs</p>
              </div>
            </div>
            <div className="col-4">
              <h4 className="text-white mb-4">Account</h4>
              <div className="footer-link d-flex flex-column">
                <p className="text-white py-2 mb-1">About Us</p>
                <p className="text-white py-2 mb-1">Faq</p>
                <p className="text-white py-2 mb-1">Contact</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()}; Code by Cougar Team from FPT
                Polytechnic
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
