import React from "react";
import { getUserId, getUserName } from "../reducks/users/selectors";
import { signOut } from "../reducks/users/operations";
import { useSelector, useDispatch } from "react-redux";

//reduxの「useSelector(state => state)」を使って『Store全体のstate全体』をまずは取得する！
const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const uid = getUserId(selector);
  const username = getUserName(selector);

  return (
    <div>
      <h2>Home</h2>
      <p>ユーザーID：{uid}</p>
      <p>ユーザー名：{username}</p>
      <button onClick={() => dispatch(signOut())}>
        SIGN OUT
      </button>
    </div>
  )
}

export default Home;
