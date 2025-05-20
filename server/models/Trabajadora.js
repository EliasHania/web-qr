import mongoose from "mongoose";

const trabajadoraSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  id: { type: String, required: true },
  cantidad: { type: Number, default: 14 },
});

export default mongoose.model("Trabajadora", trabajadoraSchema);
