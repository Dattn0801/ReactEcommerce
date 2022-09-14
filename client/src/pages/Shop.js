import React, { useState, useEffect } from "react";
import { fetchProductsByFilter, getProductByCount } from "../functions/product";
import { getSubs } from "../functions/sub";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  StarOutlined,
  DollarOutlined,
  DownSquareOutlined,
} from "@ant-design/icons";
import { getCategories } from "../functions/category";
import Star from "../components/forms/Star";
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
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [brands, setBrands] = useState([
    "Apple",
    "Samsung",
    "Microsoft",
    "Lenovo",
    "ASUS",
  ]);
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState([
    "Black",
    "Brown",
    "Silver",
    "White",
    "Blue",
  ]);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");

  useEffect(() => {
    loadAllProducts();
    loadAllCategories();
    loadAllSubs();
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
  const loadAllSubs = () => {
    getSubs().then((res) => setSubs(res.data));
  };
  // 2 load product by search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) loadAllProducts();
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load by price
  useEffect(() => {
    console.log("ok to request");
    fetchProducts({ price });
  }, [ok]);
  const handleSlider = (value) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setStar("");
    setPrice(value);
    setSub("");
    setBrand("");
    setColor("");
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
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");

    //
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

  // 5. Show products by star ratings
  const handleStarClick = (num) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setSub("");
    setBrand("");
    setColor("");
    //fetch
    setStar(num);
    fetchProducts({ stars: num });
  };
  const showStar = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  // 6. Load  product by subs categories

  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));
  const handleSub = (sub) => {
    //console.log("sub", s);
    setSub(sub);
    //reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");

    //fetproduct
    fetchProducts({ sub }); //sub:sub
  };

  //7. show product by brand
  const showBrand = () =>
    brands.map((b) => (
      <>
        <Radio
          className="pb-1 pl-4 pr-4"
          value={b}
          name={b}
          checked={b === brand}
          onChange={handleBrand}
        >
          {b}
        </Radio>
        <br />
      </>
    ));
  const handleBrand = (e) => {
    //reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setSub("");
    setColor("");
    //fetch
    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };
  //8. show product by brand
  const showColor = () =>
    colors.map((c) => (
      <>
        <Radio
          className="pb-1 pl-4 pr-4"
          value={c}
          name={c}
          checked={c === color}
          onChange={handleColor}
        >
          {c}
        </Radio>
        <br />
      </>
    ));
  const handleColor = (e) => {
    //reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setSub("");
    setBrand("");
    //fetch
    setColor(e.target.value);
    fetchProducts({ color: e.target.value });
  };

  const showShipping = () => (
    <>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingChange}
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingChange}
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </>
  );
  const handleShippingChange = (e) => {
    //reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    //fetch
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 pt-2">
            <h4>Search/filter</h4>
            <Menu
              defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
              mode="inline"
            >
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
              {/*sao*/}
              <SubMenu
                key="3"
                title={
                  <span className="h6">
                    <StarOutlined />
                    Đánh giá
                  </span>
                }
              >
                <div>{showStar()}</div>
              </SubMenu>
              {/*danh mục con*/}
              <SubMenu
                key="4"
                title={
                  <span className="h6">
                    <DownSquareOutlined style={{ paddingTop: "10px" }} />
                    Danh mục con
                  </span>
                }
              >
                <div className="pl-4 pr-4">{showSubs()}</div>
              </SubMenu>
              {/*Thương hiệu*/}
              <SubMenu
                key="5"
                title={
                  <span className="h6">
                    <DownSquareOutlined style={{ paddingTop: "10px" }} />
                    Thương hiệu
                  </span>
                }
              >
                <div className="pr-4">{showBrand()}</div>
              </SubMenu>
              {/*Thương hiệu*/}
              <SubMenu
                key="6"
                title={
                  <span className="h6">
                    <DownSquareOutlined style={{ paddingTop: "10px" }} />
                    Màu
                  </span>
                }
              >
                <div className="pr-4">{showColor()}</div>
              </SubMenu>
              {/*Thương hiệu*/}
              <SubMenu
                key="7"
                title={
                  <span className="h6">
                    <DownSquareOutlined style={{ paddingTop: "10px" }} />
                    Shipping
                  </span>
                }
              >
                <div className="pr-4">{showShipping()}</div>
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
              <p> Không tìm thấy sản phẩm {text}</p>
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
