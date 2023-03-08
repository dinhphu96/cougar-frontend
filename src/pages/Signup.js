import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch } from "react-redux";
import { doSignup } from "../store/signup/api";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
const Signup = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = (data) => {
    const { rePassword, ...signupData } = data;
    if (signupData.password !== rePassword) {
      alert("Mật khẩu không trùng khớp!");
      return
    }

    dispatch(doSignup(signupData))
      .then((response) => {
        console.log(response.payload.message);
        alert(response.payload.message);
        if (response.payload.message === "User registered successfully!") {
          navigate("/login");
        }
      }).catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form onSubmit={handleSubmit(onRegister)} className="d-flex flex-column gap-15">
                <input
                  className="form-control"
                  {...register("fullname", { required: true })}
                  type="text"
                  name="fullname"
                  placeholder="Fullname"
                />
                <span className="errors">
                  {errors.fullname?.type === 'required' && <span className="text-danger error">Fullname field is required.</span>}
                </span>
                <input
                  className="form-control"
                  {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                  type="email"
                  name="email"
                  placeholder="Email" />
                <span className="errors">
                  {errors.email?.type === 'required' && <span className="text-danger error">Email field is required.</span>}
                  {errors.email?.type === 'pattern' && <span className="text-danger error">Invalid email.</span>}
                </span>
                <input
                  className="form-control"
                  type="tel"
                  name="phone"
                  {...register("phone", {
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
                <input
                  className="form-control"
                  {...register("password", { required: true, minLength: 6 })}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <span className="errors">
                  {errors.password?.type === 'required' && <span className="text-danger error">Password field is required.</span>}
                  {errors.password?.type === 'minLength' && <span className="text-danger error">Password must be at least 6 characters.</span>}
                </span>
                <input
                  className="form-control"
                  {...register("rePassword", { required: true, minLength: 6 })}
                  type="password"
                  name="rePassword"
                  placeholder="Re-enter Password"
                />
                <span className="errors">
                  {errors.rePassword?.type === 'required' && <span className="text-danger error">Re-password field is required.</span>}
                  {errors.rePassword?.type === 'minLength' && <span className="text-danger error">Re-password must be at least 6 characters.</span>}
                </span>
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">Sign Up</button>
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

export default Signup;
