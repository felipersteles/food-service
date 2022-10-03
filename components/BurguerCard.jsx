import React from "react";
import Image from "next/image";
import styles from "../styles/BurguerCard.module.css";
import Link from "next/link";

const BurguerCard = ({ burguer }) => {
  return (
    <div className={styles.container}>
      <Link href={`/produtos/${burguer._id}`} passHref>
        <a>
          <Image src={burguer.img} alt="" width="500" height="500" />
        </a>
      </Link>
      <h1 className={styles.title}>{burguer.nomeProduto}</h1>
      <span className={styles.price}>R${burguer.precos[0]}</span>
      <p className={styles.desc}>{burguer.desc}</p>
    </div>
  );
};

export default BurguerCard;
