import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders, updateOrder } from "../features/auth/authSlice";
const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Người đặt",
    dataIndex: "name",
  },
  {
    title: "Sản phẩm",
    dataIndex: "product",
  },
  {
    title: "Tổng tiền",
    dataIndex: "amount",
  },
  {
    title: "Ngày đặt",
    dataIndex: "date",
  },

  {
    title: "",
    dataIndex: "action",
  },
];

const Orders = () => {
  const getTokenFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const config2 = {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""}`,
      Accept: "application/json",
    },
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders(config2));
  }, []);
  const orderState = useSelector((state) => state.auth?.orders);
  const data = [];
  for (let i = 0; i < orderState?.length; i++) {
    data.push({
      key: i + 1,
      name: orderState[i]?.user?.lastname + " " + orderState[i]?.user?.firstname,
      product: <Link to={`/admin/order/${orderState[i]?._id}`}>View Orders</Link>,
      amount: orderState[i]?.totalPrice,
      date: new Date(orderState[i]?.createdAt).toLocaleString(),
      action: (
        <>
          <select
            onChange={(e) => updateOrderStatus(orderState[i]?._id, e.target.value)}
            defaultValue={orderState[i]?.orderStatus}
            name=""
            id=""
            className="form-control"
          >
            <option value="Ordered" disabled>
              Đã đặt hàng
            </option>
            <option value="Processed">Đang xữ lí</option>
            <option value="Shipped">Đã vận chuyển</option>
            <option value="Outfordelivery">Processed</option>
            <option value="Delivered">Đã giao</option>
          </select>
        </>
      ),
    });
  }
  const updateOrderStatus = (id, status) => {
    dispatch(updateOrder({ id: id, status: status, config2: config2 }));
  };
  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>{<Table columns={columns} dataSource={data} />}</div>
    </div>
  );
};

export default Orders;
