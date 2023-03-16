import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { doChangePassword } from "../store/shop_order/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onConfirm = (data) => {
    const { confNewPassword, ...sendData } = data;
    const user = sessionStorage.getItem("SHARE_USER");
    const userLogin = JSON.parse(user);
    sendData.email = userLogin.email;
    console.log(sendData);
    if(confNewPassword !== sendData.newPassword){
      alert("New password confirmation failed!");
      return;
    }
    if(sendData.currentPassword === sendData.newPassword){
      alert("The new password is not allowed to be the same as the current password!");
      return;
    }
    dispatch(doChangePassword(sendData))
      .then((response) => {
        if (response.type === doChangePassword.fulfilled.toString()) {
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
          setTimeout(() => { navigate("/profile") }, 1000);

        } else if (response.type === doChangePassword.rejected.toString()) {
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
      <Meta title={"Change Password"} />
      <BreadCrumb title="Change Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Change Password</h3>
              <form onSubmit={handleSubmit(onConfirm)} className="d-flex flex-column gap-15">
                <input
                  className="form-control"
                  type="password"
                  name="currentpassword"
                  placeholder="Current Password"
                  {...register("currentPassword", { required: true, minLength: 6 })}
                />
                <span className="errors">
                  {errors.currentPassword?.type === 'required' && <span className="text-danger error">Curent password field is required.</span>}
                  {errors.currentPassword?.type === 'minLength' && <span className="text-danger error">Current password must be at least 6 characters.</span>}
                </span>
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
                    <button className="button border-0">Confirm</button>
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

export default ChangePassword;
