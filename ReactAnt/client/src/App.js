import React, { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
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
import { LoadingOutlined } from "@ant-design/icons";
// //authentication
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import ForgotPassword from "./pages/auth/ForgotPassword";

// //Pages
// import Home from "./pages/Home";
// import PageNotFound from "./pages/PageNotFound";
// import Header from "./components/nav/Header";
// import History from "./pages/user/History";
// import Password from "./pages/user/Password";
// import Wishlist from "./pages/user/Wishlist";
// import CategoryHome from "./pages/category/CategoryHome";
// import SubHome from "./pages/sub/SubHome";
// import Shop from "./pages/Shop";
// import Cart from "./pages/Cart";
// import SideDrawer from "./components/drawer/SideDrawer";
// import Checkout from "./pages/Checkout";
// import Product from "./pages/Product";
// import Payment from "./pages/Payment";

// //Dashboard
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import CategoryCreate from "./pages/admin/category/CategoryCreate";
// import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
// import SubCreate from "./pages/admin/sub/SubCreate";
// import SubUpdate from "./pages/admin/sub/SubUpdate";
// import ProductCreate from "./pages/admin/product/ProductCreate";
// import ProductList from "./pages/admin/product/ProductList";
// import ProductUpdate from "./pages/admin/product/ProductUpdate";
// import CreateCouponPage from "./pages/admin/coupon/CreateCoupon";
// //Private Routes
// import UserPrivateRoutes from "./components/routes/UserPrivateRoutes";
// //Admin Routes
// import AdminRoutes from "./components/routes/AdminRoute";

//authentication
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
//Pages
const Home = lazy(() => import("./pages/Home"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Header = lazy(() => import("./components/nav/Header"));
const History = lazy(() => import("./pages/user/History"));
const Password = lazy(() => import("./pages/user/Password"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubHome = lazy(() => import("./pages/sub/SubHome"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Product = lazy(() => import("./pages/Product"));
const Payment = lazy(() => import("./pages/Payment"));

// //Dashboard
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const CategoryCreate = lazy(() =>
  import("./pages/admin/category/CategoryCreate")
);
const CategoryUpdate = lazy(() =>
  import("./pages/admin/category/CategoryUpdate")
);
const SubCreate = lazy(() => import("./pages/admin/sub/SubCreate"));
const SubUpdate = lazy(() => import("./pages/admin/sub/SubUpdate"));
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const ProductList = lazy(() => import("./pages/admin/product/ProductList"));
const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));
const CreateCouponPage = lazy(() =>
  import("./pages/admin/coupon/CreateCoupon")
);
// //Private Routes
const UserPrivateRoutes = lazy(() =>
  import("./components/routes/UserPrivateRoutes")
);
// //Admin Routes
const AdminRoutes = lazy(() => import("./components/routes/AdminRoute"));

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
    <Suspense
      fallback={
        <div className="text-center">
          __ React Redux EC
          <LoadingOutlined />
          MMERCE __
        </div>
      }
    >
      <Header />
      <SideDrawer />
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
        <Route path="/sub/:slug" element={<SubHome />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route element={<UserPrivateRoutes />}>
          <Route path="/user/history" element={<History />} />
          <Route path="/user/password" element={<Password />} />
          <Route path="/user/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
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
          <Route path="/admin/coupon" element={<CreateCouponPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
