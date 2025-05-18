import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, role, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  // Si no hay usuario o el rol no está definido o no está permitido, redirige
  if (!user || !role || !allowedRoles.includes(role)) {
    return <Navigate to="/welcome-pos" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
