import { conectMongoDB } from "../../../middleware/connectMongoDB";
import { ProdutoModel } from "../../../models/Produtos";

async function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    try {
      const produtos = await ProdutoModel.find();
      res.status(200).json(produtos);
    } catch (err) {
      res.status(500).json({ error: "no get" });
    }
  }

  if (method === "POST") {
    const produto = req.body;

    const produtoRepetido = await ProdutoModel.find({
      nomeProduto: produto.nomeProduto,
    });
    if (produtoRepetido && produtoRepetido.length > 0)
      res.status(400).json({ erro: "Produto já cadastrado." });

    try {
      const novoProduto = await ProdutoModel.create(produto);
      res.status(200).json(novoProduto);
    } catch (err) {
      res.status(500).json({ error: "sei la" });
    }
  }
}

export default conectMongoDB(handler);