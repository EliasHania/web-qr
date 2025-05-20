import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Usuario from "../models/Usuario.js";
import dotenv from "dotenv";
dotenv.config();

// Conexión a MongoDB
await mongoose.connect(process.env.MONGO_URI);

// Verificamos si ya existe
const existe = await Usuario.findOne({ usuario: "admin" });

if (existe) {
  console.log("El usuario 'admin' ya existe.");
  process.exit(0);
}

// Crea el usuario
const hash = await bcrypt.hash("admin2025!", 10);
await Usuario.create({ usuario: "admin", password: hash });

console.log("✅ Usuario 'admin' creado correctamente.");
process.exit(0);
