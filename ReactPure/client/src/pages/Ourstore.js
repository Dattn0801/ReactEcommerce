import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import { Helmet } from "react-helmet";
const Ourstore = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sản phẩm</title>
      </Helmet>
      <BreadCrumb title="Sản phẩm" />
    </>
  );
};

export default Ourstore;
