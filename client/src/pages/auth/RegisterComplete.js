import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../../firebase";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useState(() => {
    console.log(localStorage.getItem("emailForSignIn"));
  }, []);
  const handleSumit = async (e) => {
    e.preventDefault();
  };
  const compelteRegistrationForm = () => (
    <form onSubmit={handleSumit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <br />
      <button type="submit" className="btn btn-outline-secondary">
        Hoàn tất đăng nhập
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Form đăng kí</h4>
          {compelteRegistrationForm()}
        </div>
      </div>
    </div>
  );
};
export default RegisterComplete;
