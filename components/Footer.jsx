import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/bg.png" objectFit="cover" layout="fill" alt="" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            OS MELHORES HAMBUGUERES FICTICIOS DESENVOLVIDOS PELO MELHOR PROGRAMADOR REAL
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>VENHA EM NOSSOS RESTAURANTES</h1>
          <p className={styles.text}>
            Cohatrac <br /> Rua dos bobos, 0<br /> 
            <br /> São Luis, Maranhão
            <br /> +55 (98) 98131-1056
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>HORÁRIO DE FUNCIONAMENTO</h1>
          <p className={styles.text}>
            NOS TEUS SONHOS
            <br /> O TEMPO TODO RS
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
