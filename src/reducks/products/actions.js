// ⬇️ Reducerへの依頼の種類（Actionのタイプ）を定義している 『定数』に『”文字列”』を入れているにすぎない これをtype:文字列として書いている

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const fetchProductsAction = (products) => {
  return {
    type: "FETCH_PRODUCTS",
    payload: products
  }
};

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const deleteProductAction = (products) => {
  return {
    type: "DELETE_PRODUCT",
    payload: products
  }
};
