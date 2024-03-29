import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AdminNav from "../../../components/nav/AdminNav";
import { getCategory, updateCategory } from "../../../functions/category";
import { useParams, useNavigate } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
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
          <CategoryForm
            handleSumit={handleSumit}
            name={name}
            setName={setName}
          />
          <hr />
          {/* {categories.map((c) => 
          
          )} */}
        </div>
      </div>
    </div>
  );
};
export default CategoryUpdate;
