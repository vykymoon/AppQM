import React from "react";

function Welcome() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <button>
          <span className="text-2xl text-[#2E2955]">✕</span>
        </button>
        <h1 className="text-lg font-bold text-[#2E2955]">QuickMeal News</h1>
        <button>
          <span className="text-2xl text-[#2E2955]">🛒</span>
        </button>
      </header>

      {/* Main Content centrado verticalmente */}
      <main className="flex-1 flex items-center justify-center p-4">
        {/* Contenedor morado con texto + imagen */}
        <div className="bg-[#2E2955] text-white rounded-4xl p-6 flex flex-col items-center justify-center text-center max-w-md">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-snug tracking-tight mb-6">
            Your Meal,<br />
            <span className="text-white">wherever you need it.</span>
          </h2>
          <img
            src="src/components/login/Assets/dining.png"
            alt="Unisabana Dining"
            className="rounded-2xl max-w-full h-auto"
          />
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="flex justify-around items-center border-t border-gray-200 py-3 text-xs text-[#2E2955] font-medium">
        <div className="flex flex-col items-center">
          <span className="text-xl">🏠</span>
          Home
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl">🍽️</span>
          Menu
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl">📖</span>
          Record
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl">👤</span>
          Profile
        </div>
      </nav>
    </div>
  );
}

export default Welcome;
