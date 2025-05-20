import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // <-- añadir esto
import Usuario from "../models/Usuario.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const user = await Usuario.findOne({ usuario });
    if (!user)
      return res.status(401).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user._id, usuario: user.usuario },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

export default router;
