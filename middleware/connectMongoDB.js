import mongoose from "mongoose";

export const conectMongoDB = (handler) => async (req, res) => {
  //verifica se o banco esta conectado
  if (mongoose.connections[0].readyState) return handler(req, res); //pelo menos uma conexao

  //caso nao, obtem a variavel e conecta
  const { MONGO_URL } = process.env;
  if (!MONGO_URL)
    return res
      .status(500)
      .json({ erro: "ENV de configuração do banco não informado!" });

  mongoose.connection.on("connected", () =>
    console.log("Conectado ao mongoDB")
  );
  mongoose.connection.on("error", () => console.log("Falha ao conectar com o banco."));

  //await so passa pra proxima linha dps que receber
  //o resultado da promessa
  await mongoose.connect(MONGO_URL); //devolve uma promessa
  return handler(req, res); //segue para o endpoint
};
