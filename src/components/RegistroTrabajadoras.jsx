import { useState } from "react";
import Navbar from "../components/Navbar";

export default function RegistroTrabajadoras() {
  const [nombre, setNombre] = useState("");
  const [id, setId] = useState("");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !id) return alert("Rellena todos los campos");

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/trabajadoras`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre, id }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error al registrar trabajadora");
      }

      alert("Trabajadora registrada");
      setNombre("");
      setId("");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex items-center justify-center py-12 px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Registrar trabajadora
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="nombre"
                className="block text-gray-700 font-medium mb-1"
              >
                Nombre completo
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Nombre completo"
                className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="id"
                className="block text-gray-700 font-medium mb-1"
              >
                ID
              </label>
              <input
                id="id"
                name="id"
                type="text"
                placeholder="ID (ej. 1548)"
                className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition cursor-pointer"
            >
              Añadir trabajadora
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
