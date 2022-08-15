import React from "react";
import { Link } from "react-router-dom";
const ProductDetail = ({ product }) => {
  const { price, category, subs, shipping, color, brand, quantity, sold } =
    product;
  return (
    <>
      <ul className="list-group">
        <li className="list-group-item">
          Giá{" "}
          <span className="label label-default label-pill pull-xs-right">
            ${price}
          </span>
        </li>
        {category && (
          <li className="list-group-item">
            Danh mục{" "}
            <Link
              to={`/category/${category.slug}`}
              className="label label-default label-pill pull-xs-right"
            >
              {category.name}
            </Link>
          </li>
        )}
        {subs && (
          <li className="list-group-item">
            Danh mục con{" "}
            {subs.map((s) => (
              <Link
                to={`/sub/${s.slug}`}
                key={s._id}
                className="label label-default label-pill pull-xs-right"
              >
                {s.name}
              </Link>
            ))}
          </li>
        )}
        <li className="list-group-item">
          Còn sẵn{" "}
          <span className="label label-default label-pill pull-xs-right">
            ${quantity}
          </span>
        </li>
        <li className="list-group-item">
          Ship{" "}
          <span className="label label-default label-pill pull-xs-right">
            {shipping}
          </span>
        </li>
        <li className="list-group-item">
          Màu{" "}
          <span className="label label-default label-pill pull-xs-right">
            {color}
          </span>
        </li>
        <li className="list-group-item">
          Nhãn hiệu{" "}
          <span className="label label-default label-pill pull-xs-right">
            {brand}
          </span>
        </li>
        <li className="list-group-item">
          Đã bán{" "}
          <span className="label label-default label-pill pull-xs-right">
            {sold}
          </span>
        </li>
      </ul>
    </>
  );
};
export default ProductDetail;
