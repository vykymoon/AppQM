// src/components/AuthRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AuthRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthRoute;