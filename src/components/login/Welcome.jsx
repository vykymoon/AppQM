import React from "react";
import { useNavigate } from "react-router-dom";
import Dining from "./Assets/image.png";

function Welcome() {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate("/products");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
       
        <h1 className="text-lg font-bold text-[#2E2955]">QuickMeal News</h1>
        
      </header>

      {/* Main Content centrado verticalmente */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-[#2E2955] text-white rounded-4xl p-6 flex flex-col items-center justify-center text-center max-w-md">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-snug tracking-tight mb-6">
            Your Meal,<br />
            <span className="text-white">wherever you need it.</span>
          </h2>
          <img
            src={Dining}
            alt="Unisabana Dining"
            className="rounded-2xl max-w-full h-auto"
          />
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="flex justify-around items-center border-t border-gray-200 py-3 text-xs text-[#2E2955] font-medium">
        <div className="flex flex-col items-center cursor-pointer hover:text-[#5B57A5] transition duration-200">
          <span className="text-xl">🏠</span>
          Home
        </div>

        <button
          onClick={handleMenuClick}
          className="flex flex-col items-center hover:text-[#5B57A5] active:scale-95 transition duration-200"
        >
          <span className="text-xl">🍽️</span>
          Menu
        </button>

        <div className="flex flex-col items-center cursor-pointer hover:text-[#5B57A5] transition duration-200">
          <span className="text-xl">📖</span>
          Record
        </div>

        <button
          onClick={handleProfileClick}
          className="flex flex-col items-center hover:text-[#5B57A5] active:scale-95 transition duration-200"
        >
          <span className="text-xl">👤</span>
          Profile
        </button>
      </nav>
    </div>
  );
}

export default Welcome;
