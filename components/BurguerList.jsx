import React from "react";
import styles from "../styles/BurguerList.module.css";
import BurguerCard from "./BurguerCard";

const BurguerList = ({burguerList}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>OS MELHORES HAMBURGUER</h1>
      <p className={styles.desc}>
        Hamburgueres ficticos. Site feito para exercitar os conhecimentos de desenvolvimento fullstack em react e nodejs.
      </p>
      <div className={styles.wrapper}>
      {burguerList.map((burguer) => (
          <BurguerCard key={burguer._id} burguer={burguer} />
        ))}
      </div>
    </div>
  );
};

export default BurguerList;
