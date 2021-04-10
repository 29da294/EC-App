import React, { useCallback, useEffect, useState } from "react";
import { addProductsToCart } from "../../reducks/users/operations";
import { db } from "../../firebase/index";
import { FirebaseTimestamp } from "../../firebase";
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { makeStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import IconButton from "@material-ui/core/IconButton";
import { useDispatch,useSelector } from "react-redux";
import { getUserId } from "../../reducks/users/selectors";

const useStyles = makeStyles((theme) => ({
  list: {
    height: 128
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

const FavoriteListItem = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const uid = getUserId(selector);

  const buyProduct = props.product;
  const favoriteId = props.product.favoriteId;
  const image = props.product.images[0].path;
  const name = props.product.name;
  const price = props.product.price;
  const targetSize = props.product.size;
  const quantity = props.product.quantity;

  //残り○点の在庫数量をuseEffect()で在庫変動と同時に取得
  const [stockQuantity, setStockQuantity] = useState(quantity);
  const productId = props.product.productId;

  useEffect(() => {
    db.collection("products").doc(productId).get()
      .then(snapshot => {
        const data = snapshot.data();
        const sizes = data.sizes;
        sizes.map(size => {
          if (targetSize === size.size) {
            setStockQuantity(size.quantity);
          }
        })
    })
  }, [setStockQuantity]);



  const addProductInCart = useCallback((buyProduct) => {
    const timestamp = FirebaseTimestamp.now();
    dispatch(addProductsToCart({
      added_at: timestamp,
      description: buyProduct.description,
      gender: buyProduct.gender,
      images: buyProduct.images,
      name: buyProduct.name,
      price: buyProduct.price,
      productId: buyProduct.productId,
      quantity: 1,
      size: buyProduct.size
    }))
  }, [buyProduct]);


  const removeProductFromFavorite = (favoriteId) => {
    return db.collection("users").doc(uid)
      .collection("favorites").doc(favoriteId)
      .delete()
  };

  return (
    <>
      <ListItem className={classes.list}>
        <ListItemAvatar>
          <img className={classes.image} src={image} alt="Product_Image" />
        </ListItemAvatar>
        <div className={classes.text}>
          <ListItemText
            primary={name}
            secondary={"サイズ" + targetSize}
          />
          <ListItemText
            primary={"¥" + price}
          />
          <ListItemText
            primary={"残り" + stockQuantity +"点"}
          />
        </div>
        {stockQuantity > 0 ? (
          <IconButton onClick={() => addProductInCart(buyProduct)}>
            <ShoppingCartIcon/>
          </IconButton>
        ) : (
          <IconButton>
            <RemoveShoppingCartIcon/>
          </IconButton>
        )}
        <IconButton onClick={() => removeProductFromFavorite(favoriteId)} >
          <DeleteIcon/>
        </IconButton>
      </ListItem>
      <Divider/>
    </>
  )
};

export default FavoriteListItem;
