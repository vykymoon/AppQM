import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import logoW from './Assets/LogoW.png';

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Usuario creado con éxito");
      navigate("/Welcome"); // 👈 redirige al home
    } catch (error) {
      alert("Error al crear el usuario: " + error.message);
    }
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('https://pbs.twimg.com/media/GBJ0MQjXwAAtW6m.jpg:large')`,
        }}
      />

      {/* Degradado morado */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#2E2955]/80 to-transparent" />

      {/* Logo QuickMeal */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20">
        <img
          src={logoW}
          alt="QuickMeal Logo"
          className="w-66"
        />
      </div>

      {/* Formulario */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 z-20 w-80 bg-white bg-opacity-90 rounded-3xl p-6 shadow-xl">
        <h2 className="text-center text-[#2E2955] text-lg font-semibold mb-4">
          Create your account
        </h2>
        <form className="flex flex-col space-y-4" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="border-b border-gray-400 focus:outline-none py-2 px-1 bg-transparent"
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-b border-gray-400 focus:outline-none py-2 px-1 bg-transparent"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-b border-gray-400 focus:outline-none py-2 px-1 bg-transparent"
            required
          />
          <button
            type="submit"
            className="bg-[#2E2955] hover:bg-[#221f44] text-white py-2 rounded-xl font-semibold mt-4"
          >
            Sign Up
          </button>
        </form>
        <p className="text-xs text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#2E2955] font-medium underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
