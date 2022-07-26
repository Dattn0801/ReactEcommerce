import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AdminNav from "../../../components/nav/AdminNav";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));
  const handleSumit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.name}" đã được tạo`);
        setName("");
        loadCategories();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };
  const handleRemove = async (slug) => {
    if (window.confirm("Xóa")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(`"${res.data.name}" đã xóa`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
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
        <button className="btn btn-outline-primary">Lưu</button>
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
            <h4>Tạo danh mục</h4>
          )}
          {categoryForm()}
          <hr />
          {categories.map((c) => (
            <div className="alert alert-secondary" key={c._id}>
              {c.name}
              <span
                className="float-right"
                onClick={() => handleRemove(c.slug)}
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <span></span>

              <Link to={`${c.slug}`}>
                <span className="float-right">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CategoryCreate;
