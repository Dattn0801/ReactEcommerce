import { React, useEffect, useState } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getMonthlyData, getOrders, getYearlyData } from "../features/auth/authSlice";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên",
    dataIndex: "name",
  },
  {
    title: "Sản phẩm",
    dataIndex: "product",
  },
  {
    title: "Giá",
    dataIndex: "price",
  },
  {
    title: "Giá giảm",
    dataIndex: "dprice",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
];

const Dashboard = () => {
  const getTokenFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const config2 = {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""}`,
      Accept: "application/json",
    },
  };
  const dispatch = useDispatch();
  const [dataMonthly, setDataMonthly] = useState([]);
  const [monthlyOrderCount, setmonthlyOrderCount] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const monthlyDataState = useSelector((state) => state?.auth?.monthlyData);
  const yearlyDataState = useSelector((state) => state?.auth?.yearlyData);
  const ordersState = useSelector((state) => state?.auth?.orders);
  useEffect(() => {
    dispatch(getMonthlyData(config2));
    dispatch(getYearlyData(config2));
    dispatch(getOrders(config2));
  }, []);
  useEffect(() => {
    const monthNames = [
      "Tháng 01",
      "Tháng 02",
      "Tháng 03",
      "Tháng 04",
      "Tháng 05",
      "Tháng 06",
      "Tháng 07",
      "Tháng 08",
      "Tháng 09",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];
    let monthlyIncome = [];
    let monthlyOrderCount = [];
    for (let i = 0; i < monthlyDataState?.length; i++) {
      const element = monthlyDataState[i];
      monthlyIncome.push({ month: monthNames[element?._id?.month - 1], income: element?.amount });
      monthlyIncome.sort((a, b) => a.month?.localeCompare(b.month));

      monthlyOrderCount.push({ month: monthNames[element?._id?.month - 1], count: element?.count });
      monthlyOrderCount.sort((a, b) => a.month?.localeCompare(b.month));
    }
    setDataMonthly(monthlyIncome);
    setmonthlyOrderCount(monthlyOrderCount);

    const orders = [];
    for (let i = 0; i < ordersState?.length; i++) {
      orders.push({
        key: i,
        name: ordersState[i]?.user?.lastname + " " + ordersState[i]?.user?.firstname,
        product: ordersState[i]?.orderItems?.length,
        price: ordersState[i]?.totalPrice,
        dprice: ordersState[i]?.totalPriceAfterDiscount,
        status: ordersState[i]?.orderStatus,
      });
    }
    setOrderData(orders);
  }, [monthlyDataState, monthlyDataState, ordersState]);

  const dataOrderIncome = {
    data: dataMonthly,
    xField: "month",
    yField: "income",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  const dataOrderCount = {
    data: monthlyOrderCount,
    xField: "month",
    yField: "count",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Tổng tiền</p>
            <h4 className="mb-0 sub-title">
              {yearlyDataState && yearlyDataState[0]?.amount?.toLocaleString("vi-VN")}vnđ
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            {/* <h6>
              <BsArrowDownRight /> 32%
            </h6> */}
            <p className="mb-0  desc">Thu nhập năm trước đến hiện tại</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Tổng đơn hàng</p>
            <h4 className="mb-0 sub-title">{yearlyDataState && yearlyDataState[0]?.count}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            {/* <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6> */}
            <p className="mb-0  desc">Tổng đơn hàng từ năm trước đến hiện tại</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-5 title">Doanh thu </h3>
        <div>
          <Column {...dataOrderIncome} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Đơn hàng </h3>
        <div>
          <Column {...dataOrderCount} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Đơn hàng vừa nhận</h3>
        <div>
          <Table columns={columns} dataSource={orderData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
