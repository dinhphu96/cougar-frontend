import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { doForgotPassword } from "../store/forgot_password/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Forgotpassword = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (email) => {
    dispatch(doForgotPassword(email))
      .then((response) => {
        if (response.type === doForgotPassword.fulfilled.toString()) {
          toast.success(response.payload.message, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => { navigate("/") }, 1000);
          
        } else if (response.type === doForgotPassword.rejected.toString()) {
          console.log(response.payload.message);
          toast.error(response.payload.message, {
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
      })
  }
  return (
    <>
      <Meta title={"Forgot Password"} />
      <BreadCrumb title="Forgot Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Forgot Your Password ?</h3>
              <p className="text-center mt-2 mb-3">
                We will send you an email to reset your password
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-15">
                <input
                  className="form-control"
                  {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                  type="email"
                  placeholder="Email"
                />
                <span className="errors">
                  {errors.email?.type === 'required' && <span className="text-danger error">Email field is required.</span>}
                  {errors.email?.type === 'pattern' && <span className="text-danger error">Invalid email.</span>}
                </span>
                <div>
                  <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Submit
                    </button>
                  </div>
                  <div className="text-end text-danger fst-italic">
                    <Link to="/login">Cancel</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Forgotpassword;
