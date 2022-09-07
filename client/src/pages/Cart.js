import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  return (
    <div className="container-fluid">
      <div className="row">{/* <h2>{JSON.stringify(cart)}</h2> */}</div>
      <div className="row">
        <div className="col-md-8">
          {!cart.length ? (
            <h4>
              No pro in cart <Link to="/shop">continue shopping</Link>
            </h4>
          ) : (
            "show cart"
          )}
        </div>
        <div className="col-md-4">
          <h4>order summary</h4>
          <hr />
          <p>Sản phẩm</p>
          {cart.map((c, i) => {
            <div key={i}>
            <p></p>
            </div>;
          })}
          {user ? (
            <button className="btn btn-sm btn-primary mt-2"> Thanh toán</button>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              Đăng nhập để thanh toán
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
