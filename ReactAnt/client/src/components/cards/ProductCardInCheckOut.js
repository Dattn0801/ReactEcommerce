import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalImage from "react-modal-image";
import { toast } from "react-toastify";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
const ProductCardInCheckOut = ({ p }) => {
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  const dispatch = useDispatch();

  const handleColorChange = (e) => {
    console.log("color", e.target.value);
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        // duyet ptu trong cart
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
      });
      //
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };
  const handleQuantityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;
    if (count > p.quantity) {
      toast.error(`chỉ còn ${p.quantity}`);
      return;
    }
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = count;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };
  const handleRemove = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        // remove index
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });
      //
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };
  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "100px", height: "auto" }}>
            {p.images.length ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            ) : (
              <p>no img</p>
            )}
          </div>
        </td>
        <td>{p.title}</td>
        <td>{p.price}</td>
        <td>{p.brand}</td>
        <td>
          <select
            onChange={handleColorChange}
            style={{ width: "75px" }}
            name="color"
            className="form-control"
          >
            {p.color ? (
              <option value={p.color}>{p.color}</option>
            ) : (
              <option>Select</option>
            )}
            {colors
              .filter((c) => c !== p.color)
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td>
          <input
            style={{ width: "60px" }}
            type="number"
            className="form-control"
            value={p.count}
            onChange={handleQuantityChange}
          />
        </td>
        <td className="text-center">
          {p.shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success " />
          ) : (
            <CloseCircleOutlined className="text-danger " />
          )}
        </td>
        <td className="text-center">
          <CloseCircleOutlined
            onClick={handleRemove}
            className="text-danger pointer"
          />
        </td>
      </tr>
    </tbody>
  );
};
export default ProductCardInCheckOut;
