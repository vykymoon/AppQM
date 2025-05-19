import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Firebase";
import ShoppingCart from "./ShoppingCart";
import HeaderBar from "./HeaderBar";

// Importar imágenes
import restauranteEscuela from "../components/login/Assets/RestauranteEscuela.webp";
import restauranteArcos from "../components/login/Assets/Arcos.webp";
import embarcaderoCarta from "../components/login/Assets/Embarcadero.webp";
import terrazaLiving from "../components/login/Assets/Terraza living.webp";
import kioskos from "../components/login/Assets/Kioskos.webp";
import autoservicioMenu from "../components/login/Assets/Meson.webp";
import puntoWok from "../components/login/Assets/Punto Wok.webp";
import banderitas from "../components/login/Assets/Meson-2.webp";
import puntoCafe from "../components/login/Assets/Punto verde.webp";
import cafeBolsa from "../components/login/Assets/Cafe bolsa-2.webp";
import cafeEmbarcadero from "../components/login/Assets/Embarcadero Cafe-5.webp";
import cafeEstudio from "../components/login/Assets/Cafe estudio.webp";
import cipreses from "../components/login/Assets/Cipreses.webp";
import cafeLetras from "../components/login/Assets/Café y Letras.webp";
import puntoSandwich from "../components/login/Assets/Punto Sandwich.webp";

function ProductList() {
  const restaurants = [
    {
      id: "Restaurante Escuela",
      nombre: "Restaurante Escuela",
      imagen: restauranteEscuela,
      horarios: "Lunes a viernes: Desayunos 7:00 a.m. - 10:00 a.m. Almuerzos 12:30 p.m. - 3:00 p.m.",
    },
    {
      id: "Restaurante Arcos",
      nombre: "Restaurante Arcos",
      imagen: restauranteArcos,
      horarios: "Lunes a viernes: Almuerzos 12:00 p.m. - 3:00 p.m.",
    },
    {
      id: "Embarcadero Carta",
      nombre: "Embarcadero Carta",
      imagen: embarcaderoCarta,
      horarios: "Lunes a sábado: Desayunos 7:00 a.m. - 10:00 a.m. Almuerzos 11:30 a.m. - 3:00 p.m. Sábado hasta las 2:30 p.m.",
    },
    {
      id: "Terraza Living",
      nombre: "Terraza Living",
      imagen: terrazaLiving,
      horarios: "Lunes a sábado: Desayunos 8:00 a.m. - 10:00 a.m. Almuerzos 11:30 a.m. - 3:30 p.m. Sábados no hay servicio de almuerzo.",
    },
    {
      id: "Kioskos",
      nombre: "Kioskos",
      imagen: kioskos,
      horarios: "Lunes a viernes: 11:30 a.m. - 3:30 p.m.",
    },
    {
      id: "Autoservicio Menú del día",
      nombre: "Autoservicio Menú del día",
      imagen: autoservicioMenu,
      horarios: "Lunes a viernes: 11:00 a.m. - 3:00 p.m.",
    },
    {
      id: "Punto Wok",
      nombre: "Punto Wok",
      imagen: puntoWok,
      horarios: "Lunes a viernes: Desayunos 7:00 a.m. - 10:00 a.m. Almuerzos 11:45 a.m. - 3:30 p.m.",
    },
    {
      id: "Banderitas",
      nombre: "Banderitas",
      imagen: banderitas,
      horarios: "Lunes a viernes: 12:00 p.m. - 3:00 p.m.",
    },
    {
      id: "Punto Café",
      nombre: "Punto Café",
      imagen: puntoCafe,
      horarios: "Lunes a viernes: 6:00 a.m. - 6:30 p.m. Sábados: 6:00 a.m. - 2:00 p.m.",
    },
    {
      id: "Café de la Bolsa",
      nombre: "Café de la Bolsa",
      imagen: cafeBolsa,
      horarios: "Lunes a viernes: 6:30 a.m. - 6:30 p.m. Sábados: 6:00 a.m. - 3:00 p.m.",
    },
    {
      id: "Café Embarcadero",
      nombre: "Café Embarcadero",
      imagen: cafeEmbarcadero,
      horarios: "Lunes a viernes: 6:30 a.m. - 6:00 p.m. Sábados: 6:30 a.m. - 3:00 p.m.",
    },
    {
      id: "Café Estudio",
      nombre: "Café Estudio",
      imagen: cafeEstudio,
      horarios: "Lunes a viernes: 7:00 a.m. - 3:30 p.m.",
    },
    {
      id: "Cipreses",
      nombre: "Cipreses",
      imagen: cipreses,
      horarios: "Lunes a viernes: 7:00 a.m. - 4:30 p.m.",
    },
    {
      id: "Café y Letras",
      nombre: "Café y Letras",
      imagen: cafeLetras,
      horarios: "Lunes a viernes: 7:00 a.m. - 3:30 p.m.",
    },
    {
      id: "Punto Sándwich",
      nombre: "Punto Sándwich",
      imagen: puntoSandwich,
      horarios: "Lunes a viernes: 10:30 a.m. - 3:00 p.m.",
    },
  ];

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    if (selectedRestaurant) {
      const fetchProducts = async () => {
        try {
          const q = query(
            collection(db, "products"),
            where("proveedor", "==", selectedRestaurant)
          );
          const querySnapshot = await getDocs(q);
          const productList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProducts(productList);
        } catch (error) {
          console.error("Error al obtener productos:", error);
        }
      };
      fetchProducts();
    }
  }, [selectedRestaurant]);

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Barra superior SOLO si NO está el carrito */}
      {!showCart && (
        <HeaderBar
          title="PRODUCT LIST"
          showCart={true}
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          onCartClick={() => setShowCart(true)}
        />
      )}

      {/* Mostrar el carrito o el contenido principal */}
      {showCart ? (
        <ShoppingCart cart={cart} setCart={setCart} onClose={() => setShowCart(false)} />
      ) : (
        <>
          {!selectedRestaurant ? (
            <>
              <h1 className="text-2xl font-bold text-[#2E2955] mb-4">
                Selecciona un Restaurante
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    onClick={() => setSelectedRestaurant(restaurant.id)}
                    className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col"
                  >
                    {/* Imagen del restaurante */}
                    <div className="relative">
                      <img
                        src={restaurant.imagen}
                        alt={restaurant.nombre}
                        className="w-full h-48 object-cover"
                      />
                    </div>

                    {/* Contenido del restaurante */}
                    <div className="p-4 bg-white flex-grow">
                      <h2 className="text-lg font-bold text-[#2E2955] mb-2">
                        {restaurant.nombre}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {restaurant.horarios}
                      </p>
                    </div>

                    {/* Botón interactivo */}
                    <div className="bg-[#2E2955] text-white text-center py-2 hover:bg-[#1e1a3d] transition-colors duration-300">
                      <button className="flex items-center justify-center gap-2">
                        <span>Consultar Menú</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.75L21 12m0 0l-3.75 3.25M21 12H3"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="mb-4 text-[#2E2955] underline"
              >
                ← Volver a Restaurantes
              </button>
              <h1 className="text-2xl  font-bold text-[#2E2955] mb-4">
                Menú del Restaurante
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="border p-4 rounded shadow hover:bg-[#f3f4f6] transition"
                  >
                    <h3 className="font-semibold text-[#2E2955]">{product.nombre}</h3>
                    <p className="text-sm text-gray-600">Precio: ${product.price}</p>
                    <p className="text-sm text-gray-600">Disponibles: {product.cantidad}</p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="mt-2 bg-[#2E2955] text-white px-4 py-1 rounded hover:bg-[#1e1a3d]"
                    >
                      Añadir al Carrito
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ProductList;