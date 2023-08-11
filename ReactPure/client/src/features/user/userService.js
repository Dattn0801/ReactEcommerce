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
  }
  return response.data;
};
const getUserWislist = async (config2) => {
  const response = await axios.get(`${base_url}user/wishlist`, config2);
  if (response.data) {
    return response.data;
  }
};
const addToCart = async (cartData) => {
  const response = await axios.post(`${base_url}user/cart`, cartData, config);
  if (response.data) {
    return response.data;
  }
};
const getCart = async (config2) => {
  const response = await axios.get(`${base_url}user/cart`, config2);
  if (response.data) {
    return response.data;
  }
};
const removeProductFromCart = async (data) => {
  const response = await axios.delete(`${base_url}user/delete-product-cart/${data?.id}`, data?.config2);
  if (response.data) {
    return response.data;
  }
};

const updateProductFromCart = async (cartDetail) => {
  const response = await axios.delete(
    `${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`,
    cartDetail.config2
  );
  if (response.data) {
    return response.data;
  }
};

const createOrder = async (orderDetail) => {
  const response = await axios.post(`${base_url}user/cart/create-order`, orderDetail, config);
  if (response.data) {
    return response.data;
  }
};

const userOrders = async (config2) => {
  const response = await axios.get(`${base_url}user/get-myorders`, config2);
  if (response.data) {
    return response.data;
  }
};
const updateUser = async (data) => {
  const response = await axios.put(`${base_url}user/edit-user`, data?.data, data?.config2);
  if (response.data) {
    return response.data;
  }
};
const forgotPassToken = async (data) => {
  const response = await axios.post(`${base_url}user/forgot-password-token`, data);
  if (response.data) {
    return response.data;
  }
};
const resetPass = async (data) => {
  const response = await axios.put(`${base_url}user/reset-password/${data?.token}`, { password: data?.password }, data);
  if (response.data) {
    return response.data;
  }
};
const emtyCart = async (config2) => {
  const response = await axios.delete(`${base_url}user/empty-cart`, config2);
  if (response.data) {
    return response.data;
  }
};
export const authService = {
  register,
  login,
  getUserWislist,
  addToCart,
  getCart,
  removeProductFromCart,
  updateProductFromCart,
  createOrder,
  userOrders,
  updateUser,
  forgotPassToken,
  resetPass,
  emtyCart,
};
