import { useEffect, useState } from "react";
import Navbar from "./Navbar"; // 🔁 Ajusta si la ruta es diferente

export default function GestionTrabajadoras() {
  const [trabajadoras, setTrabajadoras] = useState([]);
  const [editando, setEditando] = useState(null);
  const [nombre, setNombre] = useState("");
  const [id, setId] = useState("");
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

      setTrabajadoras(trabajadoras.filter((t) => t._id !== _id));
    } catch (err) {
      console.error("Error al eliminar:", err);
    }
  };

  const guardar = async () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/trabajadoras/${editando}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre, id }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`Error al guardar: ${data.message}`);
        return;
      }

      setTrabajadoras((prev) =>
        prev.map((t) => (t._id === editando ? { ...t, nombre, id } : t))
      );
      setEditando(null);
    } catch (err) {
      console.error("Error al guardar cambios:", err);
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
            {editando === t._id ? (
              <div className="space-y-3">
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Nombre"
                />
                <input
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="ID"
                />
                <div className="flex gap-3">
                  <button
                    onClick={guardar}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition cursor-pointer"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditando(null)}
                    className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded-md transition cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <p className="font-semibold text-lg">{t.nombre}</p>
                  <p className="text-sm text-gray-600">ID: {t.id}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setEditando(t._id);
                      setNombre(t.nombre);
                      setId(t.id);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition cursor-pointer"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminar(t._id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md transition cursor-pointer"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
