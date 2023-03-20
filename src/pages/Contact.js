import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import Container from "../components/Container";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { postContact } from '../store/contact/api';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const { register: contact, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onContact = (data) => {
    const contact = {...data, status: 0};
    dispatch(postContact(contact)).then((response) => {
      if (response.type === "postContact/fulfilled") {
        toast.success(response.payload.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(()=>{navigate("/")}, 1000);
      } else {
        toast.error(response.payload.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    })
  }

  return (
    <>
      <Meta title={"Contact Us"} />
      <BreadCrumb title="Contact Us" />
      <Container class1="contact-wrapper py-4 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62695.098581593775!2d106.56191043125!3d10.853821100000017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bee0b0ef9e5%3A0x5b4da59e47aa97a8!2zQ8O0bmcgVmnDqm4gUGjhuqduIE3hu4FtIFF1YW5nIFRydW5n!5e0!3m2!1svi!2s!4v1676300872934!5m2!1svi!2s"
              width="600"
              height="450"
              className="border-0 w-100"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Address"
            ></iframe>
          </div>
          <div className="col-12 mt-5">
            <div className="contact-inner-wrapper d-flex justify-content-between ">
              <div>
                <h3 className="contact-title mb-4">Contact</h3>
                <form onSubmit={handleSubmit(onContact)} className="d-flex flex-column gap-15">
                  <div>
                    <input
                      className="form-control"
                      {...contact("fullname", { required: true })}
                      type="text"
                      name="fullname"
                      placeholder="Fullname"
                    />
                    <span className="errors">
                      {errors.fullname?.type === 'required' && <span className="text-danger error">Fullname field is required.</span>}
                    </span>
                  </div>
                  <div>
                    <input
                      className="form-control"
                      {...contact("email", { required: true, pattern: /^\S+@\S+$/i })}
                      type="email"
                      name="email"
                      placeholder="Email" />
                    <span className="errors">
                      {errors.email?.type === 'required' && <span className="text-danger error">Email field is required.</span>}
                      {errors.email?.type === 'pattern' && <span className="text-danger error">Invalid email.</span>}
                    </span>
                  </div>
                  <div>
                    <input
                      className="form-control"
                      type="tel"
                      name="phone"
                      {...contact("phone", {
                        required: true,
                        pattern: /^(0)\d{9}$/
                      })}
                      placeholder="Mobile Number"
                    />
                    <span className="errors">
                      {errors.phone?.type === "required" && (
                        <span className="text-danger error">Phone field is required</span>
                      )}
                      {errors.phone?.type === "pattern" && (
                        <span className="text-danger error">Please enter a valid Vietnamese mobile number starting with 0 followed by 9 digits.</span>
                      )}
                    </span>
                  </div>
                  <div>
                    <textarea
                      className="form-control"
                      style={{minHeight: "100px"}}
                      {...contact("content", { required: true })}
                      type="text"
                      name="content"
                      placeholder="Content"
                    />
                    <span className="errors">
                      {errors.content?.type === 'required' && <span className="text-danger error">Content field is required.</span>}
                    </span>
                  </div>
                  <div>
                    <button className="button border-0">Submit</button>
                  </div>
                </form>
              </div>
              <div>
                <h3 className="contact-title mb-4">Get in touch with us</h3>
                <div>
                  <ul className="ps-0">
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <AiOutlineHome className="fs-5" />
                      <address className="mb-0">
                        Adress:01 , Khu phan mem Quang Trung , District 12, HCM City, Viet Nam
                      </address>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <BiPhoneCall className="fs-5" />
                      <a href="tel:+91 8264954234">+84 399 797979</a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <AiOutlineMail className="fs-5" />
                      <a href="mailto:navdeepdahiya753@gmail.com">
                        cougarshop@gmail.com
                      </a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <BiInfoCircle className="fs-5" />
                      <p className="mb-0">Monday – Saturday, 8 AM – 10 PM</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contact;
