import QRCode from "react-qr-code";

export default function QRPage({ nombre, id }) {
  const cantidad = 24; // número fijo por hoja A4
  const codigos = Array.from({ length: cantidad }, (_, i) => `${id}-${i + 1}`);

  return (
    <div className="print-container p-6 print:p-2 print:pt-6">
      <h2 className="print-title text-xl font-bold text-center mb-4">
        {nombre}
      </h2>

      <div className="print-grid grid grid-cols-4 gap-4">
        {codigos.map((codigo) => (
          <div key={codigo} className="qr-block">
            <span className="qr-nombre">{nombre}</span>
            <QRCode value={codigo} size={100} />
            <span className="qr-codigo">{codigo}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
