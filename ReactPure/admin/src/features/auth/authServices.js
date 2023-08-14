import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
  return;
};
const getOrders = async (config2) => {
  const response = await axios.get(`${base_url}user/getallorders`, config2);
  return response.data;
};
const getOrder = async (data) => {
  const response = await axios.get(`${base_url}user/getoneorder/${data?._id}`, data?.config2);
  return response.data;
};
const updateOrder = async (data) => {
  console.log(data);
  const response = await axios.put(`${base_url}user/updateOrder/${data?.id}`, { status: data?.status }, data?.config2);
  return response.data;
};
const getMonthlyData = async (config2) => {
  const response = await axios.get(`${base_url}user/getmonthlyorders`, config2);
  return response.data;
};
const getYearlyData = async (config2) => {
  const response = await axios.get(`${base_url}user/getyearlyorders`, config2);
  return response.data;
};

const authService = {
  login,
  logout,
  getOrders,
  getOrder,
  updateOrder,
  getMonthlyData,
  getYearlyData,
};

export default authService;
