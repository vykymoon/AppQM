import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../FireBase";
import ShoppingCart from "./ShoppingCart";

function ProductList() {
  const restaurants = [
    { id: "Restaurante Escuela", nombre: "Restaurante Escuela", imagen: "https://via.placeholder.com/150" },
    { id: "Restaurante Arcos", nombre: "Restaurante Arcos", imagen: "https://via.placeholder.com/150" },
    { id: "Embarcadero Carta", nombre: "Embarcadero Carta", imagen: "https://via.placeholder.com/150" },
    { id: "Terraza Living", nombre: "Terraza Living", imagen: "https://via.placeholder.com/150" },
    { id: "Kioskos", nombre: "Kioskos", imagen: "https://via.placeholder.com/150" },
    { id: "Autoservicio Menú del día", nombre: "Autoservicio Menú del día", imagen: "https://via.placeholder.com/150" },
    { id: "Punto Wok", nombre: "Punto Wok", imagen: "https://via.placeholder.com/150" },
    { id: "Banderitas", nombre: "Banderitas", imagen: "https://via.placeholder.com/150" },
    { id: "Punto Café", nombre: "Punto Café", imagen: "https://via.placeholder.com/150" },
    { id: "Café de la Bolsa", nombre: "Café de la Bolsa", imagen: "https://via.placeholder.com/150" },
    { id: "Café Embarcadero", nombre: "Café Embarcadero", imagen: "https://via.placeholder.com/150" },
    { id: "Café Estudio", nombre: "Café Estudio", imagen: "https://via.placeholder.com/150" },
    { id: "Cipreses", nombre: "Cipreses", imagen: "https://via.placeholder.com/150" },
    { id: "Café y Letras", nombre: "Café y Letras", imagen: "https://via.placeholder.com/150" },
    { id: "Punto Sándwich", nombre: "Punto Sándwich", imagen: "https://via.placeholder.com/150" },
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
      {/* Ícono del carrito */}
      <div className="flex justify-end mb-4">
        <button onClick={() => setShowCart(true)} className="relative text-2xl">
          🛒
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>

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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {restaurants.map((restaurant) => (
                  <button
                    key={restaurant.id}
                    onClick={() => setSelectedRestaurant(restaurant.id)}
                    className="border p-4 rounded shadow hover:bg-[#f3f4f6] transition flex flex-col items-center"
                  >
                    <img
                      src={restaurant.imagen}
                      alt={restaurant.nombre}
                      className="w-32 h-32 object-cover rounded-full mb-2"
                    />
                    <h2 className="text-lg font-semibold text-[#2E2955]">
                      {restaurant.nombre}
                    </h2>
                  </button>
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
              <h1 className="text-2xl font-bold text-[#2E2955] mb-4">
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
