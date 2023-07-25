import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import cross from "../images/cross.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/laptop.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getUserWislist } from "../features/user/userSlice";
import { addToWishList } from "../features/products/productSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getWishList();
  }, []);
  const getWishList = () => {
    dispatch(getUserWislist());
  };
  const removeFromWishList = (id) => {
    dispatch(addToWishList(id));
    setTimeout(() => {
      dispatch(getUserWislist());
    }, 300);
  };
  const wishlistState = useSelector((state) => state.auth?.wishlist?.wishlist);
  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {wishlistState?.length === 0 && (
            <div className="text-center fs-3"> No data</div>
          )}
          {wishlistState?.map((item, index) => {
            return (
              <div className="col-3" key={index}>
                <div className="wishlist-card position-relative">
                  <img
                    src={cross}
                    alt="cross"
                    className="position-absolute cross img-fluid"
                    onClick={() => removeFromWishList(item._id)}
                  />
                  <div className="wishlist-card-image">
                    <img
                      src={
                        item?.images[0].url
                          ? item?.images[0].url
                          : "images/watch.jpg"
                      }
                      className="img-fluid w-100 d-block mx-auto"
                      alt="watch"
                      width={160}
                    />
                  </div>
                  <div className="py-3 px-3">
                    <h5 className="title">
                      Honor T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wi-Fi+3G Tablet
                    </h5>
                    <h6 className="price">$ 100</h6>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
