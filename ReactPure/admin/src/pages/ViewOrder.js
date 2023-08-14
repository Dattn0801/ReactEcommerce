import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrder, getOrderByUser, getOrders } from "../features/auth/authSlice";
const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
  },
  {
    title: "Thương hiệu",
    dataIndex: "brand",
  },
  {
    title: "Số lượng",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Tổng tiền",
    dataIndex: "amount",
  },
  {
    title: "Ngày tạo",
    dataIndex: "date",
  },

  {
    title: "",
    dataIndex: "action",
  },
];

const ViewOrder = () => {
  const getTokenFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const config2 = {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""}`,
      Accept: "application/json",
    },
  };

  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder({ _id: orderId, config2: config2 }));
  }, []);
  const orderState = useSelector((state) => state?.auth?.singgleOrder);
  const data1 = [];
  for (let i = 0; i < orderState?.orderItems?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState?.orderItems[i]?.product?.title,
      brand: orderState?.orderItems[i]?.product?.brand,
      count: orderState?.orderItems[i]?.product?.quantity,
      amount: orderState?.orderItems[i]?.product?.price,
      color: orderState?.orderItems[i]?.color[0]?.title,
      date: new Date(orderState?.createdAt).toLocaleString(),
      action: (
        <>
          <select
            onChange={(e) => updateOrderStatus(orderState[i]?._id, e.target.value)}
            name=""
            id=""
            className="form-control"
          >
            <option value="Ordered" disabled>
              Đã đặt hàng
            </option>
            <option value="Processed">Đã xử lí</option>
            <option value="Shipped">Đã vận chuyển</option>
            <option value="Out for delivery">Processed</option>
            <option value="Delivered">Đã giao</option>
          </select>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
