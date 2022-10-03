import mongoose from "mongoose";

const ProdutoSchema = new mongoose.Schema(
  {
    nomeProduto: {
      type: String,
      required: true,
      maxlength: 60,
    },
    desc: {
      type: String,
      required: true,
      maxlength: 200,
    },
    img: {
      type: String,
      required: true,
    },
    precos: {
      type: [Number],
      required: true,
    },
    adicionais: {
      type: [
        {
          desc: { type: String, required: true },
          preco: { type: Number, required: true },
        },
      ],
      required: false
    },
  },
  { timestamps: true }
);

export const ProdutoModel = (mongoose.models.produtos || mongoose.model("produtos", ProdutoSchema));