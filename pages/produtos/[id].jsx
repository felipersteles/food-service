import React, { useState } from "react";
import styles from "../../styles/Produtos.module.css";
import Image from "next/image";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduto } from "../../redux/carrinhoSlice";

const Produtos = ({ burguer }) => {
  const [preco, setPrice] = useState(burguer.precos[0]);
  const [size, setSize] = useState(0);
  const [quantidade, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);
  const dispatch = useDispatch();

  const changePrice = (number) => {
    setPrice(preco + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = burguer.precos[sizeIndex] - burguer.precos[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;
    console.log(option)

    if (checked) {
      changePrice(option.preco);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.preco);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleClick = () => {
    console.log(quantidade);
    dispatch(addProduto({...burguer, extras, preco, quantidade}));

  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={burguer.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{burguer.nomeProduto}</h1>
        <span className={styles.preco}>Valor total: R${preco}</span>
        <p className={styles.desc}><i>Descrição:</i><br/>&emsp;{burguer.desc}</p>
        <h3 className={styles.choose}>Escolha o tamanho</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Pequeno</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Médio</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Grande</span>
          </div>
        </div>
        <h3 className={styles.choose}>Adicione ingredientes!</h3>
        <div className={styles.ingredients}>
          {burguer.adicionais.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option.desc}
                name={option.desc}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor="double">{option.desc}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            onChange={(e) => {
              setQuantity(e.target.value);
              console.log(e.target.value)
            }}
            type="number"
            defaultValue={1}
            className={styles.quantity}
          />
          <button className={styles.button} onClick={handleClick}>
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `http://localhost:3000/api/produtos/${params.id}`
  );

  return {
    props: {
      burguer: res.data,
    },
  };
};

export default Produtos;
