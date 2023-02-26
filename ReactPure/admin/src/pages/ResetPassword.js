import React from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Đổi mật khẩu</h3>
        <p className="text-center">Nhập mật khẩu mới và xác nhận</p>
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

          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Đổi mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
