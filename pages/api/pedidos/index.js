import { conectMongoDB } from "../../../middleware/connectMongoDB";
import {PedidoModel} from "../../../models/Pedidos";

async function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    try {
      const pedidos = await PedidoModel.find();
      res.status(200).json(pedidos);
    } catch (err) {
      res.status(500).json('nao foi possivel resgatar pedidos');
    }
  }

  if (method === "POST") {
    try {
      const pedido = await PedidoModel.create(req.body);
      
      res.status(201).json(pedido);
    } catch (err) {
      res.status(500).json('não foi possivel postar pedido');
    }
  }
}

export default conectMongoDB(handler);