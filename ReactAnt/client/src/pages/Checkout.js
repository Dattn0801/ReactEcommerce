import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderUser,
} from "../functions/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");

  //discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);
  useEffect(() => {
    getUserCart(user.token).then((res) => {
      //console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
      //
      setTotalAfterDiscount(res.data.totalAfterDiscount);
    });
  }, [user.token]);

  const emptyCart = () => {
    //remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    //remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon(0);
      toast.error("Giỏ hàng trống, tiếp tục mua sắm nèo :))) ");
    });
  };

  const saveAddressToDb = () => {
    //console.log(address)
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Địa chỉ đã lưu , đặt hàng nào");
      }
    });
  };

  const showAddress = () => (
    <>
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <hr />
      <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
        Lưu địa chỉ
      </button>
    </>
  );

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        type="text"
        className="form-control"
      />
      <button onClick={ApplyDiscountCoupon} className="btn btn-primary mt-2">
        Áp dụng
      </button>
    </>
  );
  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} ={" "}
          {p.product.price * p.count}
        </p>
      </div>
    ));

  const ApplyDiscountCoupon = () => {
    //console.log("send coupon to be", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      if (res.data) {
        setTotalAfterDiscount(res.data);
        console.log("total after discount", totalAfterDiscount);
        //update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      if (res.data.err) {
        setDiscountError(res.data.err);
        //update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const createCashOrder = () => {
    //
    createCashOrderUser(user.token, COD, couponTrueOrFalse).then((res) => {
      console.log("USER CASH ORDER CREATED RES ", res);
      // empty cart form redux, local Storage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });
        // mepty cart from backend
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          navigate("/user/history");
        }, 1000);
      }
    });
  };
  return (
    <div className="row">
      <div className=" col-md-6">
        <h4>Địa chỉ</h4>
        {showAddress()}
        <br />
        <h4>Got coupon?</h4>
        {showApplyCoupon()}
        <br />

        {discountError && <p className="text-danger p-2">{discountError}</p>}
      </div>
      <div className=" col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Sản phẩm {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>Cart Total: {total}</p>
        <hr />
        {totalAfterDiscount > 0 && (
          <p className="text-danger p-2">
            Giá sau khi giảm : {totalAfterDiscount}
          </p>
        )}
        <div className="row">
          <div className="col-md-6">
            {COD ? (
              <button
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
                onClick={createCashOrder}
              >
                {" "}
                Đặt hàng zz
              </button>
            ) : (
              <button
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
                onClick={() => navigate("/payment")}
              >
                {" "}
                Đặt hàng
              </button>
            )}
          </div>
          <div className="col-md-6">
            <button
              className="btn btn-primary"
              disabled={!products.length}
              onClick={emptyCart}
            >
              {" "}
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
