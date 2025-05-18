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
import { AuthProvider } from "./context/AuthContext";
import RoleProtectedRoute from './components/RoleProtectedRoute';

import { auth } from "./Firebase"; 
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Limpia el listener al desmontar el componente
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />

          {/* Rutas protegidas */}
          <Route path="/welcome" element={
            <ProtectedRoute user={user}>
              <Welcome />
            </ProtectedRoute>
          } />

          <Route path="/products" element={
            <ProtectedRoute user={user}>
              <ProductList />
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute user={user}>
              <UserProfile />
            </ProtectedRoute>
          } />
<Route path="/welcome-pos" element={
  <RoleProtectedRoute allowedRoles={["POS"]}>
    <WelcomePOS />
  </RoleProtectedRoute>
} />

<Route path="/profilePOS" element={
  <RoleProtectedRoute allowedRoles={["POS"]}>
    <UserProfilePOS />
  </RoleProtectedRoute>
} />
          <Route path="/manage-products" element={
  <RoleProtectedRoute allowedRoles={["POS"]}>
    <ProductListManagement />
  </RoleProtectedRoute>
} />

          {/* Redirección para rutas no encontradas */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
