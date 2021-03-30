//ProductList.jsx内で、商品情報をGetさせるためgetProducts関数を定義する
import { createSelector } from "reselect";

const productSelector = (state) => state.products;

export const getProducts = createSelector(
  [productSelector],
  state => state.list
)

//state.products のデータの中にある、state.listを取り出すことで、商品情報をgetさせる関数を定義して、使えるようにしている
