import { configureStore } from "@reduxjs/toolkit";
import carrinhoReducer from "./carrinhoSlice";

export default configureStore({
    reducer: {
      cart: carrinhoReducer,
    },
  });