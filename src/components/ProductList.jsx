import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FireBase"; // Asegúrate de que esté bien la ruta

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productList);
      } catch (error) {
        console.error("Error al traer productos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <button>
          <span className="text-2xl text-[#2E2955]">←</span>
        </button>
        <h1 className="text-lg font-bold text-[#2E2955]">Choose your meal!</h1>
        <button>
          <span className="text-2xl text-[#2E2955]">🛒</span>
        </button>
      </header>

      {/* Lista de productos */}
      <main className="flex-1 overflow-y-auto px-4 space-y-4 pb-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center bg-gray-100 rounded-xl p-4 shadow-sm"
          >
            <img
              src="https://via.placeholder.com/80" // Cambia por campo real si tienes imágenes
              alt={product.nombre}
              className="w-20 h-20 rounded-xl object-cover mr-4"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-[#2E2955]">{product.nombre}</h3>
              <p className="text-sm text-gray-500">Categoría: {product.categoria}</p>
              <p className="text-[#2E2955] font-bold">Precio: ${product.price}</p>
              <p className="text-sm text-gray-600">Cantidad: {product.cantidad}</p>
              <p className="text-sm text-gray-600">Proveedor: {product.proveedor}</p>
            </div>
            <button className="bg-[#6C63FF] text-white px-4 py-2 rounded-full text-sm font-medium">
              Add to cart
            </button>
          </div>
        ))}
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

export default ProductList;
