//別名でimportしているのは、このあと独自で定義する関数（）で『createStore()関数』をつくる予定なので、この『"redux"の「createStore」は別名をつけてわざわざimportしている』

//『reduxモジュール』のimportをしている
import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware
} from "redux";

//●connected-react-router ReduxのStoreでルーティングを管理するものをimport
import { connectRouter, routerMiddleware } from "connected-react-router"

//『reducers』のimportをしている *前回作成した
//import { ProductsReducer } from "../products/reducers";
import { UsersReducer } from "../users/reducers";
import { ProductsResucer, ProductsReducer } from "../products/reducers";

//『redux-thunk』を使うためにimportしている
import thunk from "redux-thunk";


//createStore関数を定義している
//名前付き関数＝functionとして今回は定義する（アロー関数でも定義はできる）
//combineReducers()とは？ ❶：分割（バラバラの）Reducersをまとめてくれる ❷：stateのカテゴリごと（今回だと「productsやusersのようなカテゴリごと」）にまとめてくれる  ❶、❷のまとめると、『products: ProductsReducer, users: UsersReducer』のように『「productsというstate」に対応する「Reducerは、ProductsReducer」』『「usersというstate」に対応する「Reducerは、usersReducers」』というように、『stateのカテゴリ毎に、 Reducersをまとめてくれている』
//❸ 最終的に『オブジェクトをreturnする』 returnするものは「stateのデータ構造を持ったもの ＝ initialSate.jsで定義したものと同じ形式」を返す
// {
//   products: {
//   },
//   users: {
//     isSignedIn: false,
//     uid: "",
//     username: ""
//   }
// }
//★reduxCreateStore()の中の引数というのは、上記のcombineReducers()❶〜❸のことから、『reducer.js』のUsersReducer = (state = initialState.users, action) => {switch (action.type) {}} の 『UsersReducer()関数』が『returnするstate』を『combineReducers()』が受け取って、『reduxCreateStore()関数＝別名を付けてこれはimportしているので、実体は『"redux"の”createStore()”』』が更に、この『default function createStore()関数』でreturnされている、多重returnのバケツリレー構造となっている！

//★
export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      //products: ProductsReducer,
      router: connectRouter(history),
      users: UsersReducer,
      products: ProductsReducer
    }),
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  );
}
