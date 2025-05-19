import React from "react";
import { useNavigate } from "react-router-dom";
import Dining from "./Assets/image.png";
import QuickMealLogo from "./Assets/LogoW.png";
import LogoWhite from "./Assets/logo_white.png"; // Logo blanco de la universidad

function Welcome() {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    e.currentTarget.classList.add("scale-95");
    setTimeout(() => {
      e.currentTarget.classList.remove("scale-95");
      navigate("/products"); // <-- Esta ruta debe coincidir con App.jsx
    }, 120);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-[#bfc8e6]">
      {/* Header */}
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
          QUICKMEAL NEWS
        </h1>
        <div className="flex items-center gap-6 text-3xl">
          <button
            onClick={() => navigate("/order-history")}
            className="flex flex-col items-center hover:text-[#5B57A5] transition duration-200"
            title="Order History"
          >
            <span className="text-xl">📖</span>
          </button>
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
            <h2
              className="text-2xl mb-2"
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontWeight: 700,
                letterSpacing: "1px",
              }}
            >
              Unisabana Dining
            </h2>
            <p className="mb-2">Con un equipo listo para servirte</p>
            <p className="text-xs">Talento 100% Unisabana</p>
            <img
              src={LogoWhite}
              alt="Logo Universidad de La Sabana"
              className="h-6 mx-auto mt-2"
              style={{ background: "transparent" }}
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col justify-center items-start mt-8 max-w-2xl">
          <h2
            className="text-6xl mb-6 leading-tight"
            style={{
              fontFamily: "'Dancing Script', cursive",
              color: "#2E2955",
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            Unisabana<br />Dining
          </h2>
          <p className="text-lg text-[#2E2955] mb-8">
            En Unisabana Dining, ofrecemos una variedad de alimentos y bebidas para satisfacer todos los gustos. Nuestro equipo se dedica a preparar comidas deliciosas y saludables con ingredientes frescos. Ven y disfruta de una experiencia culinaria única en nuestro campus.
          </p>
          <button
            className="bg-[#0094FF] hover:bg-[#0077cc] active:scale-95 text-white px-8 py-3 rounded-full font-bold text-lg transition transform duration-100"
            onClick={handleMenuClick}
            style={{ outline: "none" }}
          >
            VIEW MENU
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#2E2955] text-white py-8 px-0">
        <div className="w-full max-w-[1600px] mx-auto flex flex-col md:flex-row md:justify-between gap-8 text-sm px-8">
          {/* Left */}
          <div className="flex flex-row items-start w-full md:w-1/3 mb-6 md:mb-0">
            <img src={QuickMealLogo} alt="QuickMeal Logo" className="h-16 mr-4" />
            <div>
              <span className="font-bold block mb-1">Universidad de La Sabana</span>
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
          </div>
          {/* Center */}
          <div className="w-full md:w-1/3">
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
          <div className="w-full md:w-1/3">
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
