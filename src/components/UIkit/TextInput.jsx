//ここには、『Material UI』のテキストデザインのカスタマイズのコンポーネントを記述する ➡︎ Material UIに『テキストフィールド』を使っていく

import React from "react";
import TextFiled from "@material-ui/core/TextField";

const TextInput = (props) => {
  return (
    <TextFiled
      fullWidth={props.fullWidth} //入力Form横幅いっぱいに広げる ➡︎ boolean型
      label={props.label} //表示項目名
      margin="dense" //固定
      multiline={props.multiline} //複数行の入力許可
      required={props.required} //入力必須か？
      rows={props.rows} //最初の状態のテキストフィールを何行表示するか
      value={props.value} //テキストフィールドに最初に入力されている文字列 ＋ 今回はonChange={props.onChange}に渡しているuseState()で変更した『関数』＝「 [state ,setState関数] 」を初期値から、入力されるなどして変更された値に更新された値 ＝ setStateの値が入る
      type={props.type} //HTMLのtypeタグの指定
      onChange={props.onChange}
      //都度、テキストフィールドに入力されていくため、都度変更を、この『TextInputコンポーネントを呼び出している関数（コンポーネント）へ伝えて、入力内容を更新してることを伝えいる』
    />
  )
}

export default TextInput;
