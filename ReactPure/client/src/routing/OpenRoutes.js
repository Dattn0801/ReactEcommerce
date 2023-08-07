import { Navigate } from "react-router-dom";

//router khi token === undefined(login... mới đc vào)
export const OpenRoutes = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token === undefined ? (
    children
  ) : (
    <Navigate to="/" replace={true} />
  );
};
