import React, {useCallback, useState} from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import {PrimaryButton, TextInput} from "../components/UIkit"
import {signUp } from "../reducks/users/operations"

const SignUp = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(""),
        [email, setEmail] = useState(""),
        [password, setPassword] = useState(""),
        [confirmPassword, setConfirmPassword] = useState("");

  // useCallbackでのメモ化 ➡︎ bind(this)の代わり、render()の繰り返しを防ぐ！ event = onChange()イベントで次々に入力されていく文字列を反映しているイベントのこと これで更新さえていく値を更新されるたびに『onChange={inputUsername}として渡して』更新できるようにしている

  const inputUsername = useCallback((event) => {
    setUsername(event.target.value)
  }, [setUsername]);
  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail]);
  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  }, [setPassword]);
  const inputConfirmPassword = useCallback((event) => {
    setConfirmPassword(event.target.value)
  }, [setConfirmPassword]);


  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">アカウント登録</h2>
      <div className="module-spacer--medium" />
      {/* ⬆︎空白を入れるため用のdivタグ */}
      <TextInput
        fullWidth={true} label={"ユーザー名"} multiline={false} required={true} rows={1} value={username} type={"text"} onChange={inputUsername}
      />
      <TextInput
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true} rows={1} value={email} type={"email"} onChange={inputEmail}
      />
      <TextInput
        fullWidth={true} label={"パスワード（＊半角英数字6文字以上）"} multiline={false} required={true} rows={1} value={password} type={"password"} onChange={inputPassword}
      />
      <TextInput
      fullWidth={true} label={"パスワード再確認"} multiline={false} required={true} rows={1} value={confirmPassword} type={"password"} onChange={inputConfirmPassword}
      />
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton
          label={"アカウントを登録"}
          onClick={() => dispatch(signUp(username, email, password, confirmPassword))}
        />
        <div className="module-spacer--medium" />
        <button className="opacity-hover-t-blue clear-decoration" onClick={() => dispatch(push("/sigin"))}>既にアカウントをお持ちの方はこちら</button>
      </div>
    </div>
  )
}

export default SignUp;
