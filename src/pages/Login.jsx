import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // 🔄 Ping inicial al backend (despierta Render)
  useEffect(() => {
    fetch(`${API_URL}/ping`).catch(() =>
      console.warn("El backend puede estar dormido")
    );
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: user, password: pass }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        // ✅ Guardar en ambos storage
        localStorage.setItem("token", data.token);
        sessionStorage.setItem("token", data.token);

        // ✅ Dar tiempo antes de redirigir
        setTimeout(() => {
          navigate("/dashboard/qr");
        }, 100);
      } else {
        setError(data?.message || "Credenciales incorrectas");
      }
    } catch (err) {
      console.error("Error de red:", err);
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Iniciar sesión
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            name="usuario"
            placeholder="Usuario"
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition cursor-pointer"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
