import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux"
import { getSignedIn } from "./reducks/users/selectors"
import {listenAuthState} from "./reducks/users/operations"

//{children} propsを引数に受け取る ★childrenとは、「子要素全体」を意味する特別なpropsのこと・例えば、アクセスしているアドレスが(/)であれば、<Route exact path={"(/)?"} component={Home} />がここに丸ごと入っているイメージ。
const Auth = ({children}) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  //「Reduxのstore」の「stateの値」を取得する
  const isSignedIn = getSignedIn(selector);

  //<Auth>コンポーネント（の1回目が実行された時に、まずして欲しい実行ロジック＝didMount = 認証のリッスン）がマウントされるとき、まず最初にuseEffect内の処理が実行されます(第２引数に[]を与えているため、★componentDidMount()と同じ役割) 。先ほど定義したlistenAuthStateが実行され、ユーザー認証のリッスンが行われる
  //★listenAuthState()は『operatins.js の 「reducksの関数（コンポーネント）」』なので、呼び出すときは『dispatch』を使わないと呼び出せない！！
  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState())
    }
  }, []);

  if (!isSignedIn) {
    return <></>
  } else {
    return children
  }
};

export default Auth;
