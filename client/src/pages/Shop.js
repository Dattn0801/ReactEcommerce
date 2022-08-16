import React, { useState, useEffect } from "react";
import { fetchProductsByFilter, getProductByCount } from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  useEffect(() => {
    loadAllProducts();
  }, []);
  // load product by default
  const loadAllProducts = () => {
    getProductByCount(12).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  //load product by search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);
  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3"> search filter menu</div>
          <div className="col-md-9">
            {loading ? (
              <h4 className="text-danger">loading...</h4>
            ) : (
              <h4 className="text-danger">Sản phẩm</h4>
            )}
            {products && products.length < 1 && <p> Không tìm thấy sản phẩm với từ khóa {text}</p>}
            <div className="row">
              {products.map((p) => (
                <div key={p._id} className="col-md-3">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
