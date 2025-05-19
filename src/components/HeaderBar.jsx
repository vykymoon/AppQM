import React from "react";
import { useNavigate } from "react-router-dom";
import LogoWhite from "./login/Assets/logo_white.png"; // Ajusta la ruta si es necesario

function HeaderBar({ title, showCart, cartCount = 0, onCartClick }) {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-[#2E2955] text-white">
      <div className="flex items-center gap-4">
        <img
          src={LogoWhite}
          alt="Logo Universidad de La Sabana"
          className="h-12"
          style={{ background: "transparent" }}
        />
      </div>
      <h1 className="text-3xl font-extrabold tracking-widest text-center flex-1" style={{ fontFamily: "inherit" }}>
        {title}
      </h1>
      <div className="flex items-center gap-6 text-3xl">
        <button onClick={() => navigate("/")} className="text-2xl">
          🏠
        </button>
        <button onClick={() => navigate("/order-history")} className="text-2xl">
          📖
        </button>
        <button onClick={() => navigate("/profile")} className="text-2xl">
          👤
        </button>
        {showCart ? (
          <button onClick={onCartClick} className="relative text-2xl">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                {cartCount}
              </span>
            )}
          </button>
        ) : null}
      </div>
    </header>
  );
}

export default HeaderBar;