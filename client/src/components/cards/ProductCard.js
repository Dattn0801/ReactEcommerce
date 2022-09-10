import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import showAverage from "../../functions/rating";
import _ from "lodash";
import { toast } from "react-toastify";
const { Meta } = Card;

const ProductCard = ({ product }) => {
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
      toast.success(`${product.title} đã thêm vào giỏ`);
    }
  };
  //destructure
  const { title, description, images, slug, ratings, price } = product;
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
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart}>
              <ShoppingCartOutlined className="text-danger" />
              <br />
              Thêm vào giỏ
            </a>
            ,
          </Tooltip>,
        ]}
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 40)}...`}
        />
        <div className="pt-1">
          <h6 className="text-danger">{`${price} vnđ`}</h6>
        </div>

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
