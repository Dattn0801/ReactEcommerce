import React, { useEffect, useState } from "react";
import { getProduct, productStart } from "../functions/product";
import { useParams } from "react-router-dom";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";

const Product = () => {
  const [product, setProduct] = useState({});
  const [star, setStart] = useState(0);
  //redux
  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = useParams();
  useEffect(() => {
    loadSingleProduct();
  }, [slug]);
  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (element) => element.postedBy?.toString() === user.postedBy?.toString()
      );
      // current user star
      existingRatingObject && setStart(existingRatingObject);
    }
  });
  const onStarClick = (newRating, name) => {
    setStart(newRating);
    // name is productId
    productStart(name, star, user.token).then((res) => {
      console.log("rating click", res.data);
      loadSingleProduct(); // show updated rating real time
    });
  };
  const loadSingleProduct = () => {
    getProduct(slug).then((res) => setProduct(res.data));
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row pt-4">
          <SingleProduct
            product={product}
            onStarClick={onStarClick}
            star={star}
          />
        </div>
        <div className="row">
          <div className="col text-center pt-5 pb-5">
            <hr />
            <h4>Sản phẩm liên quan</h4>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
