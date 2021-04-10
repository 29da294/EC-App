import React, {useCallback, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import logo from "../../assets/img/icons/03top_logo.png";
import { useDispatch, useSelector } from "react-redux";
import { getSignedIn } from "../../reducks/users/selectors";
import { push } from "connected-react-router";
import { HeaderMenu, ClosableDrawer } from "./index";
import { theme } from "../../assets/theme";
import { createStyles } from "@material-ui/core";

//maxWidth: 1024,width: "100%" ➡︎ 1024pxまで伸びるが、それ以上は伸びないという設定
//iconButtons: {margin: "0 0 0 auto"} ➡︎ バーに表示する複数のアイコンを右寄せにする
const useStyles = makeStyles((theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  menuBar: {
    backgroundColor: "#ffd54f",
    color: "#444",
  },
  toolBar: {
    margin: "0 auto",
    maxWidth: 1024,
    width: "100%"
  },
  iconButtons: {
    margin: "0 0 0 auto"
  },
}));

//default backgroudColor:"#fff"
// <AppBar>の中に <Toolbar>を記述することで、ヘッダーを実装できるメニューアイコンを表示する
//<HeaderMenus>要素はログイン状態でのみ表示させたいので、{isSignedIn && ...で条件分岐している
//useSelector((state) => state)でStoreのデータを全て取得してから、usersのデータから更にログインの状態（true またはfalse）を取得するために、getSignedIn(selector)を使って更に抽出している

// Drawerの開閉を決めるstateである「open」をuseState(初期値としてセットしたい値)で定義 useState() = Hook版setState
// openの論理値を反転させる(!open) handleDrawerToggle()を定義event.type === "keydown" && ...は、「TabキーとShiftキーをクリックした時はDrawerメニューを閉じない」ことを制御する条件文 ➡︎ keydownは『何らかしらのキーボードが打ち込まれた時』ということ TabとShiftを押した時はDrawerのメニューを閉じさせずに次のメニューへ移動出来るようにしたいため設定する
// <HeaderMenus/>へhandleDrawerToggle()を渡します。<HeaderMenus/>をクリックした時、この関数が動作する(Drawerメニューが開く)よう実装
// これから実装する<ClosableDrawer/>へ、openとhandleDrawerToggleを渡します。これにより、Drawerメニューの開閉自体を制御します。

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getSignedIn(selector)

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = useCallback((event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setOpen(!open)
  }, [setOpen, open]);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar} >
        <Toolbar className={classes.toolBar}>
          <img
            src={logo} alt="EC-Site-Logo" width="128px" height="100px"
            onClick={() => dispatch(push("/"))}
          />
          {isSignedIn && (
            <div className={classes.iconButtons}>
              <HeaderMenu handleDrawerToggle={handleDrawerToggle} />
            </div>
          )}
        </Toolbar>
      </AppBar>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} />
    </div>
  )
}

export default Header;
