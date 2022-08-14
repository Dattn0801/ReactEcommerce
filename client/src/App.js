import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

//authentication
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
//Pages
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Header from "./components/nav/Header";
import History from "./pages/user/History";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import CategoryHome from "./pages/category/CategoryHome";
//Dashboard
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import ProductList from "./pages/admin/product/ProductList";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Product from "./pages/Product";
//Private Routes
import UserPrivateRoutes from "./components/routes/UserPrivateRoutes";
//Admin Routes
import AdminRoutes from "./components/routes/AdminRoute";
//Style
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

//Toast message
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterComplete from "./pages/auth/RegisterComplete";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log(idTokenResult);
        currentUser(idTokenResult.token)
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
      }
    });
    //cleanup
    return () => unsubcribe();
  }, [dispatch]);
  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/complete" element={<RegisterComplete />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/category/:slug" element={<CategoryHome />} />
        <Route element={<UserPrivateRoutes />}>
          <Route path="/user/history" element={<History />} />
          <Route path="/user/password" element={<Password />} />
          <Route path="/user/wishlist" element={<Wishlist />} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/category" element={<CategoryCreate />} />
          <Route path="/admin/category/:slug" element={<CategoryUpdate />} />
          <Route path="/admin/sub" element={<SubCreate />} />
          <Route path="/admin/sub/:slug" element={<SubUpdate />} />
          <Route path="/admin/product" element={<ProductCreate />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/product/:slug" element={<ProductUpdate />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
