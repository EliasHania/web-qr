import { useEffect, useState } from "react";
import Navbar from "./Navbar"; // 🔁 Ajusta si la ruta es diferente

export default function GestionTrabajadoras() {
  const [trabajadoras, setTrabajadoras] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    fetch(`${API_URL}/trabajadoras`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setTrabajadoras)
      .catch((err) => console.error("Error al obtener trabajadoras:", err));
  }, []);

  const eliminar = async (_id) => {
    if (!confirm("¿Eliminar esta trabajadora?")) return;

    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    try {
      await fetch(`${API_URL}/trabajadoras/${_id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setTrabajadoras((prev) => prev.filter((t) => t._id !== _id));
    } catch (err) {
      console.error("Error al eliminar:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          Gestión de trabajadoras
        </h1>

        {trabajadoras.length === 0 && (
          <p className="text-center text-gray-500">
            No hay trabajadoras registradas aún.
          </p>
        )}

        {trabajadoras.map((t) => (
          <div
            key={t._id}
            className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition rounded-xl p-5 mb-5"
          >
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <p className="font-semibold text-lg">{t.nombre}</p>
                <p className="text-sm text-gray-600">ID: {t.id}</p>
              </div>
              <div>
                <button
                  onClick={() => eliminar(t._id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md transition cursor-pointer"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
