import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('https://pbs.twimg.com/media/GBJ0MQjXwAAtW6m.jpg:large')",
        }}
      />

      {/* Degradado morado personalizado sobre la imagen */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#2E2955]/80 to-transparent" />

      {/* Logo de la universidad arriba */}
      <img
        src="https://www.unisabana.edu.co/sites/default/files/2024-02/logo-unisabana.svg"
        alt="Logo Universidad de La Sabana"
        className="absolute top-6 left-1/2 transform -translate-x-1/2 w-40 z-20"
      />

      {/* Contenido centrado con logo QuickMeal */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 transform -translate-x-5">
        <img
          src="https://cdn.discordapp.com/attachments/1353908594571083930/1368724264915828927/image.png?ex=6819434e&is=6817f1ce&hm=eade4d4b5abf1741fe2f3c5b9b8f2ed8c56219cb23a87335c3ef1f7f0fe47d53&"
          alt="QuickMeal Icon"
          className="w-64 mb-12"
        />
      </div>

      {/* Sección de login/signup fija en la parte inferior */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center w-full px-4">
        <Link
          to="/login"
          className="bg-[#2E2955] hover:bg-[#221f44] text-white px-6 py-3 rounded-xl w-64 text-center font-semibold mb-4"
        >
          Log in
        </Link>
        <p className="text-white text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-200 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Home;