import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/login/signup2";
import Welcome from "./components/login/Welcome";
import Home from "./components/login/Home";
import ProductList from "./components/ProductList";
import ProductListManagement from "./components/ProductListManagement";
import ProtectedRoute from './components/ProtectedRoute';
import UserProfile from "./components/UserProfile";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas (accesibles sin autenticación) chill */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        
        {/* Rutas protegidas (requieren autenticación) porfin funciona esta mierda */}
        <Route path="/welcome" element={
          <ProtectedRoute>
            <Welcome />
          </ProtectedRoute>
        } />
        
        <Route path="/products" element={
          <ProtectedRoute>
            <ProductList />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } />
        
        <Route path="/manage-products" element={
          <ProtectedRoute>
            <ProductListManagement />
          </ProtectedRoute>
        } />

        {/* Redirección para rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;