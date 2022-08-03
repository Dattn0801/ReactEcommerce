import React, { useEffect, useState } from "react";
import { getProducts } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import LoadingCard from "../components/cards/LoadingCard";
import NewArrival from "../components/home/NewArrival";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = async () => {
    setLoading(true);
    getProducts("createdAt", "desc", 4).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };
  return (
    <>
      <div className="jumbotron">
        {loading ? <h4>Loading...</h4> : <h4>Tất cả sản phẩm</h4>}
      </div>
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        New Arrivals
      </h4>
      <NewArrival />
    </>
  );
};
export default Home;
