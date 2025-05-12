import React, { useState } from "react";

function ShoppingCart({ cart, setCart, onClose }) {
  const [deliveryTime, setDeliveryTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cardDetails, setCardDetails] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [orderStatus, setOrderStatus] = useState("En proceso");
  const [rating, setRating] = useState(0);

  // Calcular el total del carrito
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Manejar el cambio de cantidad
  const handleQuantityChange = (id, delta) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // Manejar la confirmación del pedido
  const handleConfirmOrder = () => {
    alert("Pedido confirmado. ¡Gracias por tu compra!");
    setOrderStatus("Entregado");
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <button onClick={onClose} className="text-[#2E2955] underline mb-4">
        ← Volver
      </button>
      <h1 className="text-2xl font-bold text-[#2E2955] mb-4">Carrito de Compras</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="border p-4 rounded shadow flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-[#2E2955]">{item.nombre}</h3>
                  <p className="text-sm text-gray-600">Precio: ${item.price}</p>
                  <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="bg-gray-200 px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="bg-gray-200 px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <h2 className="text-lg font-bold text-[#2E2955]">Tiempo de Entrega</h2>
            <input
              type="time"
              className="border p-2 rounded w-full mt-2"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-bold text-[#2E2955]">Método de Pago</h2>
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
                  className="border p-2 rounded w-full"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Nombre en la Tarjeta"
                  className="border p-2 rounded w-full"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Fecha de Expiración (MM/AA)"
                  className="border p-2 rounded w-full"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="border p-2 rounded w-full"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                />
              </div>
            )}
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-bold text-[#2E2955]">Total a Pagar</h2>
            <p className="text-xl font-bold text-[#2E2955]">${calculateTotal()}</p>
          </div>

          <button
            onClick={handleConfirmOrder}
            className="mt-4 bg-[#2E2955] text-white px-4 py-2 rounded w-full"
          >
            Confirmar Pedido
          </button>

          {orderStatus === "Entregado" && (
            <div className="mt-4">
              <h2 className="text-lg font-bold text-[#2E2955]">Califica tu Pedido</h2>
              <div className="flex space-x-2 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ShoppingCart;