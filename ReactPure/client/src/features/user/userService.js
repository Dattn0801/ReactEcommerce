import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const register = async (userData) => {
  const response = await axios.post(`${base_url}user/register`, userData);
  return response.data;
};
const login = async (userData) => {
  const response = await axios.post(`${base_url}user/login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    console.log(response.data);
  }
  return response.data;
};
const getUserWislist = async () => {
  const response = await axios.get(`${base_url}user/wishlist`, config);
  if (response.data) {
    return response.data;
  }
};
export const authService = {
  register,
  login,
  getUserWislist,
};
