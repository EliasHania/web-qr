import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md mb-8 px-8 py-4 flex justify-between items-center border-b">
      <div className="flex gap-4">
        <NavLink
          to="/dashboard/qr"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md font-semibold transition cursor-pointer ${
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
            `px-4 py-2 rounded-md font-semibold transition cursor-pointer ${
              isActive
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`
          }
        >
          Registrar trabajadora
        </NavLink>
      </div>

      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-md shadow-md transition cursor-pointer"
      >
        Cerrar sesión
      </button>
    </nav>
  );
}
