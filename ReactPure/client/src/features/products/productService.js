import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product`);
  return response.data;
};

const addToWishList = async () => {
  const response = await axios.put(`${base_url}product`);
  return response.data; 
}
export const productService = {
  getProducts,addToWishList
};
