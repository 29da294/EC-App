import React, {useCallback, useMemo} from "react";
import { CartListItem } from "../components/Products/index";
import Divider from "@material-ui/core/Divider";
import { getProductsInCart } from "../reducks/users/selectors";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/styles";
import { orderProduct } from "../reducks/products/operations";
import { PrimaryButton, TextDetail } from "../components/UIkit/index";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  detailBox: {
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      width: 320
    },
    [theme.breakpoints.up("sm")]: {
      width: 512
    },
  },
  orderBox: {
    border: "1px solid rgba(0,0,0,0,2)",
    borderRadius: 4,
    boxShadow: "0 4px 2px 2px rgba(0,0,0,0,2)",
    height: 256,
    margin: "24px auto 16px auto",
    padding: 16,
    width: 288
  },
}));

//useMemo(() => {},[productsInCart]) 関数の結果を保持するためのフック。何回やっても結果が同じ場合の値などを保存(メモ化)し、そこから値を再取得する 不要な再計算をスキップするので、パフォーマンスの向上が期待できる useCallbackは関数自体をメモ化 ⇄ useMemoは関数の「結果」を保持する []に値を入れることでproductsInCartが変化あった時だけ関数を再実行する
//reduce(() => {}) 第1引数には「蓄積値」＝配列要素を順番に処理していった値が格納されている 第2引数の「要素」は現在処理されている配列要素 最後の「,0」はinitialValueと言って、初期値を決めて入れておくこの関数内で「return」を使い、任意の処理を返すことで累積値に結果が保持されて最終的に1つの値となって取得できる
//const order = useCallback(() => {dispatch(orderProduct(productsInCart, total)) products/operations.js内の「orderProduct = (productsInCart, amount(合計金額のこと)) => {}」を呼び出して「注文確定処理」を完了させる

const OrderConfirm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const productsInCart = getProductsInCart(selector);

  const subtotal = useMemo(() => {
    return productsInCart.reduce((sum, product) => sum += product.price, 0)
  }, [productsInCart]);

  const shippingFee = (subtotal >= 10000) ? 0 : 210;
  const tax = (subtotal + shippingFee) * 0.1;
  const total = subtotal + shippingFee + tax;

  //useCallback(() => (), []) 最初のマウント時と『与えられた値に変化があった時』再実行する
  const order = useCallback(() => {
    dispatch(orderProduct(productsInCart, total))
  }, [productsInCart, total])

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text--headline">ご注文の確認</h2>
      <div className="p-grid__row">
        <div className={classes.detailBox}>
          <List>
            {productsInCart.length > 0 && (
              productsInCart.map((product) => <CartListItem product={product} key={product.cartId} />)
            )}
          </List>
        </div>
        <div className={classes.orderBox}>
          <TextDetail label={"商品合計"} value={"¥" + subtotal.toLocaleString()} />
          <TextDetail label={"消費税"} value={"¥" + tax.toLocaleString()} />
          <TextDetail label={"送料"} value={"¥" + shippingFee.toLocaleString()} />
          {subtotal >= 10000 && (
          <TextDetail value={"＊商品合計1万円以上で送料無料＊"} />
          )}
          <Divider />
          <div className="module-spacer--extra-small" />
          <TextDetail label={"合計(税込)"} value={"¥" + total.toLocaleString()} />
          <PrimaryButton label={"注文を確定する"} onClick={order} />
        </div>
       </div>

    </section>
  )
};


export default OrderConfirm;
