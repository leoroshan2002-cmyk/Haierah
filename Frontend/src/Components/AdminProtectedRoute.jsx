import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const savedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const user = savedUser ? JSON.parse(savedUser) : null;
  const hasAdminToken = typeof window !== 'undefined' && Boolean(localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken'));

  if (!user && !hasAdminToken) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin" && !hasAdminToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtectedRoute;