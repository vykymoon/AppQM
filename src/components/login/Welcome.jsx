import React from "react";
import { useNavigate } from "react-router-dom";
import Dining from "./Assets/image.png";
import QuickMealLogo from "./Assets/LogoW.png";
import LogoWhite from "./Assets/logo_white.png";

function Welcome() {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    e.currentTarget.classList.add("scale-95");
    setTimeout(() => {
      e.currentTarget.classList.remove("scale-95");
      navigate("/products");
    }, 120);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-[#bfc8e6]">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-4 bg-[#2E2955] text-white">
        <div className="flex items-center gap-4">
          <img
            src={LogoWhite}
            alt="Logo Universidad de La Sabana"
            className="h-10 sm:h-12"
            style={{ background: "transparent" }}
          />
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold tracking-widest text-center flex-1" style={{ fontFamily: "inherit" }}>
          QUICKMEAL NEWS
        </h1>
        <div className="flex items-center gap-4 sm:gap-6 text-2xl sm:text-3xl">
          <button
            onClick={() => navigate("/order-history")}
            className="flex flex-col items-center hover:text-[#5B57A5] transition duration-200"
            title="Order History"
          >
            <span className="text-lg sm:text-xl">📖</span>
          </button>
          <span className="cursor-pointer">👤</span>
          <span className="cursor-pointer sm:hidden">☰</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 sm:gap-12 px-4 sm:px-8 lg:px-16 py-6 sm:py-10">
        {/* Left Card */}
        <div className="bg-[#2E2955] bg-opacity-90 rounded-3xl sm:rounded-[2.5rem] p-4 sm:p-6 flex flex-col items-center w-full sm:w-[370px] min-w-0 sm:min-w-[320px] shadow-xl mt-0 sm:mt-4">
          <img
            src={Dining}
            alt="Unisabana Dining"
            className="rounded-xl sm:rounded-2xl w-full h-48 sm:h-64 object-cover mb-3 sm:mb-4"
          />
          <div className="text-white text-center">
            <p className="font-bold text-base sm:text-lg mb-1 sm:mb-2">¡Vive la experiencia gastronómica de Unisabana!</p>
            <p className="text-sm sm:text-base mb-1 sm:mb-2">Conoce:</p>
            <h2
              className="text-xl sm:text-2xl mb-1 sm:mb-2"
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontWeight: 700,
                letterSpacing: "1px",
              }}
            >
              Unisabana Dining
            </h2>
            <p className="mb-1 sm:mb-2 text-sm sm:text-base">Con un equipo listo para servirte</p>
            <p className="text-xs">Talento 100% Unisabana</p>
            <img
              src={LogoWhite}
              alt="Logo Universidad de La Sabana"
              className="h-5 sm:h-6 mx-auto mt-1 sm:mt-2"
              style={{ background: "transparent" }}
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col justify-center items-start mt-4 sm:mt-8 w-full max-w-2xl">
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6 leading-tight"
            style={{
              fontFamily: "'Dancing Script', cursive",
              color: "#2E2955",
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            Unisabana<br />Dining
          </h2>
          <p className="text-base sm:text-lg text-[#2E2955] mb-6 sm:mb-8">
            En Unisabana Dining, ofrecemos una variedad de alimentos y bebidas para satisfacer todos los gustos. Nuestro equipo se dedica a preparar comidas deliciosas y saludables con ingredientes frescos. Ven y disfruta de una experiencia culinaria única en nuestro campus.
          </p>
          <button
            className="bg-[#0094FF] hover:bg-[#0077cc] active:scale-95 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-base sm:text-lg transition transform duration-100"
            onClick={handleMenuClick}
            style={{ outline: "none" }}
          >
            VIEW MENU
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#2E2955] text-white py-6 sm:py-8 px-4 sm:px-8">
        <div className="w-full max-w-[1600px] mx-auto flex flex-col md:flex-row md:justify-between gap-6 sm:gap-8 text-xs sm:text-sm">
          {/* Left */}
          <div className="flex flex-col sm:flex-row items-start w-full md:w-1/3 mb-6 md:mb-0">
            <img src={QuickMealLogo} alt="QuickMeal Logo" className="h-12 sm:h-16 mr-0 sm:mr-4 mb-2 sm:mb-0" />
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
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
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