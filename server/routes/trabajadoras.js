import express from "express";
import {
  obtenerTodas,
  crearTrabajadora,
  eliminarTrabajadora,
} from "../controllers/trabajadoraController.js";
import { authMiddleware } from "../middleware/authMiddleware.js"; // Asegúrate que la ruta es correcta

const router = express.Router();

// Proteger todas las rutas con authMiddleware
router.get("/", authMiddleware, obtenerTodas);
router.post("/", authMiddleware, crearTrabajadora);
router.delete("/:id", authMiddleware, eliminarTrabajadora);

export default router;
