import express from "express";
import bcrypt from "bcryptjs";
import Usuario from "../models/Usuario.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const user = await Usuario.findOne({ usuario });
    if (!user) return res.status(401).json({ msg: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Contraseña incorrecta" });

    return res.json({ success: true });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
});

export default router;
