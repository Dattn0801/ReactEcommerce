import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductDetail from "./ProductDetail";
const { Meta } = Card;
const { TabPane } = Tabs;
const SingleProduct = ({ product }) => {
  const { title, description, images, slug } = product;
  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          "No img"
        )}
        <Tabs type="card">
          <TabPane tab="Mô tả" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="Xem thêm" key="2">
            ádasdasdasfdqsaaaaaaaaaaaaaaaaaaaaaaa
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
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
          <ProductDetail product={product} />
        </Card>
      </div>
    </>
  );
};
export default SingleProduct;
