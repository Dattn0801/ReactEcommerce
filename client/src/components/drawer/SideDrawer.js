import React from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));
  const imagesStyle = {
    width: "70px",
    height: "70px",
    objectFit: "cover",
  };
  return (
    <Drawer
      className="text-center"
      title={`Cart ${cart.length} sản phẩm`}
      placement="right"
      closable={false}
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
      visible={drawer}
    >
      {cart.map((p) => (
        <div key={p._id} className="row">
          <div className="col">
            {p.images[0] ? (
              <>
                <div>
                  <img src={p.images[0].url} style={imagesStyle} />
                  <p className="text-center ">
                    {p.title} x {p.count}
                  </p>
                  <br />
                </div>
              </>
            ) : (
              <>
                <p>no img</p>
                <p className="text-center ">
                  {p.title} x {p.count}
                </p>
              </>
            )}
          </div>
        </div>
      ))}
      <Link to="/cart">
        <button
          onClick={() =>
            dispatch({
              type: "SET_VISIBLE",
              payload: false,
            })
          }
          className="text-center btn btn-primary btn-raised btn-block"
        >
          {" "}
          Giỏ hàng{" "}
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
