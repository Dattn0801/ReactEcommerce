import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import createOrUpdateUser from "../../functions/auth";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  let dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const location = useLocation();
  const roleBaseRedirect = (res) => {
    const intended = location.state;
    if (intended) {
      navigate(`/${intended.from}`);
    } else {
      if (res.data.role === "admin") {
        console.log(res.data.role);
        navigate("/admin/dashboard");
      } else {
        navigate("/user/history");
      }
    }
  };
  useEffect(() => {
    let intended = location.state;
    if (intended) return;
    if (user && user.token) return;
  }, [user]);

  const handleSumit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
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
          roleBaseRedirect(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
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
            roleBaseRedirect(res);
          })
          .catch((err) => {
            toast.error(err);
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
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
        disabled={!email || password < 6}
      >
        Đăng nhập bằng Email/Password
      </Button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading ...</h4>
          ) : (
            <h4>Đăng nhập</h4>
          )}
          {loginForm()}
          <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3"
            block
            shape="round"
            icon={<MailOutlined />}
            size="large"
          >
            Đăng nhập với google
          </Button>
          <Link to="/forgot/password" className="float-right text-danger">
            Quên mật khẩu ?
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
