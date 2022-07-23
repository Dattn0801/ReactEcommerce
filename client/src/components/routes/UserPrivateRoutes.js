import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
const UserPrivateRoutes = () => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? <Outlet /> : <LoadingToRedirect />;
  //return user && user.token ? <Outlet /> : <Navigate to="/" />;
};
export default UserPrivateRoutes;
