// src/components/POSProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const POSProtectedRoute = ({ children }) => {
  const { currentUser, userData, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Verifica si el usuario tiene el perfil POS
  if (userData?.role !== 'pos') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default POSProtectedRoute;