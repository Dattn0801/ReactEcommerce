import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { signInWithEmailLink, updatePassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import createOrUpdateUser from "../../functions/auth";
const RegisterComplete = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

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
      if (result.user.emailVerified) {
        //remove user from local storage
        window.localStorage.removeItem("emailForSignIn");
        //get user id token
        let user = auth.currentUser;
        await updatePassword(user, password);
        const idTokenResult = await user.getIdTokenResult();
        //Create user in backend using Axios
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
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
