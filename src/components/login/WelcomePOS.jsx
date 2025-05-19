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

  const handleLearnMoreClick = () => {
    // Aquí puedes redirigir a una página "About" o mostrar un modal
    console.log("Learn more clicked");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#2E2955] to-[#5B57A5]">
      {/* Header minimalista */}
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">QuickMeal POS</h1>
      </header>

      {/* Main Content - Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
          <h2 className="text-4xl font-bold text-white mb-2">WELCOME TO QUICKMEAL</h2>
          <p className="text-xl text-white/90 mb-6">FAST ORDERS WITHOUT WAITING</p>
          
          <p className="text-white/80 mb-8">Would you like to know more about us?</p>
          
          <button
            onClick={handleLearnMoreClick}
            className="bg-white text-[#2E2955] font-semibold py-3 px-8 rounded-full hover:bg-gray-100 active:scale-95 transition duration-200 shadow-md"
          >
            CLICK HERE
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
      </nav>
    </div>
  );
}

export default WelcomePOS;