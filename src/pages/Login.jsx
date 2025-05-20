import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    fetch(`${API_URL}/ping`).catch(() =>
      console.warn("El backend puede estar dormido")
    );
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: user, password: pass }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        sessionStorage.setItem("token", data.token);

        if (onLogin) onLogin(); // ✅ Actualiza estado global de autenticación

        setTimeout(() => {
          navigate("/dashboard/qr");
        }, 100);
      } else {
        setError(data?.message || "Credenciales incorrectas");
      }
    } catch (err) {
      console.error("Error de red:", err);
      setError("Error al conectar con el servidor");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-200 via-green-800 to-neutral-900 p-4">
      <div className="conic-border w-full max-w-md rounded-2xl">
        <div className="p-6 bg-emerald-900/40 backdrop-blur-sm rounded-2xl">
          <div className="flex justify-center mb-6">
            <img
              src="/logo-webp.webp"
              alt="Logo"
              className="w-32 h-auto rounded-lg drop-shadow-md"
            />
          </div>

          <h1 className="text-3xl font-bold text-center text-green-300 mb-2">
            Bienvenido
          </h1>
          <p className="text-center text-green-100 mb-6">
            Sistema interno de impresión de códigos QR.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="usuario" className="block text-green-100 mb-1">
                Usuario
              </label>
              <input
                id="usuario"
                name="usuario"
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full px-4 py-2 border border-green-700/40 rounded-md bg-emerald-800/20 text-green-100 placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Usuario"
                required
              />
            </div>
            <div>
              <label htmlFor="contrasena" className="block text-green-100 mb-1">
                Contraseña
              </label>
              <input
                id="contrasena"
                name="password"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full px-4 py-2 border border-green-700/40 rounded-md bg-emerald-800/20 text-green-100 placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Contraseña"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300 cursor-pointer"
            >
              {cargando ? "Cargando..." : "Iniciar Sesión"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
