import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from "../../../functions/coupon";
//date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";

const CreateCouponPage = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  const handleSumit = (e) => {
    e.preventDefault();
    setLoading(true);
    //console.table(name, expiry, discount);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        setDiscount("");
        setExpiry("");
        toast.success(`tạo coupon ${res.data.name} thành công`);
      })
      .catch((err) => console.log("create coupon err", err));
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Coupon</h4>
          <form onSubmit={handleSumit}>
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
              <br />
            </div>
            <div className="form-group">
              <label className="text-muted">Discount %</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                autoFocus
                required
              />
              <br />
            </div>
            <div className="form-group">
              <label className="text-muted">Ngày hết hạn</label>
              <DatePicker
                className="form-control"
                selected={new Date()}
                value={expiry}
                onChange={(date) => setExpiry(date)}
                required
              />
              <br />
            </div>
            <button className="btn btn-outline-primary">Lưu</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateCouponPage;
