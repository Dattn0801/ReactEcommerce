import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { signInWithEmailLink, updatePassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const RegisterComplete = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForSignIn"));
  }, []);
  const handleSumit = async (e) => {
    e.preventDefault();
    //Validate
    if (!email || !password) {
      toast.error("Cần tài khoản email và mật khẩu");
      return;
    }
    if (password.length < 6) {
      toast.error("Mật khẩu hơn 6 kí tự");
      return;
    }
    try {
      const result = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );

      //   console.log("RESULT", result);
      if (result.user.emailVerified) {
        //remove user from local storage
        window.localStorage.removeItem("emailForSignIn");
        //get user id token
        let user = auth.currentUser;

        await updatePassword(user, password);
        const idTokenResult = await user.getIdTokenResult();
        //redux store
        // console.log("user", user, "idtokenrs", idTokenResult);
        //redirect
        navigate("/");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const compelteRegistrationForm = () => (
    <form onSubmit={handleSumit}>
      <input type="email" className="form-control" value={email} disabled />
      <br />
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        placeholder="Nhập mật khẩu mới"
      />
      <br />
      <button type="submit" className="btn btn-outline-secondary">
        Hoàn tất đăng kí
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Hoàn tất đăng kí</h4>
          {compelteRegistrationForm()}
        </div>
      </div>
    </div>
  );
};
export default RegisterComplete;
