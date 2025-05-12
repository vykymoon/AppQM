import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/login/signup2";
import Welcome from "./components/login/Welcome";
import Home from "./components/login/Home";
import ProductList from "./components/ProductList";
import ProductListManagement from "./components/ProductListManagement";
import OrderManagement from "./components/OrderManagement"; // Nueva importación

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/manage-products" element={<ProductListManagement />} />
        <Route path="/manage-orders" element={<OrderManagement />} /> {/* Nueva ruta */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;