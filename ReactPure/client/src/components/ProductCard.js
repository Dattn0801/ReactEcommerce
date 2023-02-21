import React from "react";

import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
//img
import productimg from "../images/watch.jpg";
import productimg1 from "../images/watch-1.avif";
import AddImg from "../images/add-cart.svg";
import ViewImg from "../images/view.svg";
import CompareImg from "../images/prodcompare.svg";
import Wishlist from "../images/wish.svg";
const ProductCard = () => {
  return (
    <div className="col-3">
      <div className="product-card position-relative">
        <div className="wishlist-icon position-absolute">
          <Link>
            <img src={Wishlist} alt="wishlist" />
          </Link>
        </div>
        <div className="product-image">
          <img src={productimg} className="img-fluid" alt="product image" />
          <img src={productimg1} className="img-fluid" alt="product image" />
        </div>
        <div className="product-details">
          <h6 className="brand">Havels</h6>
          <h5 className="product-title">
            Kids headphones bulk 10 pack multi colored for students
          </h5>
          <ReactStars
            count={5}
            size={24}
            value={4}
            edit={false}
            activeColor="#ffd700"
          />
          <p className="description">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt...
          </p>
          <p className="price">$100.00</p>
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
};
export default ProductCard;