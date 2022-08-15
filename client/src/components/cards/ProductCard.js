import React from "react";
import { Card, Skeleton } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import showAverage from "../../functions/rating";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  //destructure
  const { title, description, images, slug, ratings } = product;
  return (
    <>
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : ""}
            style={{ height: "200px", objectFit: "cover" }}
            className={"p-1"}
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" />
            <br />
            Xem sản phẩm
          </Link>,
          <>
            <ShoppingCartOutlined className="text-danger" />
            <br />
            Thêm vào giỏ
          </>,
        ]}
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 40)}...`}
        />
        {ratings && ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-left pt-1">Hiện tại chưa có đánh giá</div>
        )}
      </Card>
      <br />
    </>
  );
};
export default ProductCard;
