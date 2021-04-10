import React from "react";
import { db } from "../../firebase/index";
import Divider from '@material-ui/core/Divider';
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { makeStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";
import { getUserId } from "../../reducks/users/selectors";

//object-fit: cover 縦横のうち小さい方を基準にして自動的に拡大・縮小され、ボックスからはみ出した部分はトリミングされる
const useStyles = makeStyles((theme) => ({
  list: {
    height: 128,
  },
  image: {
    objectFit: "cover",
    margin: 16,
    height: 96,
    width: 96
  },
  text: {
    width: "100%"
  }
}));


const CartListItem = (props) => {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const image = props.product.images[0].path;
  const name = props.product.name;
  const price = props.product.price.toLocaleString();
  const size = props.product.size;

  const removeProductFormCart = (productCartId) => {
    return db.collection("users").doc(uid)
            .collection("carts").doc(productCartId)
            .delete();
  }

  //<Divider /> ➡︎ 横に区切り線を表示できる
  //primary：文字の1次要素（）太字  secondary：文字の2次要素（薄字）
  return (
    <>
      <ListItem className={classes.list}>
        <ListItemAvatar>
          <img className={classes.image} src={image} alt="Product Image" />
        </ListItemAvatar>
        <div className={classes.text}>
          <ListItemText
            primary={name}
            secondary={"サイズ" + size}
          />
          <ListItemText
            primary={"¥" + price}
          />
        </div>
        <IconButton onClick={() => removeProductFormCart(props.product.cartId)} >
          <DeleteIcon/>
        </IconButton>

      </ListItem>
    </>
  )
};

export default CartListItem;
