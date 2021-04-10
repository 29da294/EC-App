import React, { useCallback, useEffect, useState } from "react";
import { addProductsToCart } from "../reducks/users/operations";
import { db } from "../firebase/index";
import FavoriteListItem from "../components/Products/FavoriteListItem"
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { getProductsInFavorite } from "../reducks/users/selectors";
import { SecondaryButton } from "../components/UIkit";
import { push } from "connected-react-router";
import { FirebaseTimestamp } from "../firebase";


const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    maxWidth: 512,
    width: "100%"
  },
}));

const FavoriteList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const productsInFavorite = getProductsInFavorite(selector);

  const goToCart = useCallback(() => {
    return dispatch(push("/cart/"))
  });

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline" >お気に入りリスト</h2>
      <List className={classes.root}>
        {productsInFavorite.length > 0 && (
          productsInFavorite.map(product =>
            <FavoriteListItem product={product} key={product.favoriteId} /> )
        )}
      </List>
      <div className="module-spacer--medium" />
      <div className="p-grid__column">
        <SecondaryButton label={"カートを確認する"} onClick={goToCart}/>
      </div>
    </section>
  )
};

export default FavoriteList;
