
//アプリ起動時の初期のstateの状態を逐次、記入していく
export const initialState = {
  products: {
    list: []
  },
  users: {
    isSignedIn: false,
    role: "",
    uid: "",
    username: ""
  }
};

export default initialState
