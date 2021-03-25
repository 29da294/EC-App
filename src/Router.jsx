import React from "react";
import { Route, Switch } from "react-router";
import { Home, SignIn, SignUp, Reset, ProductEdit } from "./templates";
import Auth from "./Auth"

//Routerコンポーネントの基本型
//<Swith>と『exact』の組み合わせ（ラップ）で『完全一致』でリンクに飛ぶ設定となる
// "{(/)?}"で「/」が無くてもアクセスをOKとする正規表現
//<Auth></Auth>コンポーネントで括る ➡︎ 認証できた時に表示したいページのものにつける ➡︎ 今回は「Topページ」 「signIn」「signUp」の各ページは認証する前に表示させて、認証情報を入力させていページなので付けない ➡︎ こうして分岐させる

//{Rest}は未認証中でもパスワードをリセットしたい時があり、表示させたいので、<Auth＞ラッピングはしない
const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/signin/reset"} component={Reset}/>

    <Auth>
        <Route exact path={"(/)?"} component={Home} />
        <Route exact path={"/product/edit"} component={ProductEdit} />
    </Auth>
    </Switch>
  )
}

export default Router;
