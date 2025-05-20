import Trabajadora from "../models/Trabajadora.js";

export const obtenerTodas = async (req, res) => {
  const trabajadoras = await Trabajadora.find();
  res.json(trabajadoras);
};

export const crearTrabajadora = async (req, res) => {
  const { nombre, id, cantidad } = req.body;
  const nueva = new Trabajadora({ nombre, id, cantidad });
  await nueva.save();
  res.status(201).json(nueva);
};

export const eliminarTrabajadora = async (req, res) => {
  await Trabajadora.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
