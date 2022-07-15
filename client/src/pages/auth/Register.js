import React, { useState } from "react";
import { toast } from "react-toastify";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../../firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const handleSumit = async (e) => {
    e.preventDefault();
    const actionCodeSettings = {
      // url go after click button
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        toast.success(
          `Email xác thực đã được gửi đến địa chỉ ${email}.Kiểm tra email để hoàn tất quá trình đăng nhập`
        );
        console.log(1);
        //Save email on localstorage
        window.localStorage.setItem("emailForSignIn", email);
        //Clear state
        setEmail("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  const registerForm = () => (
    <form onSubmit={handleSumit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Nhập email của bạn"
        autoFocus
      />
      <br />
      <button type="submit" className="btn btn-outline-primary">
        Đăng kí
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Form đăng kí</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};
export default Register;
