import { createSlice } from "@reduxjs/toolkit";

const carrinhoSlice = createSlice({
  name: "carrinho",
  initialState: {
    produtos: [],
    quantidade: 0,
    total: 0,
  },
  reducers: {
    addProduto: (state, action) => {
      state.produtos.push(action.payload); //detalhes do produto como action.payload
      state.quantidade += 1;
      state.total += action.payload.preco * action.payload.quantidade;
    },
    reset: (state) => {
      state.produtos = [];
      state.quantidade = 0;
      state.total = 0;
    },
  },
});

export const { addProduto, reset } = carrinhoSlice.actions;
export default carrinhoSlice.reducer;