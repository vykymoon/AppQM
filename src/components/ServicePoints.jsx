import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FireBase";

function ServicePoints() {
  const [servicePoints, setServicePoints] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);

  useEffect(() => {
    const fetchServicePoints = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "service_points"));
        const pointsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setServicePoints(pointsList);
      } catch (error) {
        console.error("Error al traer puntos de servicio:", error);
      }
    };
    fetchServicePoints();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <button>
          <span className="text-2xl text-[#2E2955]">←</span>
        </button>
        <h1 className="text-lg font-bold text-[#2E2955]">Puntos de Servicio</h1>
        <button>
          <span className="text-2xl text-[#2E2955]">📍</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-4 space-y-4 pb-4">
        {servicePoints.map((point) => (
          <div
            key={point.id}
            className="bg-gray-100 rounded-xl p-4 shadow-sm flex flex-col"
            onClick={() => setSelectedPoint(point)}
          >
            <h3 className="font-semibold text-[#2E2955]">{point.nombre}</h3>
            <p className="text-sm text-gray-500">Ubicación: {point.ubicacion}</p>
            <p className="text-sm text-gray-500">Horario: {point.horario}</p>
          </div>
        ))}
      </main>

      {selectedPoint && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-11/12 max-w-md shadow-xl relative">
            <h2 className="text-lg font-bold mb-4 text-[#2E2955]">📍 {selectedPoint.nombre}</h2>
            <p className="text-sm text-gray-600">Ubicación: {selectedPoint.ubicacion}</p>
            <p className="text-sm text-gray-600">Horario: {selectedPoint.horario}</p>
            <button
              className="absolute top-2 right-3 text-gray-500"
              onClick={() => setSelectedPoint(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServicePoints;
