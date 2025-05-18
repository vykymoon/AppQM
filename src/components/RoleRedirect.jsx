
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleRedirect = () => {
  const { role, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  if (role === "POS") return <Navigate to="/welcome-pos" replace />;
  return <Navigate to="/welcome" replace />;
};

export default RoleRedirect;
