import React from "react";
import BurguerList from "../../components/BurguerList";
import axios from "axios";

function Produtos({ burguerList }) {
  return <BurguerList burguerList={burguerList} />;
}

export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/produtos");

  return {
    props: {
      burguerList: res.data,
    },
  };
};

export default Produtos;
