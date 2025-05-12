import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Cargando datos del usuario...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">No hay usuario autenticado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <h1 className="text-lg font-bold text-[#2E2955]">Perfil del Usuario</h1>
      </header>

      {/* Main */}
      <main className="flex-1 flex">
        {/* Contenedor morado */}
        <div className="bg-[#5B57A5] text-white px-6 py-10 flex flex-col items-center justify-center text-center w-full h-[calc(100vh-8rem)]">
  {/* Contenido del perfil */}
  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4">
    <span className="text-5xl text-[#5B57A5]">👤</span>
  </div>
  <p className="mb-1 text-sm">{user.email}</p>
  <p className="mb-1 text-sm break-all">{user.uid}</p>
</div>
      </main>

      {/* Bottom Nav */}
      <nav className="flex justify-around items-center border-t border-gray-200 py-3 text-xs text-[#2E2955] font-medium">
        <button
          onClick={() => navigate("/welcome")}
          className="flex flex-col items-center hover:text-[#5B57A5] transition duration-200"
        >
          <span className="text-xl">🏠</span>
          Home
        </button>

        <button
          onClick={() => navigate("/products")}
          className="flex flex-col items-center hover:text-[#5B57A5] transition duration-200"
        >
          <span className="text-xl">🍽️</span>
          Menu
        </button>

        <div className="flex flex-col items-center hover:text-[#5B57A5] transition duration-200">
          <span className="text-xl">📖</span>
          Record
        </div>

        <button
          onClick={() => navigate("/profile")}
          className="flex flex-col items-center hover:text-[#5B57A5] transition duration-200"
        >
          <span className="text-xl">👤</span>
          Profile
        </button>
      </nav>
    </div>
  );
}

export default UserProfile;