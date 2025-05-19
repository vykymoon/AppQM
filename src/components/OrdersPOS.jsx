import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, updateDoc, doc, or } from "firebase/firestore";
import { db } from "../Firebase";
import { useNavigate } from "react-router-dom";

function OrdersPOS() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Mostrar pedidos con estado "pendiente" o "listo"
    const q = query(
      collection(db, "orders"),
      where("status", "in", ["pendiente", "listo"])
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleMarkReady = async (orderId) => {
    await updateDoc(doc(db, "orders", orderId), { status: "listo" });
  };

  const handleMarkDelivered = async (orderId) => {
    await updateDoc(doc(db, "orders", orderId), { status: "entregado" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#2E2955] to-[#5B57A5]">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">QuickMeal POS</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-white/20 text-white px-4 py-2 rounded-full hover:bg-white/30 transition"
        >
          Menú Principal
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-2xl w-full bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
            <span>📋</span> Pedidos Pendientes
          </h2>
          {orders.length === 0 && (
            <p className="text-white/90">No hay pedidos pendientes.</p>
          )}
          <ul className="space-y-6">
            {orders.map((order) => (
              <li
                key={order.id}
                className="p-6 border border-white/20 rounded-xl bg-white/20 backdrop-blur-sm shadow flex flex-col gap-3 text-left"
              >
                <div>
                  <strong className="text-white/90">Usuario:</strong>{" "}
                  <span className="text-white">{order.userId}</span>
                </div>
                <div>
                  <strong className="text-white/90">Productos:</strong>
                  <ul className="ml-4 list-disc text-white/90">
                    {order.cart.map((item) => (
                      <li key={item.id}>
                        {item.nombre} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong className="text-white/90">Total:</strong>{" "}
                  <span className="text-white">${order.total}</span>
                </div>
                <div>
                  <strong className="text-white/90">Lugar:</strong>{" "}
                  <span className="text-white">{order.deliveryLocation}</span>
                </div>
                <div>
                  <strong className="text-white/90">Hora:</strong>{" "}
                  <span className="text-white">{order.deliveryTime}</span>
                </div>
                <button
                  onClick={() => handleMarkReady(order.id)}
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 active:scale-95 transition duration-200 shadow"
                  disabled={order.status === "listo" || order.status === "entregado"}
                >
                  Marcar como listo
                </button>
                {order.status === "listo" && (
                  <button
                    onClick={() => handleMarkDelivered(order.id)}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 active:scale-95 transition duration-200 shadow"
                  >
                    Entregado
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default OrdersPOS;