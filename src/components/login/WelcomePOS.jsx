import React from "react";
import { useNavigate } from "react-router-dom";

function WelcomePOS() {
  const navigate = useNavigate();

  const handleManageProductsClick = () => {
    navigate("/manage-products");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <h1 className="text-lg font-bold text-[#2E2955]">QuickMeal POS</h1>
      </header>

      {/* Main Content centrado - vacío para interfaz más rápida */}
      <main className="flex-1 flex items-center justify-center p-4">
        <h2 className="text-3xl text-[#2E2955] font-semibold text-center">
          Panel de gestión
        </h2>
      </main>

      {/* Bottom Nav */}
      <nav className="flex justify-around items-center border-t border-gray-200 py-3 text-xs text-[#2E2955] font-medium">
        <div className="flex flex-col items-center cursor-default">
          <span className="text-xl">🏠</span>
          Home
        </div>

        <button
          onClick={handleManageProductsClick}
          className="flex flex-col items-center hover:text-[#5B57A5] active:scale-95 transition duration-200"
        >
          <span className="text-xl">🛠️</span>
          Manejar Productos
        </button>

        <button
          onClick={handleProfileClick}
          className="flex flex-col items-center hover:text-[#5B57A5] active:scale-95 transition duration-200"
        >
          <span className="text-xl">👤</span>
          Perfil
        </button>
      </nav>
    </div>
  );
}

export default WelcomePOS;
