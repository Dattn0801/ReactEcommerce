import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getProductByCount } from "../../functions/product";
import AdminProduct from "../../components/cards/AdminProductCard";
const AdminDashboard = () => {
  useEffect(() => {}, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>

          <div className="col">
            <h4>dashboard</h4>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminDashboard;
