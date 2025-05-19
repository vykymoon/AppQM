import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/login/signup2";
import Welcome from "./components/login/Welcome";
import Home from "./components/login/Home";
import ProductList from "./components/ProductList";
import WelcomePOS from "./components/login/WelcomePOS";
import ProductListManagement from "./components/ProductListManagement";
import ProtectedRoute from './components/ProtectedRoute';
import UserProfile from "./components/UserProfile";
import UserProfilePOS from "./components/UserProfilePOS"; 
import { AuthProvider, useAuth } from "./context/AuthContext";
import RoleProtectedRoute from './components/RoleProtectedRoute';
import OrderHistory from "./components/OrderHistory";
import OrdersPOS from "./components/OrdersPOS";
import { auth } from "./Firebase"; 
import { onAuthStateChanged } from "firebase/auth";

function AppRoutes() {
  const { user, role, loading } = useAuth();

  if (loading) {
    // Puedes mostrar un spinner o texto mientras carga la autenticación y rol
    return <p>Cargando...</p>;
  }

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/order-history"
        element={
          <ProtectedRoute user={user}>
            <OrderHistory />
          </ProtectedRoute>
        }
      />
      {/* Ruta raíz con redirección según rol */}
      <Route
        path="/"
        element={
          user ? (
            role === "POS" ? (
              <Navigate to="/welcome-pos" replace />
            ) : (
              <Navigate to="/welcome" replace />
            )
          ) : (
            <Home />
          )
        }
      />

      {/* Rutas protegidas clientes */}
      <Route
        path="/welcome"
        element={
          <ProtectedRoute user={user}>
            <Welcome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute user={user}>
            <ProductList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute user={user}>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders-pos"
        element={
          <RoleProtectedRoute allowedRoles={["POS"]}>
            <OrdersPOS />
          </RoleProtectedRoute>
        }
      />
      {/* Rutas protegidas POS */}
      <Route
        path="/welcome-pos"
        element={
          <RoleProtectedRoute allowedRoles={["POS"]}>
            <WelcomePOS />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/profilePOS"
        element={
          <RoleProtectedRoute allowedRoles={["POS"]}>
            <UserProfilePOS />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/manage-products"
        element={
          <RoleProtectedRoute allowedRoles={["POS"]}>
            <ProductListManagement />
          </RoleProtectedRoute>
        }
      />

      {/* Ruta catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;