import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AdminNav from "../../../components/nav/AdminNav";
import { getCategories } from "../../../functions/category";
import { createSub, getSubs, removeSub } from "../../../functions/sub";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subs, setSubs] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);
  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));
  const loadSubs = () => getSubs().then((c) => setSubs(c.data));
  const handleSumit = (e) => {
    e.preventDefault();
    setLoading(true);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`"Danh mục phụ${res.data.name}" đã được tạo`);
        setName("");
        loadSubs();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };
  const handleRemove = async (slug) => {
    if (window.confirm("Xóa")) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(`"Danh mục phụ ${res.data.name}" đã được xóa`);
          loadSubs();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };
  //search
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);
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
            <h4>Tạo danh mục phụ</h4>
          )}
          <div className="form-group">
            <label>Danh mục</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Chọn</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <CategoryForm
            handleSumit={handleSumit}
            name={name}
            setName={setName}
          />
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          <hr />
          {subs.filter(searched(keyword)).map((c) => (
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
export default SubCreate;
