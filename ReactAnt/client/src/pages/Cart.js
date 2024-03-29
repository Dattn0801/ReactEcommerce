import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCardInCheckOut from "../components/cards/ProductCardInCheckOut";
import ModalImage from "react-modal-image";
import { useNavigate, Link } from "react-router-dom";
import { userCart } from "../functions/user";
const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  const saveOrderToDb = () => {
    // console.log("cart", cart);
    userCart(cart, user.token)
      .then((res) => {
        console.log("cart post res", res);
        if (res.data.ok) navigate("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };
  const saveCashOrderToDb = () => {
    // console.log("cart", cart);
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("cart post res", res);
        if (res.data.ok) navigate("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };
  const showCartItems = () => (
    <table className="table table-borderless">
      <thead className="thead-light">
        <tr>
          <th scope="col">Ảnh</th>
          <th scope="col">Tên sản phẩm</th>
          <th scope="col">Giá</th>
          <th scope="col">Thương hiệu</th>
          <th scope="col">Màu sắc</th>
          <th scope="col">Số lượng</th>
          <th scope="col">Shipping</th>
          <th scope="col">Xóa</th>
        </tr>
      </thead>
      {cart.map((p) => (
        <ProductCardInCheckOut key={p._id} p={p} />
      ))}
    </table>
  );

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
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Đơn hàng</h4>
          <hr />
          <p>Sản phẩm</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                <span className="text-primary"> {c.title}</span> x
                <span className="text-danger">{c.count} </span>= $
                {c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Tổng tiền <b>${getTotal()}</b>
          <hr />
          {user ? (
            <>
              <button
                onClick={saveOrderToDb}
                disabled={!cart.length}
                className="btn btn-sm btn-primary mt-2"
              >
                {" "}
                Đặt hàng (Stripe)
              </button>
              <br />
              <button
                onClick={saveCashOrderToDb}
                disabled={!cart.length}
                className="btn btn-sm btn-primary mt-2"
              >
                {" "}
                Đặt hàng
              </button>
            </>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link to="/login" state={{ from: "cart" }}>
                Đăng nhập để thanh toán
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
