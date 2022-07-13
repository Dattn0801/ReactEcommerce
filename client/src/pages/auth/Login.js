import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const handleSumit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          name: user.email,
          token: idTokenResult,
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast(error);
      setLoading(false);
    }
  };
  const loginForm = () => (
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
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Nhập mật khẩu của bạn"
        autoFocus
      />
      <br />
      {/* <button type="submit" className="btn btn-outline-secondary">
        Đăng nhập
      </button> */}
      <Button
        onClick={handleSumit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || !password}
      >
        Đăng nhập
      </Button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Đăng nhập</h4>
          {loginForm()}
        </div>
      </div>
    </div>
  );
};
export default Login;
