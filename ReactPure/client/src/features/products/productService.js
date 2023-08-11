import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async (data) => {
  const response = await axios.get(
    `${base_url}product?${data?.brand ? `brand=${data?.brand}` : ""}${data?.tags ? `tags=${data?.tags}` : ""}${
      data?.category ? `category=${data?.category}` : ""
    }${data?.minPrice ? `price[gte]=${data?.minPrice}` : ""}${data?.maxPrice ? `price[lte]=${data?.maxPrice}` : ""}${
      data?.sort ? `sort=${data?.sort}` : ""
    }`
  );
  if (response.data) {
    return response.data;
  }
};

const getSingleProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);
  if (response.data) {
    return response.data;
  }
};

const addToWishList = async (data) => {
  const response = await axios.put(`${base_url}product/wishlist`, { prodId: data.id }, data?.config2);
  if (response.data) {
    return response.data;
  }
};
const rateProduct = async (data) => {
  const response = await axios.put(`${base_url}product/rating`, data, config);
  if (response.data) {
    return response.data;
  }
};
export const productService = {
  getProducts,
  addToWishList,
  getSingleProduct,
  rateProduct,
};
