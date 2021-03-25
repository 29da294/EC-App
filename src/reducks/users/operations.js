import React from "react";
import { signInAction, signOutAction } from "./actions";
import { push } from "connected-react-router";
import { db, auth, FirebaseTimestamp } from "../../firebase/index"

//『dispatch』とは？？ ➡︎ ActionをStoreへ『dispatch（送信、届ける）』すると、Storeのstateが変更される。stateの変更は必ずActionを経由して行う
//Action ➡︎ Containerからの要求を受け、変更をさらに次へ依頼する。Fluxフローにおいては窓口の役割。変更を依頼すること自体は、★『dispatch』と言う。★Container「countを + 1したいらしいです」★Action「分かりました。担当につなぎます（dispatch）」
export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged(user => {
      //引数(user) ➡︎ ユーザー認証が（signIn）成功している…という条件分岐
      //認証出来てなければ『siginページ』へ遷移させる
      if (user) {
        const uid = user.uid

        db.collection("users").doc(uid).get()
          .then(snapshot => {
            const data = snapshot.data()

            dispatch(signInAction( {
              isSignedIn: true,
              role: data.role,
              uid: uid,
              username: data.username
            }))
          })
      } else {
        dispatch(push("/signin"))
      }
    })
  }
}


// ★いきなりreturnを行うが、
// これは『async () => { コールバック関数 } = 非同期処理を返している！』
// 後のコード ＝ コールバック関数の中で、
// 『awit』が使えるようになる！
// ➡︎『async () => { } の引数の「dispatch」の役割』
// ➡︎『Actions を呼び出す役割を果たしている！』
// ➡︎つまり『actions.js』の中の
// 『signInAction = (userState) => { return {} }』
// という関数コンポーネントを呼び出している！
// 以下をみると、『dispatch()を使って、
// 更に、dispatch(signInAction({}))と、『signInAction = (userState) => とAction()をしっかり呼び出している！』
// ➡︎『async () => { } の引数の「getSate」の役割』
// ➡︎ ★結論『現在のStoreの値を取得している！！！！』★
// ➡︎『現在の『Store の state を呼び出すことができる！』』
// ➡︎ よって、getState()と、メソッド（）として呼び出すことで、
// const state = getState()
// const isSignedIn = state.users.isSignedIn
// と行うことで、
// 『stateの中の、users（というkey ＝ usersはオブジェクトである）の中の、isSignedInというkeyの中のデータを
// 取得することができる！
// ➡︎ isSignedInというのは、『ユーザーの、ログイン情報が入っている！』


export const signIn = (email, password) => {
  return async (dispatch) => {

    //Validation (入力した値がフォーマット通り正しいか)
    if (email === "" || password === "") {
      alert("必須事項が未入力です")
      return false
    }

    auth.signInWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user;

        if (user) {
          const uid = user.uid;

          //FirebaseのDBからデータを取得し、operations.jsのsignInAction()コンポーネントを使って、DBから取得したデータを当てはめていく
          db.collection("users").doc(uid).get()
            .then(snapshot => {
              const data = snapshot.data()

              dispatch(signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username
              }))

              //Return TopPage
              dispatch(push("/"));
            })
        }
    })
  }
}

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    //Validation (入力した値がフォーマット通り正しいか)
    if (username === "" || email === "" || password === "" || confirmPassword === "") {
      alert("必須事項が未入力です")
      return false
    }
    if (password !== confirmPassword) {
      alert("パスワードが一致しません。再入力をしてください")
      return false
    }
    if (password.length < 6) {
      alert("パスワードは6文字以上で入力してください")
      return false
    }

    //auth = Firebase Auth（createUserWithEmailAndPassword）を使いアカウントの登録をしている
    return auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user

        if (user) {
          const uid = user.uid
          const timestamp = FirebaseTimestamp.now()
          //Firebaseのサーバーの現時刻を取得
          const userInitialData = {
            created_at: timestamp,//アカウントが作成された時
            email: email,
            role: "customer", //基本customer
            uid: uid,
            updated_at: timestamp,
            username: username
          }
          //db ➡︎ FirebaseのDBへアカウントデータを登録している ➡️ 登録できたらdispatchで遷移先のpathを変える処理を行い、トップページへ戻る処理をしている
          //★doc(uid)で引数に『auth』で使っている同じuidを渡した方が、データの管理がしやすくなるので、ここはテクニックである
          db.collection("users").doc(uid).set(userInitialData)
            .then(() => {
            dispatch(push("/"))
          })
        }
      })
  }
}

export const signOut = () => {
  return async (dispatch) => {
    auth.signOut()
      .then(() => {
        dispatch(signOutAction()); //LogOutなのでuser情報をinitialnに戻す ➡︎ その後、再びsigninページへ戻す
        dispatch(push("/signin"));
    })
  }
}

export const resetPassword = (email) => {
  return async (dispatch) => {
    if (email === "") {
      alert("必須項目が未入力です")
      return false
    } else {
      auth.sendPasswordResetEmail(email)
        .then(() => {
          alert("ご入力されましたメールアドレスへ、リセット用のメールをお送りいたしました。")
          dispatch(push("/signin"))
        }).catch(() => {
          alert("パスワードのリセットに失敗しました。通信環境等、ご確認ください。")
        })
    }
  }
}
