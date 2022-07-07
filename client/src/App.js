import React from "react";
import { Routes, Route } from "react-router-dom";

//authentication
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

//Pages
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Header from "./components/nav/Header";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

//Toast message
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterComplete from "./pages/auth/RegisterComplete";

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registercomplete" element={<RegisterComplete />} />
      </Routes>
    </>
  );
};

export default App;
