import React from "react";
import { useNavigate } from "react-router-dom";

function WelcomePOS() {
  const navigate = useNavigate();

  const handleManageProductsClick = () => {
    navigate("/manage-products");
  };

  const handleProfileClick = () => {
    navigate("/profilePOS");
  };

  const handleOrdersClick = () => {
    navigate("/orders-pos");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#2E2955] to-[#5B57A5]">
      {/* Header minimalista */}
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">QuickMeal POS</h1>
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#2E2955] to-[#5B57A5]">
      {/* Header minimalista */}
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">QuickMeal POS</h1>
      </header>

      {/* Main Content - Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
          <h2 className="text-4xl font-bold text-white mb-6">WELCOME TO QUICKMEAL</h2>
          <p className="text-xl text-white/90 mb-8">FAST ORDERS WITHOUT WAITING</p>
          
          {/* Botón centrado para ver solicitudes de órdenes */}
          <button
            onClick={handleOrdersClick}
            className="w-full bg-green-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-green-600 active:scale-95 transition duration-200 shadow-md flex items-center justify-center gap-2"
          >
            <span>📋</span>
            Ver solicitudes de órdenes
          </button>
        </div>
      </main>

      {/* Bottom Navigation - Glassmorphism */}
      <nav className="bg-white/10 backdrop-blur-md border-t border-white/20 py-4">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <div className="flex flex-col items-center text-white cursor-default">
            <span className="text-2xl mb-1">🏠</span>
            <span className="text-xs font-medium">Home</span>
          </div>
      {/* Bottom Navigation - Glassmorphism */}
      <nav className="bg-white/10 backdrop-blur-md border-t border-white/20 py-4">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <div className="flex flex-col items-center text-white cursor-default">
            <span className="text-2xl mb-1">🏠</span>
            <span className="text-xs font-medium">Home</span>
          </div>

          <button
            onClick={handleManageProductsClick}
            className="flex flex-col items-center text-white hover:text-gray-200 active:scale-95 transition duration-200"
          >
            <span className="text-2xl mb-1">📦</span>
            <span className="text-xs font-medium">Productos</span>
          </button>
          <button
            onClick={handleManageProductsClick}
            className="flex flex-col items-center text-white hover:text-gray-200 active:scale-95 transition duration-200"
          >
            <span className="text-2xl mb-1">📦</span>
            <span className="text-xs font-medium">Productos</span>
          </button>

          <button
            onClick={handleProfileClick}
            className="flex flex-col items-center text-white hover:text-gray-200 active:scale-95 transition duration-200"
          >
            <span className="text-2xl mb-1">👤</span>
            <span className="text-xs font-medium">Perfil</span>
          </button>
        </div>
          <button
            onClick={handleProfileClick}
            className="flex flex-col items-center text-white hover:text-gray-200 active:scale-95 transition duration-200"
          >
            <span className="text-2xl mb-1">👤</span>
            <span className="text-xs font-medium">Perfil</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default WelcomePOS;