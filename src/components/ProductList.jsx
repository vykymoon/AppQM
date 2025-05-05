import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FireBase";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [pickupTime, setPickupTime] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productList);
        setFilteredProducts(productList);
      } catch (error) {
        console.error("Error al traer productos:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let updatedList = [...products];
    if (category !== "All") {
      updatedList = updatedList.filter(p => p.categoria === category);
    }
    if (searchQuery.trim() !== "") {
      updatedList = updatedList.filter(p =>
        p.nombre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredProducts(updatedList);
  }, [searchQuery, category, products]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const confirmOrder = async () => {
    if (!pickupTime) {
      alert("Por favor selecciona una hora de recogida");
      return;
    }

    const orderData = {
      items: cart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      pickupTime,
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      if (data.success) {
        alert("✅ Pedido creado correctamente. ID: " + data.orderId);
        setCart([]);
        setShowCart(false);
      } else {
        alert("❌ Error al crear el pedido.");
      }
    } catch (error) {
      console.error("Error al confirmar pedido:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <button>
          <span className="text-2xl text-[#2E2955]">←</span>
        </button>
        <h1 className="text-lg font-bold text-[#2E2955]">Choose your meal!</h1>
        <button onClick={() => setShowCart(true)}>
          <span className="text-2xl text-[#2E2955]">🛒</span>
        </button>
      </header>

      {/* Filtros */}
      <div className="flex gap-2 p-4">
        {["All", "Drinks", "Meat", "Confectionery"].map(cat => (
          <button
            key={cat}
            className={`px-3 py-1 rounded-full text-sm ${
              category === cat ? "bg-[#6C63FF] text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SearchBar */}
      <div className="px-4 mb-2">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm"
          placeholder="Search in inventory..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Lista de productos */}
      <main className="flex-1 overflow-y-auto px-4 space-y-4 pb-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="flex items-center bg-gray-100 rounded-xl p-4 shadow-sm"
          >
            <img
              src="https://via.placeholder.com/80"
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
            <button
              onClick={() => addToCart(product)}
              className="bg-[#6C63FF] text-white px-4 py-2 rounded-full text-sm font-medium"
            >
              Add to cart
            </button>
          </div>
        ))}
      </main>

      {/* Carrito modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-11/12 max-w-md shadow-xl relative">
            <h2 className="text-lg font-bold mb-4 text-[#2E2955]">🛍 Tu carrito</h2>
            {cart.length === 0 ? (
              <p className="text-sm text-gray-600">No has agregado productos aún.</p>
            ) : (
              <>
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                  {cart.map(item => (
                    <li key={item.id} className="flex justify-between items-center">
                      <span>{item.nombre} x {item.quantity}</span>
                      <button
                        className="text-red-500 text-xs"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hora de recogida:
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                  />
                </div>
                <button
                  onClick={confirmOrder}
                  className="mt-4 bg-[#6C63FF] text-white w-full py-2 rounded-full text-sm font-semibold"
                >
                  Confirmar pedido
                </button>
              </>
            )}
            <button
              className="absolute top-2 right-3 text-gray-500"
              onClick={() => setShowCart(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

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
