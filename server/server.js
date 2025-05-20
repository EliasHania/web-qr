import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import trabajadorasRoutes from "./routes/trabajadoras.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/trabajadoras", trabajadorasRoutes);
app.use("/api/auth", authRoutes);

// ✅ Ruta de prueba para mantener activo el backend
app.get("/ping", (req, res) => {
  res.send("ok");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(3000, () => console.log("Servidor en puerto 3000"));
  })
  .catch((err) => console.error("Error de conexión:", err));
