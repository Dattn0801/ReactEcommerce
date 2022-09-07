import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalImage from "react-modal-image";

const ProductCardInCheckOut = ({ p }) => {
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  const dispatch = useDispatch();

  const handleColorChange = (e) => {
    //console.log("color", e.target.value);
    // let cart = [];
    // if (typeof window !== "undefined") {
    //   if (localStorage.getItem("cart")) {
    //     cart = JSON.parse(localStorage.getItem("cart"));
    //   }
    //   cart.map((product, i) => {
    //     // duyet ptu trong cart
    //     if (product._id === p._id) {
    //       cart[i] = e.target.value;
    //     }
    //   });
    //   //
    //   localStorage.setItem("cart", JSON.stringify(cart));
    //   dispatch({
    //     type: "ADD_TO_CART",
    //     payload: cart,
    //   });
    // }
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
            name="color"
            className="form-control"
          >
            {p.color ? (
              <option value={p.color}>{p.color}</option>
            ) : (
              <option>Chọn</option>
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
        <td>{p.count}</td>
        <td>icon</td>
      </tr>
    </tbody>
  );
};
export default ProductCardInCheckOut;
