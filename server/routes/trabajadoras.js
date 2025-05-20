import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import Trabajadora from "../models/Trabajadora.js";

const router = express.Router();

// Obtener todas
router.get("/", authMiddleware, async (req, res) => {
  try {
    const lista = await Trabajadora.find();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener trabajadoras" });
  }
});

// Crear nueva
router.post("/", authMiddleware, async (req, res) => {
  try {
    const nueva = new Trabajadora(req.body);
    await nueva.save();
    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ message: "Error al crear trabajadora" });
  }
});

// Eliminar
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Trabajadora.findByIdAndDelete(req.params.id);
    res.json({ message: "Eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar trabajadora" });
  }
});

// Editar
router.put("/:id", authMiddleware, async (req, res) => {
  const { nombre, id } = req.body;

  try {
    const result = await Trabajadora.findByIdAndUpdate(req.params.id, {
      nombre,
      id,
    });

    if (!result) {
      return res.status(404).json({ message: "Trabajadora no encontrada" });
    }

    res.json({ message: "Actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar trabajadora" });
  }
});

export default router;
