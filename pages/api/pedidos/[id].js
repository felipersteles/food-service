import { conectMongoDB } from "../../../middleware/connectMongoDB";
import { PedidoModel } from "../../../models/Pedidos";

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  if (method === "GET") {
    try {
      const pedido = await PedidoModel.findById(id);
      res.status(200).json(pedido);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    try {
      const pedido = await PedidoModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(pedido);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {
    try {
      await PedidoModel.findByIdAndDelete(id);
      res.status(200).json({ msg: "Pedido deletado com sucesso." });
    } catch (err) {
      res.status(500).json({ erro: "Falha ao deletar pedido." });
    }
  }
};

export default conectMongoDB(handler);
