
import React, { useState, useEffect } from "react";
import styles from "../styles/Carrinho.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch , useSelector } from "react-redux";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { reset } from "../redux/carrinhoSlice";

const Carrinho = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const carrinho = useSelector((state) => state.cart);
  const valor = carrinho.total;
  const currency = "BRL";
  const router = useRouter();

  const criarPedido = async (data) => {
    if(!data) router.push('/pedidos/somentevisualizacao');
    try {
      const res = await axios.post("http://localhost:3000/api/pedidos", data);
      if (res.status === 201) {
        console.log('status: ' + res.status)
        dispatch(reset());
        router.push(`/pedidos/${res.data._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Produto</th>
              <th>Nome</th>
              <th>Adicionais</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody>
            {carrinho.produtos.map((produto) => (
              <tr className={styles.tr} key={produto._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={produto.img}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{produto.nomeProduto}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {produto.extras.map((extra) => (
                      <span key={extra._id}>{extra.desc}, </span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>R${produto.preco}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{produto.quantidade}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    R${produto.preco * produto.quantidade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CARRINHO TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>R$ {carrinho.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Desconto:</b>R$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>R$ {carrinho.total}
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button className={styles.payButton} onClick={criarPedido()}>Pague na entrega</button>

              <PayPalScriptProvider
                options={{
                  "client-id":
                    "ATuL9hK_fcln_BwvvlprApB1Q1bCQw9BYhe_fLCqZF-VnVngCtWK26KZZT8qabJi01XbNh08-WWE_fmM",
                  currency: "BRL",
                }}
              >
                <PayPalButtons
                  style={{ layout: "horizontal" }}
                  createOrder={(data, actions) => {
                    return actions.order
                      .create({
                        purchase_units: [
                          {
                            amount: {
                              currency_code: currency,
                              value: valor,
                            },
                          },
                        ],
                      })
                      .then((orderId) => {
                        // Your code here after create the order
                        return orderId;
                      });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      const shipping = details.purchase_units[0].shipping;
                      criarPedido({
                        cliente: shipping.name.full_name,
                        endereco: shipping.address.address_line_1,
                        total: valor,
                        method: 1,
                      });

                      const name = details.payer.name.given_name;
                      alert(`Transaction completed by ${name}`);
                    });
                  }}
                />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button onClick={() => setOpen(true)} className={styles.button}>
              PAGUE AGORA!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carrinho;
