import React, { useEffect, useState } from "react";
import { getProducts } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import LoadingCard from "../components/cards/LoadingCard";
import NewArrival from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
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
        Sản phẩm mới
      </h4>
      <NewArrival />
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Sản phẩm bán chạy
      </h4>
      <BestSellers />

      <CategoryList />
    </>
  );
};
export default Home;
