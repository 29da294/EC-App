import { createSelector } from "reselect";

//「initialState.js」のusers:のstateを呼び出している
const usersSelector = (state) => state.users;

//getSignedIn ➡︎ 現在のStoreのstateの中にある、isSignedIn （ture,falseの値が入る＝認証できているかいないか）を取得できる（actions.js , initialState.js）
export const getSignedIn = createSelector(
  [usersSelector],
  state => state.isSignedIn
);

export const getOrdersHistory = createSelector(
  [usersSelector],
  state => state.orders
)

//カート内の商品情報取得 (➡︎ HeaderMenu.jsx:let productsInCart = getProductsInCart(selector);)
export const getProductsInCart = createSelector(
  [usersSelector],
  state => state.carts
);

export const getProductsInFavorite = createSelector(
  [usersSelector],
  state => state.favorites
);

//「initialState.js」のusers:のstateの「uid」をさらに抜き出している
export const getUserId = createSelector(
  [usersSelector],
  state => state.uid
);

export const getUserName = createSelector(
  [usersSelector],
  state => state.username
);

//★ initialState.js 内の users:のデータ項目 ＝ 『FireStore(Cloud Firestore)』のデータカラムに合わせたデータを取得するための関数を定義している ➡︎ ★JavaのGetterみたいなもの★
