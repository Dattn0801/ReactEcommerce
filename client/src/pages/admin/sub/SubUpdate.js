import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AdminNav from "../../../components/nav/AdminNav";
import { getSub, updateSub } from "../../../functions/sub";
import { getCategories } from "../../../functions/category";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";

const SubUpdate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [parent, setParent] = useState([]);
  const [categories, setCategories] = useState([]);
  let navigate = useNavigate();
  let { slug } = useParams();
  useEffect(() => {
    loadSub();
    loadCategories();
  }, []);
  const loadSub = () =>
    getSub(slug).then((c) => {
      setName(c.data.name);
      setParent(c.data.parent);
    });
  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));
  const handleSumit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateSub(slug, { name, parent }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"danh mục phụ ${res.data.name}" đã được cập nhật`);
        navigate("/admin/sub");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

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
          <div className="form-group">
            <label>Danh mục chính</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setParent(e.target.value)}
            >
              {categories?.length > 0 &&
                categories.map((c) => (
                  //so id giữa cate và subcate
                  <option key={c._id} value={c._id} selected={c._id === parent}>
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
        </div>
      </div>
    </div>
  );
};
export default SubUpdate;
