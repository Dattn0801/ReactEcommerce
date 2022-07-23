import { updatePassword } from "firebase/auth";
import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updatePassword(auth.currentUser, password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Cập nhật mật khẩu thành công");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err);
      });
  };
  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nhập mật khẩu</label>
        <input
          type="password"
          className="form-control"
          placeholder="Nhập mật khẩu mới"
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          value={password}
        />
        <br />
        <button
          className="btn btn-primary"
          disabled={!password || password.length < 6 || loading}
        >
          Xác nhận
        </button>
      </div>
    </form>
  );
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>

        <div className="col-md-10">
          {loading ? (
            <h4 className="text-danger">Loading ....</h4>
          ) : (
            <h4>Đổi mật khẩu</h4>
          )}
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};
export default Password;
