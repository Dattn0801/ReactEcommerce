import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import {
  sendPasswordResetEmail,
} from "firebase/auth";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  let navigate = useNavigate();
  useEffect(() => {
    if (user && user.token) navigate("/");
  }, [user,navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const actionCodeSettings = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await sendPasswordResetEmail(auth, email, actionCodeSettings)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success(
          "Email khôi phục mật khẩu đã được gửi, Kiểm tra email nhận link khôi phục mật khẩu"
        );
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        console.log("err message in forgot password", error);
      });
  };
  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? (
        <h4 className="text-danger">Đang chạy</h4>
      ) : (
        <h4>Quên mật khẩu</h4>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          name=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập email khôi phục"
          autoFocus
        />
        <br />
        <button className="btn btn-raised" disabled={!email}>
          Gửi
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
