import React, { useState } from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductDetail from "./ProductDetail";
import StarRatings from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import showAverage from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

const { Meta } = Card;
const { TabPane } = Tabs;
const SingleProduct = ({ product, onStarClick, star }) => {
  const { _id, title, description, images, slug, quantity } = product;
  const [tooltip, setTooltip] = useState("Click to add");
  //redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    //create card array
    let cart = [];
    //window object available
    if (typeof window !== "undefined") {
      // if cart in local storage
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      //remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      //save to local storage
      localStorage.setItem("cart", JSON.stringify(unique));
      setTooltip("Added");

      //add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      //toast.success(`${product.title} đã thêm vào giỏ`);

      //show cart in drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };
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
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">Hiện tại chưa có đánh giá</div>
        )}
        <Card
          actions={[
            quantity < 1 ? (
              <a>
                <ShoppingCartOutlined className="text-danger" />
                <br />
                Hết hàng
              </a>
            ) : (
              <a onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-danger" />
                <br />
                Thêm vào giỏ
              </a>
            ),
            <Link to="/">
              <HeartOutlined className="text-info" />
              <br />
              Add to wishlist
            </Link>,
            <RatingModal>
              <StarRatings
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRateColor="red"
              />
            </RatingModal>,
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
