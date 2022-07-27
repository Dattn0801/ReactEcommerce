import React from "react";
const CategoryForm = ({ handleSumit, name, setName }) => (
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
export default CategoryForm;
