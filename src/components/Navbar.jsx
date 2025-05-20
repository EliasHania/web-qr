import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token"); // ✅ añadimos para asegurar logout completo
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md mb-8 px-4 py-4 flex flex-wrap items-center justify-center gap-2 sm:justify-between sm:px-8">
      <div className="flex flex-wrap justify-center gap-2 w-full sm:w-auto">
        <NavLink
          to="/dashboard/qr"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md font-semibold transition cursor-pointer w-full sm:w-auto text-center ${
              isActive
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`
          }
        >
          Generar QR
        </NavLink>

        <NavLink
          to="/dashboard/registro"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md font-semibold transition cursor-pointer w-full sm:w-auto text-center ${
              isActive
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`
          }
        >
          Registrar trabajadora
        </NavLink>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-md shadow-md transition cursor-pointer w-full sm:w-auto"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
