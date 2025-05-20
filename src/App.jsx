import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/Login";
import RegistroTrabajadoras from "./components/RegistroTrabajadoras";
import GenerarQR from "./components/GenerarQR";
import GestionTrabajadoras from "./components/GestionTrabajadoras";

export default function App() {
  const [autenticado, setAutenticado] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    if (!token) {
      setAutenticado(false);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const now = Date.now() / 1000;

      // Aceptamos tokens sin exp también
      if (!payload.exp || payload.exp > now) {
        setAutenticado(true);
      } else {
        setAutenticado(false);
      }
    } catch (e) {
      console.warn("Token inválido");
      setAutenticado(false);
    }
  }, []);

  useEffect(() => {
    // Redirigir automáticamente al dashboard si ya está logueado
    if (autenticado && location.pathname === "/login") {
      navigate("/dashboard/qr");
    }
  }, [autenticado, location.pathname, navigate]);

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login onLogin={() => setAutenticado(true)} />}
      />
      <Route
        path="/dashboard/registro"
        element={
          autenticado ? (
            <RegistroTrabajadoras />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/dashboard/qr"
        element={autenticado ? <GenerarQR /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/"
        element={
          autenticado ? (
            <Navigate to="/dashboard/qr" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route
        path="/dashboard/gestion"
        element={
          autenticado ? (
            <GestionTrabajadoras />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}
