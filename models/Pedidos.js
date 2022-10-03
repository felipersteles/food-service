import mongoose from "mongoose";

const PedidoSchema = new mongoose.Schema(
  {
    cliente: {
      type: String,
      required: true,
      maxlength: 60,
    },
    endereco: {
      type: String,
      required: true,
      maxlength: 200,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    method: {
      type: Number,
      required:true
    },
  },
  { timestamps: true }
);

export const PedidoModel = (mongoose.models.pedidos ||  mongoose.model("pedidos", PedidoSchema));