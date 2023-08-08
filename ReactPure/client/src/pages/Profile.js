import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Meta from "../components/Meta";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import * as yup from "yup";
import { useFormik } from "formik";
import { updateProfile } from "../features/user/userSlice";
import { FiEdit } from "react-icons/fi";
const profileSchema = yup.object({
  firstName: yup.string().required("Cần nhập tên"),
  lastName: yup.string().required("Cần nhập họ"),
  email: yup.string().email("Email cần hợp lệ").required("Cần email"),
  mobile: yup.number().required("Cần số điện thoại"),
});
const Profile = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state?.auth?.user);
  const [edit, setEdit] = useState(true);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: userState?.firstname,
      lastName: userState?.lastname,
      email: userState?.email,
      mobile: userState?.mobile,
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispatch(updateProfile(values));
      setEdit(true);
    },
  });
  return (
    <>
      <Meta title={"Thông tin cá nhân"} />
      <BreadCrumb title="Thông tin cá nhân" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="my-3">Cập nhật thông tin cá nhân</h3>
              <FiEdit
                className="fs-3"
                onClick={() => {
                  setEdit(false);
                }}
              />
            </div>
          </div>
          <div className="col-12">
            <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
              <div class="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập tên"
                  name="firstName"
                  disabled={edit}
                  onChange={formik.handleChange("firstName")}
                  onBlur={formik.handleBlur("firstName")}
                  value={formik.values.firstName}
                />
                <div className="errors">{formik.touched.firstName && formik.errors.firstName}</div>
              </div>
              <div class="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập họ"
                  name="lastName"
                  disabled={edit}
                  onChange={formik.handleChange("lastName")}
                  onBlur={formik.handleBlur("lastName")}
                  value={formik.values.lastName}
                />
                <div className="errors">{formik.touched.lastName && formik.errors.lastName}</div>
              </div>
              <div class="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập email"
                  name="email"
                  disabled={edit}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  value={formik.values.email}
                />
                <div className="errors">{formik.touched.email && formik.errors.email}</div>
              </div>
              <div class="form-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Nhập số điện thoại"
                  name="mobile"
                  disabled={edit}
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                  value={formik.values.mobile}
                />
                <div className="errors">{formik.touched.mobile && formik.errors.mobile}</div>
              </div>
              {edit === false && (
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              )}
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
