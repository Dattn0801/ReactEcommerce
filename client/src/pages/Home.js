import React, { useEffect, useState } from "react";
import { getProductByCount } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = async () => {
    setLoading(true);
    getProductByCount(4).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };
  return (
    <>
      <div className="jumbotron">
        {loading ? <h4>Loading...</h4> : <h4>Tất cả sản phẩm</h4>}
      </div>
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;
