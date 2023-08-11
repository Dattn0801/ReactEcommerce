import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Meta from "../components/Meta";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import { getUserOrders } from "../features/user/userSlice";

const Orders = () => {
  const getTokenFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const config2 = {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""}`,
      Accept: "application/json",
    },
  };
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state?.auth?.userOrders?.orders);
  useEffect(() => {
    dispatch(getUserOrders(config2));
  }, []);
  return (
    <>
      <Meta title={"Đơn hàng"} />
      <BreadCrumb title="Đơn hàng" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div class="row">
          <div className="col-12">
            <div className="row">
              <div className="col-3">
                <h5>Mã đơn hàng</h5>
              </div>
              <div className="col-3">
                <h5>Tổng tiền</h5>
              </div>
              <div className="col-3">
                <h5>Tổng tiền sau khi giảm</h5>
              </div>
              <div className="col-3">
                <h5>Trạng thái đơn hàng</h5>
              </div>
            </div>
          </div>
          <div className="col-12 mt-3">
            {orderState &&
              orderState?.map((item, index) => {
                return (
                  <div style={{ backgroundColor: "#febd69" }} className="row pt-3  my-3" key={index}>
                    <div className="col-3">
                      <p>{item?._id}</p>
                    </div>
                    <div className="col-3">
                      <p>{item?.totalPrice}</p>
                    </div>
                    <div className="col-3">
                      <h6>{item?.totalPriceAfterDiscount}</h6>
                    </div>
                    <div className="col-3">
                      <h6>{item?.orderStatus}</h6>
                    </div>
                    <div className="col-12">
                      <div style={{ backgroundColor: "#232f3e" }} className="row py-3">
                        <div className="col-3">
                          <h6 className="text-white">Tên sản phẩm</h6>
                        </div>
                        <div className="col-3">
                          <h6 className="text-white">Số lượng </h6>
                        </div>
                        <div className="col-3">
                          <h6 className="text-white">Đơn giá</h6>
                        </div>
                        <div className="col-3">
                          <h6 className="text-white">Màu sắc</h6>
                        </div>
                        {item?.orderItems?.map((i, index) => {
                          return (
                            <div className="col-12">
                              <div className="row  py-3">
                                <div className="col-3">
                                  <h6 className="text-white">{i.product?.title}</h6>
                                </div>
                                <div className="col-3">
                                  <h6 className="text-white">{i?.quantity}</h6>
                                </div>
                                <div className="col-3">
                                  <h6 className="text-white">{i.product?.price}</h6>
                                </div>
                                <div className="col-3">
                                  <ul className="colors ps-0">
                                    <li style={{ backgroundColor: i?.color?.title }}></li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Orders;
