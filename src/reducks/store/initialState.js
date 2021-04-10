
//アプリ起動時の初期のstateの状態を逐次、記入していく
export const initialState = {
  products: {
    list: []
  },
  users: {
    carts: [],
    favorites: [],
    isSignedIn: false,
    orders: [],
    role: "",
    uid: "",
    username: ""
  }
};

export default initialState
