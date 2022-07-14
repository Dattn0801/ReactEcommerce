import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const [current, setCurrent] = useState("home");
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { user } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    setCurrent(e.key);
  };
  const logout = () => {
    const auth = getAuth();
    signOut(auth);
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/login");
  };
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Trang chủ</Link>
      </Menu.Item>

      {user && (
        <Menu.SubMenu
          icon={<SettingOutlined />}
          title={user.name && user.name.split("@")[0]}
        >
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
          <Menu.Item icon={<LoginOutlined />} onClick={logout}>
            Đăng xuất
          </Menu.Item>
        </Menu.SubMenu>
      )}
      {!user && (
        <Menu.Item
          key="register"
          icon={<UserAddOutlined />}
          className="float-start"
        >
          <Link to="/register">Đăng kí</Link>
        </Menu.Item>
      )}
      {!user && (
        <Menu.Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Đăng nhập</Link>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Header;
