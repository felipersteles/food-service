import styles from "../../styles/Admin.module.css";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";

const Admin = ({ produtos, pedidos }) => {
  const [burguerList, setBurguerList] = useState(produtos);
  const [pedidosList, setPedidosList] = useState(pedidos);
  const status = ["Em preparo", "Saiu pra entrega", "Entregue :)"];

  const handleDelete = async (id) => {
    //console.log(id);
    try {
      const res = await axios.delete(
        "http://localhost:3000/api/produtos/" + id
      );
      setBurguerList(burguerList.filter((burguer) => burguer._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = pedidosList.filter((pedido) => pedido._id === id)[0];
    const currentStatus = item.status;
    if (currentStatus > 1) {
      try {
        const res = await axios.delete(
          "http://localhost:3000/api/pedidos/" + id
        );
        setPedidosList(pedidosList.filter((pedido) => pedido._id !== id));
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await axios.put("http://localhost:3000/api/pedidos/" + id, {
          status: currentStatus + 1,
        });
        setPedidosList([
          res.data,
          ...pedidosList.filter((pedido) => pedido._id !== id),
        ]);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Produtos</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Imagem</th>
              <th>Id</th>
              <th>Nome</th>
              <th>Preco</th>
              <th>Ação</th>
            </tr>
          </tbody>
          {burguerList.map((produto) => (
            <tbody key={produto._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={produto.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td>{produto._id.slice(0, 5)}...</td>
                <td>{produto.nomeProduto}</td>
                <td>R$ {produto.precos[0]}</td>
                <td>
                  <button className={styles.button}>Editar</button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(produto._id)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Pedido</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Pagamento</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </tbody>
          {pedidosList.map((pedido) => (
            <tbody key={pedido._id}>
              <tr className={styles.trTitle}>
                <td>{pedido._id.slice(0, 5)}...</td>
                <td>{pedido.customer}</td>
                <td>R$ {pedido.total}</td>
                <td>
                  {pedido.method === 0 ? (
                    <span>dinheiro</span>
                  ) : (
                    <span>pago</span>
                  )}
                </td>
                <td>{status[pedido.status]}</td>
                <td>
                  <button onClick={() => handleStatus(pedido._id)}>
                    Avançar
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const produtoRes = await axios.get("http://localhost:3000/api/produtos");
  const pedidoRes = await axios.get("http://localhost:3000/api/pedidos");

  return {
    props: {
      pedidos: pedidoRes.data,
      produtos: produtoRes.data,
    },
  };
};

export default Admin;
