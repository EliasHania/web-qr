import { useEffect, useState, useRef } from "react";
import QRPage from "../components/QRPage";
import Navbar from "../components/Navbar";

export default function GenerarQR() {
  const [trabajadoras, setTrabajadoras] = useState([]);
  const [trabajadoraSeleccionada, setTrabajadoraSeleccionada] =
    useState("todas");
  const seccionesRef = useRef([]);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    const fetchTrabajadoras = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(`${API_URL}/trabajadoras`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Error al obtener trabajadoras");
        const data = await res.json();
        const ordenadas = [...data].sort((a, b) => b._id.localeCompare(a._id));
        setTrabajadoras(ordenadas);
      } catch (err) {
        console.error(err);
        alert("No se pudieron cargar las trabajadoras.");
      }
    };

    fetchTrabajadoras();
  }, [API_URL]);

  const imprimirIndividual = (index) => {
    const nodo = seccionesRef.current[index];
    if (!nodo) return;

    const printVentana = window.open("", "_blank", "width=800,height=1000");
    printVentana.document.write(`
      <html>
        <head>
          <title>Impresión QR</title>
          <style>
            body {
              font-family: sans-serif;
              margin: 20px;
              padding: 0;
            }
            .qr-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 12px;
            }
            .qr-block {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
            }
            .qr-nombre {
              font-size: 12px;
              font-weight: 600;
            }
            .qr-codigo {
              font-size: 10px;
              margin-top: 4px;
            }
            .qr-break {
              page-break-after: always;
            }
          </style>
        </head>
        <body>${nodo.innerHTML}</body>
      </html>
    `);
    printVentana.document.close();
    printVentana.focus();
    printVentana.print();
    printVentana.close();
  };

  const trabajadorasFiltradas =
    trabajadoraSeleccionada === "todas"
      ? trabajadoras
      : trabajadoras.filter((t) => t._id === trabajadoraSeleccionada);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Generar QR por trabajadora
        </h1>

        {trabajadoras.length > 0 ? (
          <>
            {/* Selector */}
            <div className="mb-6 no-print">
              <label
                htmlFor="trabajadora"
                className="block mb-2 text-gray-700 font-semibold"
              >
                Mostrar QR de trabajadora:
              </label>
              <select
                id="trabajadora"
                name="trabajadora"
                value={trabajadoraSeleccionada}
                onChange={(e) => setTrabajadoraSeleccionada(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="todas">Mostrar todas</option>
                {trabajadoras.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón imprimir */}
            <div className="mb-10 flex justify-center no-print">
              <button
                onClick={() => window.print()}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition cursor-pointer"
              >
                Imprimir{" "}
                {trabajadoraSeleccionada === "todas" ? "todas" : "seleccionada"}
              </button>
            </div>

            {/* Renderización QR */}
            {trabajadorasFiltradas.map((t, i) => {
              const isLast = i === trabajadorasFiltradas.length - 1;
              return (
                <div
                  key={t._id}
                  className={`bg-white rounded-lg ${
                    !isLast ? "qr-break" : ""
                  } print:p-0 print:shadow-none print:border-none`}
                >
                  <div ref={(el) => (seccionesRef.current[i] = el)}>
                    <QRPage nombre={t.nombre} id={t.id} />
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <p className="text-center text-gray-600">
            No hay trabajadoras registradas aún.
          </p>
        )}
      </div>
    </div>
  );
}
