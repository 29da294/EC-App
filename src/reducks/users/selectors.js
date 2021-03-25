import { createSelector } from "reselect";

//「initialState.js」のusers:のstateを呼び出している
const usersSelector = (state) => state.users;

//getSignedIn ➡︎ 現在のStoreのstateの中にある、isSignedIn （ture,falseの値が入る＝認証できているかいないか）を取得できる（actions.js , initialState.js）
export const getSignedIn = createSelector(
  [usersSelector],
  state => state.isSignedIn
)

//「initialState.js」のusers:のstateの「uid」をさらに抜き出している
export const getUserId = createSelector(
  [usersSelector],
  state => state.uid
);

export const getUserName = createSelector(
  [usersSelector],
  state => state.username
);
