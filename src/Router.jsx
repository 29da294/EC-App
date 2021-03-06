import React from "react";
import { Route, Switch } from "react-router";
import { CartList, FavoriteList, SignIn, SignUp, Reset, OrderConfirm, OrderHistory, ProductDetail, ProductEdit, ProductList, OrderComplete, UserMyPage } from "./templates";
import Auth from "./Auth"
import { Favorite } from "@material-ui/icons";

//Routerコンポーネントの基本型
//<Swith>と『exact』の組み合わせ（ラップ）で『完全一致』でリンクに飛ぶ設定となる
// "{(/)?}"で「/」が無くてもアクセスをOKとする正規表現
//<Auth></Auth>コンポーネントで括る ➡︎ 認証できた時に表示したいページのものにつける ➡︎ 今回は「Topページ」 「signIn」「signUp」の各ページは認証する前に表示させて、認証情報を入力させていページなので付けない ➡︎ こうして分岐させる

//正規表現である(/:id)?を付け加えることで、
// /product/edit ➡︎「商品の新規登録時の画面」
// /product/edit/(何らかの文字列 = 保存済みの products の id) ➡︎ 「商品追加修正画面」
// いずれでも component = { ProductEdit.jsx } が描画される

//{Rest}は未認証中でもパスワードをリセットしたい時があり、表示させたいので、<Auth＞ラッピングはしない
const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/signin/reset"} component={Reset}/>

    <Auth>
        <Route exact path={"(/)?"} component={ProductList} />
        <Route exact path={"/cart/"} component={CartList} />
        
        <Route exact path={"/order/completes"} component={OrderComplete} />
        <Route exact path={"/order/confirm"} component={OrderConfirm} />
        <Route exact path={"/order/history"} component={OrderHistory} />
        <Route exact path={"/product/:id"} component={ProductDetail} />
        <Route path={"/product/edit(/:id)?"} component={ProductEdit} />

        <Route exact path={"/user/favorite"} component={FavoriteList} />
        <Route exact path={"/user/mypage"} component={UserMyPage} />
    </Auth>
    </Switch>
  )
}

export default Router;
