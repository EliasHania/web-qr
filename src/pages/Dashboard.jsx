import { useState, useRef } from "react";
import QRPage from "../components/QRPage";

export default function Dashboard() {
  const [nombre, setNombre] = useState("");
  const [id, setId] = useState("");
  const [cantidad, setCantidad] = useState(14);
  const [trabajadoras, setTrabajadoras] = useState([]);

  const seccionesRef = useRef([]);

  const logout = () => {
    localStorage.removeItem("loggedIn");
    window.location.href = "/login";
  };

  const añadirTrabajadora = (e) => {
    e.preventDefault();
    if (!nombre || !id) return alert("Nombre e ID obligatorios");
    setTrabajadoras([
      ...trabajadoras,
      { nombre, id, cantidad: Number(cantidad) },
    ]);
    setNombre("");
    setId("");
    setCantidad(14);
  };

  const eliminarTrabajadora = (index) => {
    const nuevaLista = [...trabajadoras];
    nuevaLista.splice(index, 1);
    setTrabajadoras(nuevaLista);
  };

  const imprimirIndividual = (index) => {
    const nodo = seccionesRef.current[index];
    if (!nodo) return;

    const printVentana = window.open("", "_blank", "width=800,height=900");
    printVentana.document.write(`
      <html>
        <head>
          <title>Impresión QR</title>
          <style>
            body { font-family: sans-serif; margin: 0; padding: 0; }
            .break-after-page { page-break-after: always; }
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

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Panel QR</h1>
        <button onClick={logout} className="text-sm text-red-500 underline">
          Cerrar sesión
        </button>
      </div>

      <form
        onSubmit={añadirTrabajadora}
        className="bg-white p-4 rounded shadow mb-6 max-w-md"
      >
        <h2 className="text-lg font-semibold mb-2">Añadir trabajadora</h2>

        <input
          type="text"
          placeholder="Nombre completo"
          className="border p-2 w-full mb-2 rounded"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="text"
          placeholder="ID (ej. 1548)"
          className="border p-2 w-full mb-2 rounded"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <input
          type="number"
          placeholder="Cantidad de QRs"
          className="border p-2 w-full mb-2 rounded"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          min={1}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Añadir trabajadora
        </button>
      </form>

      {trabajadoras.length > 0 && (
        <div className="mb-6 flex gap-4 flex-wrap">
          <button
            onClick={() => window.print()}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Imprimir todas
          </button>
        </div>
      )}

      {trabajadoras.map((t, i) => (
        <div
          key={`${t.id}-${i}`}
          ref={(el) => (seccionesRef.current[i] = el)}
          className="mb-10 border border-dashed border-gray-400 p-4 bg-white rounded"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">{t.nombre}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => imprimirIndividual(i)}
                className="text-sm text-blue-600 underline"
              >
                Imprimir solo esta
              </button>
              <button
                onClick={() => eliminarTrabajadora(i)}
                className="text-sm text-red-500 underline"
              >
                Eliminar
              </button>
            </div>
          </div>

          <QRPage {...t} />
        </div>
      ))}
    </div>
  );
}
