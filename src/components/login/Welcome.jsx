import React from "react";
import { useNavigate } from "react-router-dom";
import Dining from "./Assets/image.png";

function Welcome() {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate("/products");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-[#bfc8e6]">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b-4 border-[#2E2955]">
        <div className="flex items-center gap-4">
          <img
            src="https://www.unisabana.edu.co/sites/default/files/2024-02/logo-unisabana.svg"
            alt="Logo Universidad de La Sabana"
            className="h-14"
          />
        </div>
        <h1 className="text-3xl font-extrabold text-[#2E2955] tracking-widest">QUICKMEAL NEWS</h1>
        <div className="flex items-center gap-6 text-3xl text-[#2E2955]">
          <span className="cursor-pointer">📖</span>
          <span className="cursor-pointer">👤</span>
          <span className="cursor-pointer">☰</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-row items-start justify-center gap-12 px-16 py-10">
        {/* Left Card */}
        <div className="bg-[#2E2955] bg-opacity-90 rounded-[2.5rem] p-6 flex flex-col items-center w-[370px] min-w-[320px] shadow-xl mt-4">
          <img
            src={Dining}
            alt="Unisabana Dining"
            className="rounded-2xl w-full h-64 object-cover mb-4"
          />
          <div className="text-white text-center">
            <p className="font-bold text-lg mb-2">¡Vive la experiencia gastronómica de Unisabana!</p>
            <p className="text-base mb-2">Conoce:</p>
            <h2 className="text-2xl font-cursive mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>
              Unisabana Dining
            </h2>
            <p className="mb-2">Con un equipo listo para servirte</p>
            <p className="text-xs">Talento 100% Unisabana</p>
            <img
              src="https://www.unisabana.edu.co/sites/default/files/2024-02/logo-unisabana.svg"
              alt="Logo Universidad de La Sabana"
              className="h-6 mx-auto mt-2"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col justify-center items-start mt-8 max-w-2xl">
          <h2
            className="text-6xl font-cursive text-[#2E2955] mb-6 leading-tight"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Unisabana<br />Dining
          </h2>
          <p className="text-lg text-[#2E2955] mb-8">
            En Unisabana Dining, ofrecemos una variedad de alimentos y bebidas para satisfacer todos los gustos. Nuestro equipo se dedica a preparar comidas deliciosas y saludables con ingredientes frescos. Ven y disfruta de una experiencia culinaria única en nuestro campus.
          </p>
          <button
            className="bg-[#0094FF] hover:bg-[#0077cc] text-white px-8 py-3 rounded-full font-bold text-lg transition"
            onClick={handleMenuClick}
          >
            VIEW MENU
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#2E2955] text-white py-8 px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <svg width="32" height="32" fill="currentColor" className="text-white">
                <circle cx="16" cy="16" r="16" fill="#fff2" />
                <path
                  d="M16 8a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12z"
                  fill="#fff"
                />
              </svg>
              <span className="font-bold">Universidad de La Sabana</span>
            </div>
            <p>
              Institución de educación superior sujeta a inspección y vigilancia por el Ministerio de Educación Nacional.<br />
              <a
                href="#"
                className="underline text-blue-200"
              >
                Protocolo de atención para casos de acoso, violencia sexual y basada en género, así como de comportamientos contrarios a los principios fundamentales de la Universidad
              </a>
              <br />
              Carácter Académico: Universidad
            </p>
          </div>
          {/* Center */}
          <div>
            <span className="font-bold">DATOS DE CONTACTO</span><br />
            Contact center: (601) 861 5555 / 861 6668<br />
            Apartado: 53753, Bogotá.<br />
            Correo electrónico para inquietudes generales y servicios de la Universidad:{" "}
            <a
              href="mailto:servicios@unisabana.edu.co"
              className="underline text-blue-200"
            >
              servicios@unisabana.edu.co
            </a>
            <br />
            Contacto únicamente para notificaciones legales.<br />
            No se responderán otros temas que no sean de tipo legal.<br />
            <a
              href="mailto:notificacioneslegales@unisabana.edu.co"
              className="underline text-blue-200"
            >
              notificacioneslegales@unisabana.edu.co
            </a>
          </div>
          {/* Right */}
          <div>
            <span className="font-bold">UBICACIÓN</span><br />
            Campus del Puente del Común,<br />
            Km. 7, Autopista Norte de Bogotá.<br />
            Chía, Cundinamarca, Colombia.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Welcome;
