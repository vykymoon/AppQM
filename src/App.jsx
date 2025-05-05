// src/App.jsx
// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/login/signup2";
import Welcome from "./components/login/Welcome";
import Home from "./components/login/Home";
import ProductList from "./components/ProductList";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/products" element={<ProductList />} /> {/* 👈 nueva ruta */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
