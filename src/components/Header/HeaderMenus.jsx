import React, { useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";
import { getProductsInCart, getProductsInFavorite, getUserId } from "../../reducks/users/selectors";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../../firebase";
import { push } from "connected-react-router";
import { fetchProductsInCart, fetchProductsInFavorite } from "../../reducks/users/operations";


// return文の中身は1つのHTML要素である必要があるので、<>...</>で全体を囲む
// <Badge>コンポーネントで Icon をラッピングすることで、Icon の右肩に数値を表示させることができる。一旦、badgeContent={3}としてダミーの数値を表示させる。 最終的にはここに「カートに入れた商品数」が入る

//MenuIconをクリックした時に、Drawerメニューが開くよう、onClickイベントにhandleDrawerToggle()を設置 ➡︎ (event)でhandleCloseToggle（）関数へクリックのtrue,falseの切り替えの値を送り込み、openのStateを切り替えている ➡︎ (setOpen(!open))
const HeaderMenu = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);

  let productsInCart = getProductsInCart(selector);
  let productsInFavorite = getProductsInFavorite(selector);


  //product = change.doc.data() ➡︎ カートに入った商品情報たちが取得されて入っている(ProductDetail.jsx:addProduct()=>{})
  //snapshots = cartサブコレクション(cartカラム）の全てのデータ
  //case "modified" ➡︎ カートの中の商品IDと返納のあったもののIDが一致した時、そのIDのindex番号のカラムにある商品データを、新しい商品のデータに置き換えている(例:Mサイズ 数量2 → 4つへ変更等)
  //case "removed": ➡︎ 削除対象として一致しないIDのものだけ取り出して、新しく表示させる ＊データ自体を直接削除しない
  //return () => unsubscribe() ➡︎ コンポーネントの描画が終了したタイミングでリスナー監視が解除されるようになる(これを設定しないと、該当コンポーネントの再描画するたびにリスナーが2つも3つも作成・実行されることになり、動作処理が大変なことになる
  //fetchProductsInCart(productsInCart) ➡︎ switchで変更した内容を元に（これが引数productsInCart）、Storeを更新するための関数

  useEffect(() => {
    const unsubscribe = db.collection("users").doc(uid)
      .collection("carts").onSnapshot(snapshots => {
      snapshots.docChanges().forEach(change => {
        const product = change.doc.data();
        const changeType = change.type;
        console.log({商品名:product.name, サイズ:product.size , タイプ:changeType })

        switch (changeType) {
          case "added":
            productsInCart.push(product);
            break;
          case "modified":
            const index = productsInCart.findIndex(product.cartId === change.doc.id);
            productsInCart[index] = product;
            break;
          case "removed":
            productsInCart = productsInCart.filter(product => product.cartId !== change.doc.id);
            break;
          default:
            break;
        }
      });
      dispatch(fetchProductsInCart(productsInCart))
    });

    return () => unsubscribe()
  }, []);


  useEffect(() => {
    const unsubscribe = db.collection("users").doc(uid).collection("favorites").onSnapshot(snapshots => {
        snapshots.docChanges().forEach(change => {
          const product = change.doc.data();
          const changeType = change.type;

          switch (changeType) {
            case "added":
              productsInFavorite.push(product);
              break;
            case "modified":
              const index = productsInFavorite.findIndex(product => product.favoriteId === change.doc.id)
              productsInFavorite[index] = product;
              break;
            case "removed":
              productsInFavorite = productsInFavorite.filter(product => product.favoriteId !== change.doc.id)
              break;
            default:
              break;
          }
        });
        dispatch(fetchProductsInFavorite(productsInFavorite))
      });
    return () => unsubscribe();
  }, []);


  return (
    <>
      <IconButton onClick={() => dispatch(push("/cart"))} >
        <Badge badgeContent={productsInCart.length} color="primary" >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton onClick={() => dispatch(push("/user/favorite"))} >
        <Badge badgeContent={productsInFavorite.length} color="primary">
          <FavoriteBorderIcon />
        </Badge>
      </IconButton>
      <IconButton>
        <MenuIcon onClick={(event) => props.handleDrawerToggle(event)}  />
      </IconButton>
    </>
  )
};

export default HeaderMenu;
