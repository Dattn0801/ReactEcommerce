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
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={[
          {
            label: (
              <a href="/" rel="noopener noreferrer">
                Trang chủ
              </a>
            ),
            key: "home",
            icon: <AppstoreOutlined />,
          },
          {
            label: (
              <a href="/shop" rel="noopener noreferrer">
                Shop
              </a>
            ),
            key: "shop",
            icon: <ShoppingOutlined />,
            style: { float: "right" },
          },
          {
            label: (
              <a href="/cart" rel="noopener noreferrer">
                <Badge count={cart.length} offset={[9, 0]}>
                  Cart
                </Badge>
              </a>
            ),
            key: "cart",
            icon: <ShoppingOutlined />,
            style: { float: "right" },
          },
          {
            label: (
              <span style={{ marginLeft: "auto" }}>
                <Search />
              </span>
            ),
          },
          user && {
            label: user.name && user.name.split("@")[0],
            icon: <SettingOutlined />,
            children: [
              user &&
                user.role === "subcriber" && {
                  label: (
                    <a href="/user/history" rel="noopener noreferrer">
                      Dashboard User
                    </a>
                  ),
                },
              user &&
                user.role === "admin" && {
                  label: (
                    <a href="/admin/dasboard" rel="noopener noreferrer">
                      Dashboard Admin
                    </a>
                  ),
                },
              {
                label: "Đăng xuất",
                onClick: logout,
              },
            ],
          },
          !user && {
            label: (
              <a href="/register" rel="noopener noreferrer">
                Đăng kí
              </a>
            ),
          },
          !user && {
            label: (
              <a href="/login" rel="noopener noreferrer">
                Đăng nhập
              </a>
            ),
          },
        ]}
      ></Menu>
    </>
  );
};
export default Header;
