import React, { useState } from "react";
import { Menu, Badge } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LoginOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Search from "../forms/Search";
const Header = () => {
  const [current, setCurrent] = useState("home");
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { user, cart } = useSelector((state) => ({ ...state }));

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
    <>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home" icon={<AppstoreOutlined />}>
          <Link to="/">Trang chủ</Link>
        </Menu.Item>
        <Menu.Item
          key="shop"
          icon={<ShoppingOutlined />}
          style={{ float: "right" }}
        >
          <Link to="/shop">Shop</Link>
        </Menu.Item>
        <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
          <Link to="/cart">
            <Badge count={cart.length} offset={[9, 0]}>
              Cart
            </Badge>
          </Link>
        </Menu.Item>
        <span className=" p-1" style={{ marginLeft: "auto" }}>
          <Search />
        </span>

        {user && (
          <Menu.SubMenu
            icon={<SettingOutlined />}
            title={user.name && user.name.split("@")[0]}
          >
            {user && user.role === "subcriber" && (
              <Menu.Item>
                <Link to="user/history">Dashboard</Link>
              </Menu.Item>
            )}
            {user && user.role === "admin" && (
              <Menu.Item>
                <Link to="admin/dashboard">Dashboard</Link>
              </Menu.Item>
            )}

            <Menu.Item icon={<LoginOutlined />} onClick={logout}>
              Đăng xuất
            </Menu.Item>
          </Menu.SubMenu>
        )}
        {!user && (
          <Menu.Item key="register" icon={<UserAddOutlined />}>
            <Link to="/register">Đăng kí</Link>
          </Menu.Item>
        )}
        {!user && (
          <Menu.Item key="login" icon={<UserOutlined />}>
            <Link to="/login">Đăng nhập</Link>
          </Menu.Item>
        )}
      </Menu>
    </>
  );
};

export default Header;
