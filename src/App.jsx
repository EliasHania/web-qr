import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import RegistroTrabajadoras from "./components/RegistroTrabajadoras";
import GenerarQR from "./components/GenerarQR";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Date.now() / 1000;
    return payload.exp > now;
  } catch {
    return false;
  }
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard/registro"
        element={
          isAuthenticated() ? (
            <RegistroTrabajadoras />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/dashboard/qr"
        element={
          isAuthenticated() ? <GenerarQR /> : <Navigate to="/login" replace />
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
