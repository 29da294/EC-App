import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import NoImage from "../../assets/img/src/no_image.png";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { deleteProduct } from "../../reducks/products/operations";


//((theme) => (){})コールバック関数➡︎ Matrial - UIのthemeファイルを使うため ➡︎ 色やブレークポイント（一定のpxまで行ったら折り返しするという指定）ができるようになる
//down("sm") ➡︎ sm=スマフォサイズ（570px）以下なら適用 up("sm")はその逆
//calc(33.333% - 32x) カラムの幅を%で指定し、且つカラム間の余白を固定にしたい場合 均一のpxの間隔で、均等な3カラムを配置することができます。
const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      margin: 8,
      width: "calc(50% - 16px)"
    },
    [theme.breakpoints.up("sm")]: {
      margin: 16,
      width: "calc(33.333% - 32px)"
    }
  },
  content: {
    display: "flex",
    padding: "16px 8px",
    textAlign: "left",
    "&:last-child": {
      paddingBottom: 16
    }
  },
  media: {
    height: 0,
    paddingTop: "100%"
  },
  price: {
    color: theme.palette.secondary.main,
    fontSize: 16
  }
}));

const ProductCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  };

  const handleClose = () => {
    setAnchorEl(null)
  };

  //画像の登録の有無を確認
  const images = (props.images.length > 0) ? props.images : [{path: NoImage}]
  //toLocaleString()で数字を「,」で3桁区切りを加えられる
  const price = props.price.toLocaleString();

  return (
    <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={images[0].path}
          title=""
          onClick={() => dispatch(push("/product/" + props.id))}
        />
      <CardContent className={classes.content}>
        <div onClick={() => dispatch(push("/product/" + props.id))}>
          <Typography color="textSecondary" component="p">
            {props.name}
          </Typography>
          <Typography className={classes.price} component="p" >
            ¥{price}
          </Typography>
        </div>
        <IconButton onClick={handleClick} >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
        <MenuItem
            onClick={() => {
              dispatch(push("/product/edit/"+props.id))
              handleClose()
          }}
          >
            編集する
        </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(deleteProduct(props.id))
              handleClose()
            }}
          >
            削除する
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  )
};

export default ProductCard;
