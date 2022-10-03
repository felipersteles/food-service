import { conectMongoDB } from "../../../middleware/connectMongoDB";
import { ProdutoModel } from "../../../models/Produtos";

async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  if (method === "GET") {
    try {
      const produto = await ProdutoModel.findById(id);
      res.status(200).json(produto);
    } catch (err) {
      res.status(500).json({ erro: "Falha ao recuperar produto." });
    }
  }

  if (method === "PUT") {
    try {
      const novoProduto = await ProdutoModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(novoProduto);
    } catch (err) {
      res.status(500).json({ erro: "Falha ao atualizar produto." });
    }
  }

  if (method === "DELETE") {
    try {
      await ProdutoModel.findByIdAndDelete(id);
      res.status(200).json({ msg: "Produto deletado com sucesso." });
    } catch (err) {
      res.status(500).json({ erro: "Falha ao deletar produto." });
    }
  }
}

export default conectMongoDB(handler);
