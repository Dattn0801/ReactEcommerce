import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import MainLayout from "./components/MainLayout";
import Login from "./pages/Login";
import Resetpassword from "./pages/ResetPassword";
import Forgotpassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Bloglist from "./pages/BlogList";
import Blogcatlist from "./pages/BlogCatList";
import Enquiries from "./pages/Enquiries";
import Addcolor from "./pages/AddColor";
import Addblog from "./pages/AddBlog";
import BrandList from "./pages/BrandList";
import AddCat from "./pages/AddCat";
import CategoryList from "./pages/CategoryList";
import AddBlogCategory from "./pages/AddBlogCat";
import Orders from "./pages/Orders";
import ColorList from "./pages/ColorList";
import Addbrand from "./pages/AddBrand";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import BlogCatList from "./pages/BlogCatList";
import PageNotFound from "./pages/PageNotFound";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="blog-list" element={<Bloglist />} />
          <Route path="blog" element={<Addblog />} />
          <Route path="blog-category-list" element={<BlogCatList />} />
          <Route path="blog-category" element={<AddBlogCategory />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="list-color" element={<ColorList />} />
          <Route path="color" element={<Addcolor />} />
          <Route path="list-category" element={<CategoryList />} />
          <Route path="category" element={<AddCat />} />
          <Route path="list-brand" element={<BrandList />} />
          <Route path="brand" element={<Addbrand />} />
          <Route path="list-product" element={<ProductList />} />
          <Route path="product" element={<AddProduct />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
