//『SignUp.jsx をコピーして使いまわせる』
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import {PrimaryButton, TextInput} from "../components/UIkit"
import { signIn } from "../reducks/users/operations"

const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(""),
        [password, setPassword] = useState("")

  // useCallbackでのメモ化 ➡︎ bind(this)の代わり、render()の繰り返しを防ぐ！ event = onChange()イベントで次々に入力されていく文字列を反映しているイベントのこと これで更新さえていく値を更新されるたびに『onChange={inputUsername}として渡して』更新できるようにしている

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail]);

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  }, [setPassword]);

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">サインイン</h2>
      <div className="module-spacer--medium" />
      {/* ⬆︎空白を入れるため用のdivタグ */}
      <TextInput
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true} rows={1} value={email} type={"email"} onChange={inputEmail}
      />
      <TextInput
        fullWidth={true} label={"パスワード（＊半角英数字6文字以上）"} multiline={false} required={true} rows={1} value={password} type={"password"} onChange={inputPassword}
      />
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton
          label={"SIGN IN"}
          onClick={() => dispatch(signIn(email, password))}
        />
        <div className="module-spacer--medium" />
        <p onClick={() => dispatch(push("/signup"))}>アカウントをまだお持ちでない方はこちら</p>
        <p onClick={() => dispatch(push("/signin/reset"))}>パスワードをお忘れの方はこちら</p>
      </div>
    </div>
  )
}

export default SignIn;
