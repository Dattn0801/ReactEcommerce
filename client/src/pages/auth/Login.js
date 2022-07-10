import React, { useState } from "react";
import { toast } from "react-toastify";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { Button } from "antd";
import { MailOutlined } from "@ant-design/icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSumit = async (e) => {
    e.preventDefault();
    console.table(email, password);
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
