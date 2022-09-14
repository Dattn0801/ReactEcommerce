import axios from "axios";

export const getCoupons = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/coupon`, {
    headers: authtoken,
  });

export const deleteCoupons = async (couponId, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`, {
    headers: authtoken,
  });
export const createCoupons = async (coupon, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/coupon`,
    { coupon },
    {
      headers: authtoken,
    }
  );
