import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const accessToken = Cookies.get("accessToken");
  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
