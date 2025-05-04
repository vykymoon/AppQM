import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-violet-600">QuickMeal</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-violet-600 transition duration-200"
              >
                Inicio
              </Link>
              <Link
                to="/login"
                className="text-gray-700 hover:text-violet-600 transition duration-200"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="text-gray-700 hover:text-violet-600 transition duration-200"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="p-8 text-center">
        <h1 className="text-4xl font-bold text-blue-500 mb-4">¡Bienvenido a QuickMeal!</h1>
        <p className="text-lg text-gray-700 mb-6">Tu forma rápida y sencilla de pedir comida en La Sabana</p>
        <button className="bg-violet-500 hover:bg-violet-600 text-white font-medium py-2 px-4 rounded-md shadow-md transition duration-300">
          Explorar Menú
        </button>
      </main>
    </div>
  );
}

export default Home;
