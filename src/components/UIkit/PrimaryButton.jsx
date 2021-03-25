//***ボタン作成用のテンプレート（使い回し用）***/
import React from "react"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/styles"
//⬆︎ 作成者独自のStyleを適用したい時に使うUI
//⬇️ 独自のStyleを定義していく
const useStyles = makeStyles({
  "button": {
    backgroundColor: "#4dd0e1",
    color: "#000",
    fontSize: 16,
    height: 48,
    marginButtom: 16,
    width: 256
  }
})


//variant="contained" ➡︎ Matrial UI のボタンのデザイン設定 ➡︎ ボタン内を塗りつぶす
//onClick={() => props.onClick()} ➡︎ 各コンポーネントごとで行うonClick()イベントを受け取れる
//props.label ➡︎ ボタンに表示させたい文字を受け取れる
const PrimaryButton = (props) => {
  const classes = useStyles();

  return (
    <Button className={classes.button} variant="contained" onClick={() => props.onClick()} >
      {props.label}
      {/* ボタンに表示させたい文字を受け取れる */}
    </Button>
  )
}

export default PrimaryButton;
