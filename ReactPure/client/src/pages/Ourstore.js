import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Container from "../components/Container";
import ProductCard from "../components/ProductCard";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Color from "../components/Color";

//img
import img from "../images/watch.jpg";
import img2 from "../images/headphone.jpg";
import gr1 from "../images/gr.svg";
import gr2 from "../images/gr2.svg";
import gr3 from "../images/gr3.svg";
import gr4 from "../images/gr4.svg";
import { getAllProducts } from "../features/products/productSlice";

const Ourstore = () => {
  const dispatch = useDispatch();
  const [grid, setGrid] = useState(4);
  const [tags, setTags] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const productsState = useSelector((state) => state?.product?.product);

  //filter
  const [tag, setTag] = useState(null);
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);
  console.log(sort);
  useEffect(() => {
    let newTags = [];
    let newBrands = [];
    let newCategory = [];

    for (let index = 0; index < productsState?.length; index++) {
      const element = productsState[index];
      newBrands.push(element?.brand);
      newCategory.push(element?.category);
      newTags.push(element?.tags);
    }
    setTags(newTags);
    setBrands(newBrands);
    setCategories(newCategory);
  }, [productsState]);
  //console.log([...new Set(brands)], [...new Set(categories)], [...new Set(tags)]);
  useEffect(() => {
    getProducts();
  }, [sort, tag, brand, category, minPrice, maxPrice]);
  const getProducts = () => {
    dispatch(getAllProducts({ sort, tag, brand, category, minPrice, maxPrice }));
  };
  return (
    <>
      <Meta title={"Cửa hàng"} />
      <BreadCrumb title="Sản phẩm" />
      <div className="store-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title"> Danh mục</h3>
                <ul className="ps-0">
                  {categories &&
                    [...new Set(categories)].map((item, index) => {
                      return (
                        <li key={index} onClick={() => setCategory(item)}>
                          {item}
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title"> Filter by</h3>
                <div>
                  <h5 className="sub-title">Availablity</h5>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="" />
                    <label className="form-check-label" htmlFor="">
                      In Stock (1)
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="" />
                    <label className="form-check-label" htmlFor="">
                      Out of Stock(0)
                    </label>
                  </div>
                </div>
                <h5 className="sub-title">Giá</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Từ"
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="Đến"
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput1">To</label>
                  </div>
                </div>
                {/* <h5 className="sub-title">Colors</h5>
                <div>
                  <Color />
                </div> */}
                <h5 className="sub-title">Size</h5>
                <div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="color-1" />
                    <label className="form-check-label" htmlFor="color-1">
                      S (2)
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="color-2" />
                    <label className="form-check-label" htmlFor="color-2">
                      M (2)
                    </label>
                  </div>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Thương hiệu</h3>
                <div>
                  <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                    {brands &&
                      [...new Set(brands)].map((item, index) => {
                        return (
                          <span
                            onClick={() => {
                              setBrand(item);
                            }}
                            className="badge bg-light text-secondary rounded-3 py-2 px-3"
                          >
                            {item}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Tags</h3>
                <div>
                  <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                    {categories &&
                      [...new Set(categories)].map((item, index) => {
                        return (
                          <span
                            onClick={() => {
                              setTag(item);
                            }}
                            className="badge bg-light text-secondary rounded-3 py-2 px-3"
                          >
                            {item}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Random Product</h3>
                <div>
                  <div className="random-products mb-3 d-flex">
                    <div className="w-50">
                      <img src={img2} className="img-fluid" alt="watch" />
                    </div>
                    <div className="w-50">
                      <h5>Kids headphones bulk 10 pack multi colored for students</h5>
                      <ReactStars count={5} size={24} value={4} edit={false} activeColor="#ffd700" />
                      <b>$ 300</b>
                    </div>
                  </div>
                  <div className="random-products d-flex">
                    <div className="w-50">
                      <img src={img} className="img-fluid" alt="watch" />
                    </div>
                    <div className="w-50">
                      <h5>Kids headphones bulk 10 pack multi colored for students</h5>
                      <ReactStars count={5} size={24} value={4} edit={false} activeColor="#ffd700" />
                      <b>$ 300</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="filter-sort-grid mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10">
                    <p className="mb-0 d-block" style={{ width: "100px" }}>
                      Sắp xếp:
                    </p>
                    <select
                      onChange={(e) => setSort(e.target.value)}
                      name=""
                      defaultValue={"manula"}
                      className="form-control form-select"
                      id=""
                    >
                      <option value="-title">Tên từ A-Z</option>
                      <option value="title">Tên từ Z-A</option>
                      <option value="price">Giá thấp đến cao</option>
                      <option value="-price">Giá cao đến thấp </option>
                      <option value="createAt">Ngày đăng cũ -mới</option>
                      <option value="-createAt">Ngày đăng mới- cũ</option>
                    </select>
                  </div>
                  <div className="d-flex align-items-center gap-10">
                    <p className="totalproducts mb-0">21 Products</p>
                    <div className="d-flex gap-10 align-items-center grid">
                      <img
                        onClick={() => {
                          setGrid(3);
                        }}
                        src={gr4}
                        className="d-block img-fluid"
                        alt="grid"
                      />
                      <img
                        onClick={() => {
                          setGrid(4);
                        }}
                        src={gr3}
                        className="d-block img-fluid"
                        alt="grid"
                      />
                      <img
                        onClick={() => {
                          setGrid(6);
                        }}
                        src={gr2}
                        className="d-block img-fluid"
                        alt="grid"
                      />

                      <img
                        onClick={() => {
                          setGrid(12);
                        }}
                        src={gr1}
                        className="d-block img-fluid"
                        alt="grid"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="products-list pb-5">
                <div className="d-flex gap-10 flex-wrap">
                  <ProductCard data={productsState ? productsState : []} grid={grid} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ourstore;
