import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../images/watch.jpg";
import Container from "../components/Container";

import { createOrder, getUserCart } from "../features/user/userSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { config } from "../utils/axiosconfig";

const shippingSchema = yup.object({
  firstName: yup.string().required("Cần tên"),
  lastName: yup.string().required("Cần họ"),
  address: yup.string().required("Cần địa chỉ"),
  state: yup.string().required("Cần state"),
  city: yup.string().required("Cần thành phố"),
  country: yup.string().required("Csần thành phố"),
  other: yup.string().required("Cần thành phố"),
});
const Checkout = () => {
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfor] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    razorPaymentId: "",
    razorpayOrderId: "",
  });
  const [cartProductState, setCartProductState] = useState([]);
  const shipping = 20000;
  const cartState = useSelector((state) => state.auth?.cartProducts);

  useEffect(() => {
    dispatch(getUserCart());
    let items = [];
    for (let i = 0; i < cartState?.length; i++) {
      items.push({
        product: cartState[i].productId._id,
        quantity: cartState[i].quantity,
        color: cartState[i].color._id,
        price: cartState[i].price,
      });
    }
    setCartProductState(items);
  }, []);
  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < cartState?.length; i++) {
      sum = sum + Number(cartState[i].quantity) * cartState[i].price;
      setTotalAmount(sum);
    }
  }, [cartState]);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      state: "",
      city: "",
      country: "",
      other: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      setShippingInfor(values);
      console.log(shippingInfo);
      setTimeout(() => {
        checkoutHandler();
      }, 300);
    },
  });

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  const checkoutHandler = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const result = await axios.post(
      "http://localhost:8000/api/user/order/checkout",
      "",
      config
    );

    if (!result) {
      alert("sth went wrong");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data.order;
    const options = {
      key: "rzp_test_QVXlSyXuwTP4up", // Enter the Key ID generated from the Dashboard
      amount: amount?.toString(),
      currency: currency,
      name: "DTN Coop",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        };
        const result = await axios.post(
          "http://localhost:8000/api/user/order/paymentVerification",
          data,
          config
        );
        setPaymentInfo({
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        });
        dispatch(
          createOrder({
            totalPrice: totalAmount,
            totalPriceAfterDiscount: totalAmount,
            orderItems: cartProductState,
            paymentInfo,
            shippingInfo,
          })
        );
      },
      prefill: {
        name: "DatThanhNguyen",
        email: "thanhdat08011999@gmail.com",
        contact: "08011999",
      },
      notes: {
        address: "7, Truong Thi Kien, Thai My Cu Chi, Ho Chi Minh",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">DStore</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Giỏ hàng
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Thông tin
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Phí ship
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Thanh toán
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Thông tin liên lạc</h4>
              <p className="user-details total">
                DStore (thanhdat08011999@gmail.com)
              </p>
              <h4 className="mb-3">Địa chỉ nhận hàng</h4>
              <form
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
                onSubmit={formik.handleSubmit}
              >
                <div className="w-100">
                  <select
                    name="country"
                    className="form-control form-select"
                    id=""
                    value={formik.values.country}
                    onChange={formik.handleChange("country")}
                    onBlur={formik.handleBlur("country")}
                  >
                    <option value="" selected disabled>
                      Select country
                    </option>
                    <option value="VietNam">VietNam</option>
                  </select>
                  <div className="errors ms-2 my-1">
                    {formik.touched.country && formik.errors.country}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    onChange={formik.handleChange("firstName")}
                    onBlur={formik.handleBlur("firstName")}
                    value={formik.values.firstName}
                  />
                  <div className="errors">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    onChange={formik.handleChange("lastName")}
                    onBlur={formik.handleBlur("lastName")}
                    value={formik.values.lastName}
                  />
                  <div className="errors">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    name="address"
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                    value={formik.values.address}
                  />
                  <div className="errors">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Apartment, Suite ,etc"
                    className="form-control"
                    name="other"
                    onChange={formik.handleChange("other")}
                    onBlur={formik.handleBlur("other")}
                    value={formik.values.orther}
                  />
                  <div className="errors">
                    {formik.touched.other && formik.errors.other}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    name="city"
                    type="text"
                    placeholder="City"
                    className="form-control"
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur("city")}
                    value={formik.values.city}
                  />
                  <div className="errors">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <select
                    name="state"
                    className="form-control form-select"
                    id=""
                    value={formik.values.state}
                    onChange={formik.handleChange("state")}
                    onBlur={formik.handleBlur("state")}
                  >
                    <option value="" selected disabled>
                      Chọn Thành phố
                    </option>
                    <option value="VietNam">HCM</option>
                  </select>
                  <div className="errors">
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    name="pincode"
                    type="text"
                    placeholder="Zipcode"
                    className="form-control"
                    onChange={formik.handleChange("pincode")}
                    onBlur={formik.handleBlur("pincode")}
                    value={formik.values.pincode}
                  />
                  <div className="errors">
                    {formik.touched.pincode && formik.errors.pincode}
                  </div>
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Quay lại giỏ hàng
                    </Link>
                    <Link to="/product" className="button">
                      Tiếp tục mua hàng
                    </Link>
                    <button
                      className="button"
                      type="submit"
                      onClick={checkoutHandler}
                    >
                      Mua ngay
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              {cartState &&
                cartState?.map((item, index) => {
                  return (
                    <div className="d-flex gap-10 mb-2 align-align-items-center">
                      <div className="w-75 d-flex gap-10">
                        <div className="w-25 position-relative">
                          <span
                            style={{ top: "-10px", right: "2px" }}
                            className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                          >
                            {item?.quantity}
                          </span>
                          <img
                            className="img-fluid"
                            src={
                              item?.productId?.images[0]?.url
                                ? item?.productId?.images[0]?.url
                                : watch
                            }
                            alt="product"
                          />
                        </div>
                        <div>
                          <h5 className="total-price">
                            {item?.productId?.title?.toLocaleString()}
                          </h5>
                          <div className="d-flex gap-3">
                            Màu:
                            <ul className="colors ps-0">
                              <li
                                style={{ backgroundColor: item?.color.title }}
                              ></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="total">
                          {(item?.price * item?.quantity).toLocaleString(
                            "vi-VN"
                          )}{" "}
                          vnđ
                        </h5>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Số tiền</p>
                <p className="total-price">
                  {totalAmount?.toLocaleString("vi-VN")} vnđ
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Chi phí vận chuyển</p>
                <p className="mb-0 total-price">
                  {shipping?.toLocaleString("vi-VN")} vnđ
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Tổng tiền hàng</h4>
              <h5 className="total-price">
                {totalAmount
                  ? (totalAmount + shipping).toLocaleString("vi-VN")
                  : 0}{" "}
                vnđ
              </h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
