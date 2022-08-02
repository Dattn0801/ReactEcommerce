import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductByCount } from "../../../functions/product";
import AdminProduct from "../../../components/cards/AdminProductCard";
import { removeProduct } from "../../../functions/product";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    loadAllProducts();
  }, []);
  const loadAllProducts = () => {
    setLoading(true);
    getProductByCount(100)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const handleRemove = (slug) => {
    let answer = window.confirm("Delete ?");
    if (answer) {
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.success(`${res.data.title} is delete`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.err(err.response.data);
          console.log(err);
        });
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>

          <div className="col">
            {loading ? (
              <h4 className="text-danger">Loading...</h4>
            ) : (
              <h4>Tất cả sảm phẩm</h4>
            )}
            <div className="row">
              {products.map((product) => (
                <div key={product._id} className="col-md-4 pb-2">
                  <AdminProduct product={product} handleRemove={handleRemove} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductList;
