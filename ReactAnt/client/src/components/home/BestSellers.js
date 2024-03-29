import React, { useEffect, useState } from "react";
import { getProductCount, getProducts } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";
import showAverage from "../../functions/rating";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productCount, setProductCount] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    loadAllProducts();
  }, [page]);
  useEffect(() => {
    getProductCount().then((res) => setProductCount(res.data));
  }, []);
  const loadAllProducts = async () => {
    setLoading(true);
    getProducts("sold", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };
  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={4} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-2 p-3">
          <Pagination
            current={page}
            total={(productCount / 4) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};
export default BestSellers;
