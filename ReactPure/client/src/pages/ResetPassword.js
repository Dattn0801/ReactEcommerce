import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { resetPassWord } from "../features/user/userSlice";

let passwordSchema = yup.object().shape({
  password: yup.string().required("Cần mật khẩu"),
  //confpassword: yup.string().required("Cần xác nhận mật khẩu"),
});
const Resetpassword = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const tokenReset = location.pathname.split("/")[2];
  const formik = useFormik({
    initialValues: {
      password: "",
      //confpassword: "",
    },
    validationSchema: passwordSchema,
    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));
      dispatch(resetPassWord({ token: tokenReset, password: values?.password }));
    },
  });
  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title="Reset Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Password</h3>
              <form onSubmit={formik.handleSubmit} action="" className="d-flex flex-column gap-15">
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                />
                <div className="errors mt-2">{formik.touched.password && formik.errors.password}</div>
                {/* <CustomInput
                  type="password"
                  name="confpassword"
                  placeholder="Confirm Password"
                  value={formik.values.confpassword}
                  onChange={formik.handleChange("confpassword")}
                  onBlur={formik.handleBlur("confpassword")}
                />
                <div className="errors mt-2">{formik.touched.confpassword && formik.errors.confpassword}</div> */}
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0">Ok</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Resetpassword;
