//『SignUp.jsx をコピーして使いまわせる』
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {PrimaryButton, TextInput} from "../components/UIkit"
import { resetPassword } from "../reducks/users/operations"

const Reset = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("")

  // useCallbackでのメモ化 ➡︎ bind(this)の代わり、render()の繰り返しを防ぐ！ event = onChange()イベントで次々に入力されていく文字列を反映しているイベントのこと これで更新さえていく値を更新されるたびに『onChange={inputUsername}として渡して』更新できるようにしている

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail]);

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">パスワードリセット</h2>
      <div className="module-spacer--medium" />
      {/* ⬆︎空白を入れるため用のdivタグ */}

      <TextInput
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true} rows={1} value={email} type={"email"} onChange={inputEmail}
      />

      <div className="module-spacer--medium" />

      <div className="center">
        <PrimaryButton
          label={"パスワードリセット"}
          onClick={() => dispatch(resetPassword(email))}
        />
      </div>
    </div>
  )
}

export default Reset;
