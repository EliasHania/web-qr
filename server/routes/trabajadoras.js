import express from "express";
import {
  obtenerTodas,
  crearTrabajadora,
  eliminarTrabajadora,
} from "../controllers/trabajadoraController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import Trabajadora from "../models/Trabajadora.js";

const router = express.Router();

// Todas las rutas protegidas
router.get("/", authMiddleware, obtenerTodas);
router.post("/", authMiddleware, crearTrabajadora);
router.delete("/:id", authMiddleware, eliminarTrabajadora);

// ✅ Editar trabajadora con logs de depuración
router.put("/:id", authMiddleware, async (req, res) => {
  const { nombre, id } = req.body;

  console.log("➡️ Editar trabajadora:");
  console.log("🆔 ID Mongo:", req.params.id);
  console.log("📝 Nuevo nombre:", nombre);
  console.log("🔢 Nuevo ID:", id);

  try {
    const result = await Trabajadora.findByIdAndUpdate(req.params.id, {
      nombre,
      id,
    });

    if (!result) {
      console.warn("⚠️ No se encontró la trabajadora con ese ID.");
      return res.status(404).json({ message: "Trabajadora no encontrada" });
    }

    console.log("✅ Actualización exitosa:", result);
    res.json({ message: "Actualizada correctamente" });
  } catch (error) {
    console.error("❌ Error al actualizar trabajadora:", error);
    res.status(500).json({ message: "Error al actualizar trabajadora" });
  }
});

export default router;
