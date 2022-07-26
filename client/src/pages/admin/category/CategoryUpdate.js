import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AdminNav from "../../../components/nav/AdminNav";
import { getCategory, updateCategory } from "../../../functions/category";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const CategoryUpdate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let { slug } = useParams();
  useEffect(() => {
    loadCategory();
  }, []);
  const loadCategory = () =>
    getCategory(slug).then((c) => setName(c.data.name));
  const handleSumit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" đã được cập nhật`);
        navigate("/admin/category");
      })
      .catch((err) => {
        console.log(err);
        console.log("111");
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };
  const categoryForm = () => (
    <form onSubmit={handleSumit}>
      <div className="form-group">
        <label>Tên danh mục</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoFocus
          required
        />
        <br />
        <button className="btn btn-outline-primary">Cập nhật</button>
      </div>
    </form>
  );
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Cập nhật danh mục</h4>
          )}
          {categoryForm()}
          <hr />
          {/* {categories.map((c) => 
          
          )} */}
        </div>
      </div>
    </div>
  );
};
export default CategoryUpdate;
