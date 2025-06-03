import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";  // Your redux hooks path

const ProtectedRoutes = () => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
