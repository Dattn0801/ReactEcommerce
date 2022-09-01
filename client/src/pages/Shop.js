import React, { useState, useEffect } from "react";
import { fetchProductsByFilter, getProductByCount } from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Checkbox } from "antd";
import { DollarOutlined, DownSquareOutlined } from "@ant-design/icons";
import { getCategories } from "../functions/category";
const { SubMenu, ItemGroup } = Menu;
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  let dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  useEffect(() => {
    loadAllProducts();
    loadAllCategories();
  }, []);
  // 1 load product by default
  const loadAllProducts = () => {
    getProductByCount(12).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };
  const loadAllCategories = () => {
    getCategories().then((res) => setCategories(res.data));
  };
  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 2 load product by search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

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
    setCategoryIds([]);
    setPrice(value);
    //delay
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // 4. Load  product by categories
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  //handleCheck categories
  const handleCheck = (e) => {
    // clear search text
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    // clear price
    setPrice([0, 0]);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // nếu có return index ko có return -1

    // index of method if not return -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // xóa index, số lượng 1
      inTheState.splice(foundInTheState, 1);
    }
    setCategoryIds(inTheState);
    //console.log(inTheState);
    fetchProducts({ category: inTheState });
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 pt-2">
            <h4>Search/filter</h4>
            <Menu defaultOpenKeys={["1", "2"]} mode="inline">
              {/* giá*/}
              <SubMenu
                key="1"
                title={
                  <span className="h6">
                    <DollarOutlined style={{ paddingTop: "10px" }} />
                    Giá
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

              {/*danh mục*/}
              <SubMenu
                key="2"
                title={
                  <span className="h6">
                    <DownSquareOutlined style={{ paddingTop: "10px" }} />
                    Danh mục
                  </span>
                }
              >
                <div>{showCategories()}</div>
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
