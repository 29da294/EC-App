import React, { useCallback, useState, useEffect } from "react";
import {db} from "../../firebase";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/styles";
import HomeIcon from '@material-ui/icons/Home';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HistoryIcon from "@material-ui/icons/History";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import { TextInput } from "../../components/UIkit/index";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { signOut } from "../../reducks/users/operations";


//width:256 ➡︎スマフォやPCでも十分なDrawerメニューの表示領域幅
//display: "flex" ➡︎ 表示される項目をflexBoxで縦に並べられる

const useStyles = makeStyles((theme) => ({
    drawer: {
      [theme.breakpoints.up("sm")]: {
        flexShrink: 0,
        width: 256
      }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: 256
    },
    searchField: {
      alignItems: "center",
      display: "flex",
      marginLeft: 32
    }
  }));

//Materail-UI の <Drawer>コンポーネントでDrawerメニューを実装する時は、<nav>タグで全体をラッピングしてコンポーネントを使用する

//親コンポーネントから渡ってきたopenおよびonClose(= handleDrawerToggle)を、この<Drawer/>に渡すことで、Drawerメニューの開閉を実装できる また、Drawer APIに渡すパラメーターで、Drawerメニューの特徴を設定変更できる

//props.onClose(event) ➡︎ (event)をHeader.jsでpropsとして渡すように定義している、『onClose(handleDrawerToggle)』へ渡している これにより 「Log Out」 や 何らかのメニューが選択されてリンクに飛んだ後に、Drawerメニューが閉じるようになる ＊これを記述しないと選択してリンクに飛んだあともDrawerメニューが飛び出たままになってしまうので記述する

const ClosableDrawer = (props) => {
  const classes = useStyles();
  const {container} = props; //propsを連想配列にしていれる
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");

  const inputKeyword = useCallback((event) => {
    setKeyword(event.target.value)
  }, [setKeyword]);

  const handleSignOut = (event) => {
    dispatch(signOut());
    props.onClose(event)
  }

  //★カテゴリーをクリックすることで、URLに対してクエリーパラメータが付与さるようになる ➡︎ （例: http://localhost:3000/?category=outer）
  //path = menu定数のvalue:〜 の値
  const selectMenu = (event, path) => {
    dispatch(push(path));
    props.onClose(event);
  }

  const menus = [
    { func: selectMenu, label: "トップページ", icon: <HomeIcon/>, id:"toppage", value: "/" },
    { func: selectMenu, label: "商品登録",     icon: <AddCircleIcon />, id:"register", value: "/product/edit" },
    { func: selectMenu, label: "注文履歴",     icon: <HistoryIcon />,   id:"history",  value: "/order/history/" },
    { func: selectMenu, label: "プロフィール", icon: <PersonIcon />,    id: "profile", value: "/user/mypage" }
  ];

  //★カテゴリーをクリックすることで、URLに対してクエリーパラメータが付与さるようになる ➡︎ （例: http://localhost:3000/?category=outer）
  const [filters, setFilters] = useState([
    { func: selectMenu, label: "すべて", id: "all", value: "/" },
    { func: selectMenu, label: "メンズ", id: "male", value: "?gender=male" },
    { func: selectMenu, label: "レディース", id: "female", value: "/?gender=female" },
    { func: selectMenu, label: "キッズ", id: "child", value: "/?gender=child" }
  ]);

  //`` ➡︎ で括ると文字列の中にJavaScriptを埋め込めるようになる
  //(prevState => [...prevState, ...list]) []で新しい配列を生成している → prevStateで更新前(メンズ…の項目)を取得し、更にlistに入れた新しい項目(トップス、アウター…)を続けて表示させている
  useEffect(() => {
    db.collection("categories").orderBy("order", "asc").get()
      .then(snapshots => {
        const list = [];
        snapshots.forEach(snapshot => {
          const category = snapshot.data();
          list.push({func: selectMenu, label: category.name, id: category.id, value: `/?category=${category.id}`})
        })
        setFilters(prevState => [...prevState, ...list])
      })
  }, []);

  return (
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant="temporary" //"temporary"でメニューの出入れ設定
        anchor="right" //メニューが右側から出る
        open={props.open}
        onClose={(event) => props.onClose(event)}
        classes={{ paper: classes.drawerPaper }} //useStylesのデザインの適用
        ModalProps={{keepMounted: true}} //この設定でメニューを開いた時のパフォーマンスが向上する
      >
        <div
          onClose={(event) => props.onClose(event)}
          onKeyDown={(event) => props.onClose(event)}
        >
          <div className={classes.searchField}>
            <TextInput>
              fullWidth={false} label={"検索キーワード"} multiline={false} onChange={inputKeyword} required={false} rows={1} value={keyword} type={"text"}
            </TextInput>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {menus.map(menu => (
              <ListItem button key={menu.id} onClick={(event) => menu.func(event, menu.value)} >
                <ListItemIcon>
                  {menu.icon}
                </ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            <ListItem button key="logout" onClick={(event) => handleSignOut(event)} >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"Log Out"} />
            </ListItem>
          </List>
          <Divider />
          <List>
            {filters.map(filter => (
              <ListItem
                button
                key={filter.id}
                onClick={(event) => filter.func(event, filter.value)}
              >
              <ListItemText primary={filter.label} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </nav>
  )
};

export default ClosableDrawer;
