import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../Firebase"; // Ajusta esta ruta según tu estructura

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

  // Confirmar el pedido con calificación interactiva en Swal y guardar en Firestore
  const handleConfirmOrder = async () => {
    if (!deliveryLocation || !deliveryTime) {
      Swal.fire("Error", "Por favor selecciona un lugar y hora de entrega", "error");
      return;
    }

    if (
      paymentMethod === "card" &&
      (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)
    ) {
      Swal.fire("Error", "Por favor completa los datos de la tarjeta", "error");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Swal.fire("Error", "Debes iniciar sesión para hacer un pedido", "error");
      return;
    }

    let tempRating = 0;

    Swal.fire({
      title: "¡Pedido confirmado!",
      html: `
        <p>Tu pedido será entregado en <strong>${deliveryLocation}</strong> a las <strong>${deliveryTime}</strong>.</p>
        <p>Por favor, califica tu experiencia:</p>
        <div id="rating-stars" class="flex justify-center gap-2 mt-2"></div>
      `,
      icon: "success",
      showConfirmButton: true,
      confirmButtonText: "Enviar calificación",
      didOpen: () => {
        const starsContainer = Swal.getHtmlContainer().querySelector("#rating-stars");
        for (let i = 1; i <= 5; i++) {
          const star = document.createElement("span");
          star.innerHTML = "⭐";
          star.style.cursor = "pointer";
          star.style.fontSize = "24px";
          star.style.color = "#ccc";

          star.addEventListener("click", () => {
            tempRating = i;
            Array.from(starsContainer.children).forEach((child, index) => {
              child.style.color = index < i ? "#FFD700" : "#ccc";
            });
          });

          starsContainer.appendChild(star);
        }
      },
      preConfirm: () => {
        if (tempRating === 0) {
          Swal.showValidationMessage("Por favor, selecciona una calificación");
          return false;
        }
        return tempRating;
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        setRating(result.value);

        try {
          await addDoc(collection(db, "orders"), {
            userId: user.uid,
            cart: cart,
            total: calculateTotal(),
            deliveryLocation,
            deliveryTime,
            paymentMethod,
            rating: result.value,
            createdAt: serverTimestamp(),
          });

          Swal.fire("¡Gracias por tu calificación!", "Tu respuesta ha sido enviada.", "success");

          setCart([]);
          setDeliveryLocation("");
          setDeliveryTime("");
          setRating(0);
          onClose();
        } catch (error) {
          Swal.fire("Error", "No se pudo guardar el pedido, intenta nuevamente.", "error");
          console.error("Error guardando pedido:", error);
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#bfc8e6] relative">
      {/* Solo el contenido del carrito, SIN barra superior */}
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
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="border p-2 rounded w-full bg-white text-black"
              >
                <option value="cash">Efectivo</option>
                <option value="card">Tarjeta de Crédito/Débito</option>
              </select>
            </div>

            {paymentMethod === "card" && (
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Número de Tarjeta"
                  value={cardDetails.number}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, number: e.target.value })
                  }
                  className="border p-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Fecha de Expiración (MM/AA)"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                  className="border p-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                />
              </div>
            )}

            <div className="mb-4">
              <h3 className="text-lg font-bold">Total: ${calculateTotal().toFixed(2)}</h3>
            </div>

            <button
              onClick={handleConfirmOrder}
              className="bg-[#796f9a] text-white px-6 py-3 rounded hover:bg-[#584e7e] w-full"
            >
              Confirmar Pedido
            </button>
          </div>
        </div>
      </div>
      {/* Botón para cerrar el carrito, movido abajo a la izquierda */}
      <button
        onClick={onClose}
        className="fixed bottom-8 left-8 bg-[#2E2955] text-white px-4 py-2 rounded shadow hover:bg-[#221f44] z-50"
      >
        Atrás
      </button>
    </div>
  );
}

export default ShoppingCart;
