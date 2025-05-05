import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Home from "./components/login/home";
import Signup from "./components/login/signup2"; // Descomentado y usado correctamente

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> {/* Corregido */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
