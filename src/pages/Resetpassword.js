import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { doResetPassword } from "../store/forgot_password/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Resetpassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onConfirm = (data) => {
    const { confNewPassword, ...sendPassword } = data;
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');
    if(confNewPassword !== sendPassword.newPassword){
      alert("New password confirmation failed!");
      return;
    }
    dispatch(doResetPassword({
      password: sendPassword.newPassword,
      token: token
    }))
      .then((response) => {
        if (response.type === doResetPassword.fulfilled.toString()) {
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
          setTimeout(() => { navigate("/login") }, 1000);

        } else if (response.type === doResetPassword.rejected.toString()) {
          console.log(response.payload.message);
          toast.error(response.payload.message, {
            position: "top-center",
            // autoClose: 1000,
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
      <Meta title={"Reset Password"} />
      <BreadCrumb title="Reset Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Password</h3>
              <form onSubmit={handleSubmit(onConfirm)} className="d-flex flex-column gap-15">
                <input
                  className="form-control"
                  type="password"
                  name="newpassword"
                  placeholder="New Password"
                  {...register("newPassword", { required: true, minLength: 6 })}
                />
                <span className="errors">
                  {errors.newPassword?.type === 'required' && <span className="text-danger error">New password field is required.</span>}
                  {errors.newPassword?.type === 'minLength' && <span className="text-danger error">New password must be at least 6 characters.</span>}
                </span>
                <input
                  className="form-control"
                  type="password"
                  name="confnewpassword"
                  placeholder="Confirm new password"
                  {...register("confNewPassword", { required: true, minLength: 6 })}
                />
                <span className="errors">
                  {errors.confNewPassword?.type === 'required' && <span className="text-danger error">Confirm new password field is required.</span>}
                  {errors.confNewPassword?.type === 'minLength' && <span className="text-danger error">Confirm new password must be at least 6 characters.</span>}
                </span>
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button type="submit" className="button border-0">Ok</button>
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

export default Resetpassword;
