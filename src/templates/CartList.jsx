import React, { useCallback } from "react";
import { CartListItem } from "../components/Products";
import List from "@material-ui/core/List";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import {getProductsInCart} from "../reducks/users/selectors"
import { PrimaryButton, GreyButton} from "../components/UIkit/index";
import { push } from "connected-react-router";


const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    maxWidth: 512,
    width: "100%"
  },
}));

const CartList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const productsInCart = getProductsInCart(selector);

  //useCallback(() => {}, []) ➡︎ マウント＋アンマウント時のみ実行
  const goToOrder = useCallback(() => {
    dispatch(push("/order/confirm"));
  }, []);

  const backToTop = useCallback(() => {
    dispatch(push("/"))
  }, [])

  return (
    <section className="c-section-wrapin" >
      <h2 className="u-text__headline">カート</h2>
      <List className={classes.root}>
        {productsInCart.length > 0 ? (
          productsInCart.map(product => <CartListItem product={product} key={product.cartId} />)
        ) : (
          <div className="alert-color-red">カート内に商品がありません</div>
        )}
      </List>
      <div className="module-spacer--medium" />
      <div className="p-grid__column" >
        {productsInCart.length > 0 && (
        <PrimaryButton label={"レジへ進む"} onClick={goToOrder} />
        )}
        <div className="module-spacer--extra-extra-small" />
        <GreyButton label={"お買い物を続ける"} onClick={backToTop} />
      </div>
    </section>
  )
};

export default CartList;
