import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

import { updateCartProduct, deleteCartProduct, getUserCart } from "../features/user/userSlice";

const Cart = () => {
  const getTokenFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const config2 = {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""}`,
      Accept: "application/json",
    },
  };

  const dispatch = useDispatch();
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const userCartState = useSelector((state) => state.auth?.cartProducts);

  useEffect(() => {
    dispatch(getUserCart(config2));
  }, []);
  useEffect(() => {
    if (productUpdateDetail !== null) {
      dispatch(
        updateCartProduct({
          cartItemId: productUpdateDetail?.cartItemId,
          quantity: productUpdateDetail?.quantity,
          config2: config2,
        })
      );
      setTimeout(() => {
        dispatch(getUserCart(config2));
      }, 300);
    }
  }, [productUpdateDetail]);

  const deleteItemInCart = (id) => {
    dispatch(deleteCartProduct({ id: id, config2: config2 }));
    setTimeout(() => {
      dispatch(getUserCart(config2));
    }, 300);
  };
  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < userCartState?.length; i++) {
      sum = sum + Number(userCartState[i].quantity) * userCartState[i].price;
      setTotalAmount(sum);
    }
  }, [userCartState]);

  return (
    <>
      <Meta title={"Giỏ hàng"} />
      <BreadCrumb title="Giỏ hàng" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Sản phẩm</h4>
              <h4 className="cart-col-2">Giá</h4>
              <h4 className="cart-col-3">Số lượng</h4>
              <h4 className="cart-col-4">Tổng tiền</h4>
            </div>
            {userCartState &&
              userCartState?.map((item, index) => {
                return (
                  <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                    <div className="cart-col-1 gap-15 d-flex align-items-center">
                      <div className="w-25">
                        <img
                          src={item?.productId?.images[0]?.url ? item?.productId?.images[0]?.url : watch}
                          className="img-fluid"
                          alt="product image"
                        />
                      </div>
                      <div className="w-75">
                        <p>{item?.productId?.title}</p>
                        <p>{item?.productId?.color?.title}</p>
                        <div className="d-flex gap-3">
                          Màu:
                          <ul className="colors ps-0">
                            <li style={{ backgroundColor: item?.color.title }}></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="cart-col-2">
                      <h5 className="price">{item?.price?.toLocaleString("vi-VN")} vnđ</h5>
                    </div>
                    <div className="cart-col-3 d-flex align-items-center gap-15">
                      <div>
                        <input
                          className="form-control"
                          type="number"
                          name=""
                          min={1}
                          max={10}
                          id={"cart" + item?._id}
                          value={item?.quantity}
                          onChange={(e) => {
                            setProductUpdateDetail({
                              cartItemId: item?._id,
                              quantity: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div>
                        <AiFillDelete
                          onClick={() => {
                            deleteItemInCart(item?._id);
                          }}
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="cart-col-4">
                      <h5 className="price">{(item?.price * item?.quantity).toLocaleString("vi-VN")} vnđ</h5>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button">
                Continue To Shopping
              </Link>
              {(totalAmount !== null || totalAmount !== 0) && (
                <div className="d-flex flex-column align-items-end">
                  <h4>Tổng tiền: {totalAmount?.toLocaleString("vi-VN")} vnđ</h4>
                  <p>Phí vận chuyển sẽ được tính vào lúc đặt hàng</p>
                  <Link to="/checkout" className="button">
                    Đặt hàng
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
