import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Meta } = Card;
const SingleProduct = ({ product }) => {
  const { title, description, image, slug } = product;
  return (
    <>
      <div className="col-md-7">img</div>
      <div className="col-md-5">
        <Card
          actions={[
            <>
              <ShoppingCartOutlined />
              <br />
              Thêm vào giỏ
            </>,
            <Link to="/">
              <HeartOutlined className="text-info" />
              <br />
              Add to wishlist
            </Link>,
          ]}
        >
          <Meta title={title} description={description}></Meta>
          <p></p>
        </Card>
      </div>
    </>
  );
};
export default SingleProduct;
