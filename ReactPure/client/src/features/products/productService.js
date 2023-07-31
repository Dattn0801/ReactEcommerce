import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product`);
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

const addToWishList = async (prodId) => {
  const response = await axios.put(
    `${base_url}product/wishlist`,
    {
      prodId,
    },
    config
  );
  if (response.data) {
    return response.data;
  }
};
export const productService = {
  getProducts,
  addToWishList,
  getSingleProduct,
};
