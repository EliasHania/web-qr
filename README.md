# Web QR Generator 🧾📦

Aplicación web para **generar e imprimir códigos QR personalizados** por trabajadora, con control de acceso mediante **autenticación segura con JWT**.

## 🛠️ Tecnologías utilizadas

- **Frontend**

  - React + Vite
  - TailwindCSS
  - React Router
  - Generador QR: `qrcode.react`

- **Backend**
  - Node.js + Express
  - MongoDB (con Mongoose)
  - JWT para autenticación
  - Dotenv para variables de entorno

---

## 🔐 Autenticación

- Login seguro mediante usuario y contraseña (validados en el backend).
- Se genera un **JWT** al iniciar sesión y se guarda en el `localStorage`.
- Todas las rutas protegidas del backend requieren un token válido (`Authorization: Bearer <token>`).
- Solo usuarios autenticados pueden registrar trabajadoras o ver/imprimir QR.

---

## 🧍 Gestión de trabajadoras

- Registro de trabajadoras con nombre e ID.
- Cada trabajadora genera una hoja PDF con 24 códigos QR del tipo: `ID-1`, `ID-2`, ..., `ID-24`.
- Opciones disponibles:
  - Ver todas las trabajadoras.
  - Seleccionar individualmente a una trabajadora.
  - Imprimir QR de una sola o de todas.
  - QR optimizados para caber en una sola hoja A4.
