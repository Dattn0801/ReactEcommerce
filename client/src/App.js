import React  from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

//authentication
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
//Pages
import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound'
const  App = ()=> {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound/>}/>
     <Route path="/" element={<Home/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/register" element={<Register/>}/>
    </Routes>
  )
 }

export default App;
