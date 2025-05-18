import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function ShoppingCart({ cart, setCart, onClose }) {
  const navigate = useNavigate();
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });
  const [deliveryTime, setDeliveryTime] = useState("");
  const [rating, setRating] = useState(0);

  // Calcular el subtotal y total
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Cambiar la cantidad de un producto
  const handleQuantityChange = (id, delta) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // Eliminar un producto del carrito
  const handleRemoveItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Confirmar el pedido
  const handleConfirmOrder = () => {
    if (!deliveryLocation || !deliveryTime) {
      Swal.fire("Error", "Por favor selecciona un lugar y hora de entrega", "error");
      return;
    }

    if (paymentMethod === "card" && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)) {
      Swal.fire("Error", "Por favor completa los datos de la tarjeta", "error");
      return;
    }

    Swal.fire({
      title: "¡Pedido confirmado!",
      html: `
        <p>Tu pedido será entregado en <strong>${deliveryLocation}</strong> a las <strong>${deliveryTime}</strong>.</p>
        <p>Por favor, califica tu experiencia:</p>
        <div id="rating-stars" class="flex justify-center gap-2 mt-2"></div>
      `,
      icon: "success",
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
      didOpen: () => {
        const starsContainer = Swal.getHtmlContainer().querySelector("#rating-stars");
        for (let i = 1; i <= 5; i++) {
          const star = document.createElement("span");
          star.innerHTML = "⭐";
          star.style.cursor = "pointer";
          star.style.fontSize = "24px";
          star.style.color = i <= rating ? "#FFD700" : "#ccc";
          star.addEventListener("click", () => {
            setRating(i);
            Array.from(starsContainer.children).forEach((child, index) => {
              child.style.color = index < i ? "#FFD700" : "#ccc";
            });
            Swal.fire("¡Gracias por tu calificación!", "Tu respuesta ha sido enviada.", "success");
          });
          starsContainer.appendChild(star);
        }
      },
    }).then(() => {
      setCart([]); // Vaciar el carrito después de confirmar el pedido
      setDeliveryLocation(""); // Reiniciar la ubicación de entrega
      setDeliveryTime(""); // Reiniciar la hora de entrega
      setRating(0); // Reiniciar la calificación
      onClose(); // Cerrar el carrito
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#bfc8e6]">
      {/* Logo de la universidad */}
      <div className="flex items-center justify-start px-8 py-4">
        <img
          src="https://www.unisabana.edu.co/sites/default/files/2024-02/logo-unisabana.svg"
          alt="Logo Universidad de La Sabana"
          className="h-12"
        />
      </div>

      {/* Barra superior */}
      <div className="bg-[#2E2955] text-white py-4 px-8 flex items-center justify-between">
        {/* Botón de "Atrás" */}
        <button
          onClick={onClose}
          className="text-white text-lg bg-[#2E2955] border border-white px-4 py-2 rounded hover:bg-[#221f44]"
        >
          Atrás
        </button>
        {/* Título centrado */}
        <h1 className="text-2xl font-bold text-center flex-1">YOUR CART</h1>
        {/* Botones de navegación */}
        <div className="flex items-center gap-4">
          <span className="text-2xl cursor-pointer" onClick={() => navigate("/")}>🏠</span>
          <span className="text-2xl cursor-pointer" onClick={() => navigate("/info")}>📖</span>
          <span className="text-2xl cursor-pointer" onClick={() => navigate("/profile")}>👤</span>
        </div>
      </div>

      <div className="p-6 flex flex-col lg:flex-row gap-6">
        {/* Productos seleccionados */}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#2E2955] mb-4">Productos Seleccionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-[#2E2955] text-white rounded-lg shadow-lg p-4 flex flex-col items-center"
              >
                <img
                  src={item.img || "https://via.placeholder.com/120"}
                  alt={item.nombre}
                  className="w-24 h-24 object-cover mb-2"
                />
                <h3 className="text-lg font-bold">{item.nombre}</h3>
                <p className="text-sm">Precio: ${item.price}</p>
                <p className="text-sm">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="bg-gray-200 text-[#2E2955] px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="bg-gray-200 text-[#2E2955] px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Detalles del pedido */}
        <div className="flex-1">
          <div className="bg-[#2E2955] text-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Detalles del Pedido</h2>
            <div className="mb-4">
              <h3 className="text-lg font-bold">Lugar de Entrega</h3>
              <select
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                className="border p-2 rounded w-full bg-white text-black"
              >
                <option value="">Selecciona una ubicación</option>
                <option value="Edificio A">Edificio A</option>
                <option value="Edificio B">Edificio B</option>
                <option value="Biblioteca">Biblioteca</option>
                <option value="Cafetería Central">Cafetería Central</option>
              </select>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-bold">Hora de Entrega</h3>
              <input
                type="time"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                className="border p-2 rounded w-full bg-white text-black"
              />
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-bold">Método de Pago</h3>
              <div className="flex items-center space-x-4 mt-2">
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="ml-2">Efectivo</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="ml-2">Tarjeta</span>
                </label>
              </div>
              {paymentMethod === "card" && (
                <div className="mt-4 space-y-2">
                  <input
                    type="text"
                    placeholder="Número de Tarjeta"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    className="border p-2 rounded w-full text-black"
                  />
                  <input
                    type="text"
                    placeholder="Fecha de Vencimiento (MM/AA)"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                    className="border p-2 rounded w-full text-black"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    className="border p-2 rounded w-full text-black"
                  />
                </div>
              )}
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-bold">Total a Pagar</h3>
              <p className="text-2xl font-bold">${calculateTotal().toFixed(2)}</p>
            </div>
            <button
              onClick={handleConfirmOrder}
              className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 w-full"
            >
              Confirmar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;