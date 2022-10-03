import React from "react";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";

const Navbar = () => {
  const quantidade = useSelector((state) => state.cart.quantidade);
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/img/telephone.png" alt="" width="32" height="32" />
        </div>

        <div className={styles.texts}>
          <div className={styles.text}>Faça seu pedido!</div>
          <div className={styles.text}>+55 (98) 98131-1056 </div>
        </div>
      </div>

      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href={"/"} passHref>
            <li className={styles.listItem}>Principal</li>
          </Link>

          <Link href={"/produtos"} passHref>
          <li className={styles.listItem}>Produtos</li>
          </Link>
          <li className={styles.listItem}>Menu</li>
          <Image src="/img/logo.png" alt="" width="120px" height="95px" />
          <li className={styles.listItem}>Agenda</li>
          <li className={styles.listItem}>Blog</li>

          <Link href={"https://felipsteles.herokuapp.com/"}  target="_blank">
          <li className={styles.listItem}>Contato</li>
          </Link>
        </ul>
      </div>

      <Link href={"/carrinho"} passHref>
        <div className={styles.item}>
          <div className={styles.cart} style={{ cursor: "pointer" }}>
            <Image src="/img/cart.png" alt="" width="30px" height="30px" />
            <div className={styles.counter}>{quantidade}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
