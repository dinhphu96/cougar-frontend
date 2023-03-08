import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { doLogin } from "../store/shop_order/api";
import { useDispatch } from "react-redux";

import { useForm } from "react-hook-form";


const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(doLogin(data)).then((response) => {
      if (response.type === doLogin.fulfilled.toString()) {
        alert("Đăng nhập thành công!");
        navigate(-1);
      } else if (response.type === doLogin.rejected.toString()) {
        console.log(response.payload.message);
        alert(response.payload.message);
      }
    });
  };

  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h2 className="text-center mb-3">LOG IN</h2>
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
                <input
                  className="form-control"
                  {...register("password", { required: true, minLength: 6 })} 
                  type="password"
                  placeholder="Password"
                />
                <span className="errors">
                  {errors.password?.type === 'required' && <span className="text-danger error">Password field is required.</span>}
                  {errors.password?.type === 'minLength' && <span className="text-danger error">Password must be at least 6 characters.</span>}
                </span>
                <div>
                  <Link to="/forgot-password">Forgot Password?</Link>

                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button type="submit" className="button border-0">
                      Login
                    </button>
                    <Link to="/signup" className="button signup">
                      SignUp
                    </Link>
                  </div>
                </div>
              </form>
              <div>





              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
