import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/login/login"
import Home from "./components/login/home"
function App() {
  return (
    <> 
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>  {/* Cambiado a mayúscula */}
        <Route path='/' element={<Home/>}/>        {/* Cambiado a mayúscula */}
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App