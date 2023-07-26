import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const postQuery = async (contactData) => {
  const response = await axios.post(`${base_url}enq`, contactData);
  if (response.data) {
    return response.data;
  }
};
export const contactService = {
  postQuery,
};
