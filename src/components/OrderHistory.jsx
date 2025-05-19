import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../Firebase";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const q = query(collection(db, "orders"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const userOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(userOrders);
      } catch (error) {
        console.error("Error al obtener el historial de pedidos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2E2955]"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-[#2E2955] mb-4">No hay pedidos recientes</h2>
          <p className="text-gray-600">Parece que aún no has realizado ningún pedido.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="bg-white shadow-sm mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="https://www.unisabana.edu.co/sites/default/files/2024-02/logo-unisabana.svg"
                alt="Logo Universidad de La Sabana"
                className="h-12"
              />
              <h1 className="text-3xl font-bold text-[#2E2955]">RECENT MEALS</h1>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-600">Historial de pedidos</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Tus pedidos recientes</h2>
          <p className="text-gray-600">Revisa el detalle de tus comidas anteriores</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-[#2E2955]">Pedido #{order.id.slice(0, 8)}</h3>
                  <span className="bg-[#2E2955] text-white text-xs px-3 py-1 rounded-full">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-600 text-sm mb-1">Total del pedido</p>
                  <p className="text-xl font-bold text-[#2E2955]">${order.total.toFixed(2)}</p>
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Productos:</h4>
                  <ul className="space-y-2">
                    {order.cart.map((item) => (
                      <li key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-800">{item.nombre}</span>
                        <span className="text-gray-600">
                          {item.quantity} × ${item.price.toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default OrderHistory;