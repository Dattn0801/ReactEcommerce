import React, { useState, useEffect } from "react";
import { fetchProductsByFilter, getProductByCount } from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider } from "antd";
import { DollarOutlined } from "@ant-design/icons";
const { SubMenu, ItemGroup } = Menu;
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  let dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  useEffect(() => {
    loadAllProducts();
  }, []);
  // 1 load product by default
  const loadAllProducts = () => {
    getProductByCount(12).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  // 2 load product by search input
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

  // 3. load by price
  useEffect(() => {
    console.log("ok to request");
    fetchProducts({ price });
  }, [ok]);
  const handleSlider = (value) => {
    // clear search text
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice(value);
    //delay
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 pt-2">
            <h4>Search/filter</h4>
            <Menu defaultOpenKeys={["1", "2"]} mode="inline">
              <SubMenu
                key="1"
                title={
                  <span className="h6">
                    <DollarOutlined style={{ paddingTop: "10px" }} />
                    Tìm theo giá
                  </span>
                }
              >
                <div>
                  <Slider
                    className="ml-4 mr-4"
                    tipFormatter={(v) => `${v} vnđ`}
                    range
                    value={price}
                    onChange={handleSlider}
                    step={100000}
                    marks
                    max="100000000"
                  />
                </div>
              </SubMenu>
            </Menu>
          </div>
          <div className="col-md-9 pt-2">
            {loading ? (
              <h4 className="text-danger">loading...</h4>
            ) : (
              <h4 className="text-danger">Sản phẩm</h4>
            )}
            {products && products.length < 1 && (
              <p> Không tìm thấy sản phẩm với từ khóa {text}</p>
            )}
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
