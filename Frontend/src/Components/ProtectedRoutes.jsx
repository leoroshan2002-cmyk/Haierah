import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  const user = auth?.user;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ?? <Outlet />;
};

export default ProtectedRoute;