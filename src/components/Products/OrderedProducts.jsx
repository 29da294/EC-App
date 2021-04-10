import React, { useCallback } from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/listItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/styles";
import { PrimaryButton } from "../UIkit";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";


const useStyles = makeStyles((theme) => ({
  list: {
    background: "#fff",
    height: "auto"
  },
  image: {
    objectFit: "cover",
    margin: "8px 16px 8px 0",
    height: 96,
    width: 96
  },
  text: {
    width: "100%"
  }
}));

const OrderedProducts = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = props.products;

  //商品詳細ページへ、ボタンがクリックされた時のみ遷移させる関数
  const goToProductDetail = useCallback((productId) => {
    dispatch(push("/product/" + productId))
  }, []);

  return (
    <List>
      {products.map(product => (
        <>
          <ListItem className={classes.list} key={product.id}>
            <ListItemAvatar>
              <img
                className={classes.image}
                src={product.images[0].path}
                alt="Product_Image"
              />
            </ListItemAvatar>
            <div className={classes.text}>
              <ListItemText
                primary={product.name}
                secondary={"サイズ:" + product.size}
              />
              <ListItemText
                primary={"¥" + product.price.toLocaleString()}
              />
            </div>
            <PrimaryButton
              label={"商品詳細を見る"}
              onClick={() => goToProductDetail(product.id)}
            />
          </ListItem>
          <Divider />
        </>
      ))}
    </List>
  );
};

export default OrderedProducts;
