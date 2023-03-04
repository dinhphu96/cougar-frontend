import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { doLogin } from "../store/login/api";
import { useDispatch } from "react-redux";

const Login = () => {

  const userString = sessionStorage.getItem('user');
  const user = JSON.parse(userString);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = () => {

    // Đóng gói giá trị từ các field thành JSON
    const credentials = {
      email: email,
      password: password
    };
    dispatch(doLogin(credentials));
    navigate("/")
  };


  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Login</h3>
              <div className="d-flex flex-column gap-15">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  id="username"
                  value={email}
                  onChange={handleChangeEmail}
                  placeholder="Email"
                />
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  placeholder="Password"
                  onChange={handleChangePassword}
                />
                <div>
                  <Link to="/forgot-password">Forgot Password?</Link>

                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button onClick={handleSubmit} className="button border-0">
                      Login
                    </button>
                    <Link to="/signup" className="button signup">
                      SignUp
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
