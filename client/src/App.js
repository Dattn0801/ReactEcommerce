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
import PrivateRoutes from "./components/routes/PrivateRoutes";
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
        console.log("user", user);
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult,
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
  }, []);
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
        <Route element={<PrivateRoutes />}>
          <Route path="/user/history" element={<History />} />
        </Route>
        <Route path="/admin/dashboard" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
