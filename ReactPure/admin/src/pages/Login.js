import React from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Đăng nhập</h3>
        <p className="text-center">Login to your account to continue.</p>
        <form action="">
          <CustomInput
            type="text"
            label="Email "
            placehoder="Nhập email"
            id="email"
            name="email"
          />
          <CustomInput
            type="password"
            label="Mật khẩu"
            placehoder="Password"
            id="password"
          />
          <br />
          <div className="mb-3 text-end">
            <Link to="forgot-password" className="">
              Quên mật khẩu
            </Link>
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
