import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList } from "../features/products/productSlice";
//img
import productimg from "../images/watch.jpg";
import productimg1 from "../images/watch-1.avif";
import AddImg from "../images/add-cart.svg";
import ViewImg from "../images/view.svg";
import CompareImg from "../images/prodcompare.svg";
import Wishlist from "../images/wish.svg";

const ProductCard = (props) => {
  const { grid, data } = props;

  let location = useLocation();
  const dispatch = useDispatch();
  
  const addToWish = (id) => {
    dispatch(addToWishList(id));
  };
  return (
    <>
      {data?.map((item, index) => {
        return (
          <div
            key={index}
            className={` ${
              location.pathname == "/product" ? `gr-${grid}` : "col-3"
            } `}
          >
            <div className="product-card position-relative">
              <div className="wishlist-icon position-absolute">
                <button
                  className="border-0 bg-transparent"
                  onClick={(e) => {
                    addToWish(item?._id);
                  }}
                >
                  <img src={Wishlist} alt="wishlist" />
                </button>
              </div>
              <div className="product-image">
                <img
                  src={item?.images[0]?.url}
                  className="img-fluid mx-auto"
                  alt="product image"
                />
                <img
                  src={item?.images[1]?.url}
                  className="img-fluid mx-auto"
                  alt="product image"
                />
              </div>
              <div className="product-details pt-2">
                <h6 className="brand">{item?.brand}</h6>
                <h5 className="product-title">{item?.title}</h5>
                <ReactStars
                  count={5}
                  size={24}
                  value={item?.totalrating.toString()}
                  edit={false}
                  activeColor="#ffd700"
                />
                <p
                  className={`description ${
                    grid === 12 ? "d-block" : "d-none"
                  }`}
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></p>
                <p className="price">{item.price}</p>
              </div>
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  <Link>
                    <img src={CompareImg} alt="compare" />
                  </Link>
                  <Link>
                    <img src={ViewImg} alt="view" />
                  </Link>
                  <Link>
                    <img src={AddImg} alt="addcart" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default ProductCard;
