import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import HTMLReactParser from "html-react-parser";
import { ImageSwiper } from "../components/Products/index";
import { AutorenewTwoTone } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import { SizeTable } from "../components/Products/index";

//sm ➡︎ 600px(スマフォサイズ)  auto左右 ➡︎ 中央揃え height,width:320 ➡︎ iPhon SEの画面サイズを基準に合わせる
const useStyles = makeStyles((theme) => ({
  sliderBox: {
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto 24px auto",
      height: 320,
      width: 320
    },
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto",
      height: 400,
      width: 400
    }
  },
  detail: {
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto 16px auto",
      height: "auto",
      width: 320
    },
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto",
      heigth: "auto",
      width: 400
    }
  },
  price: {
    fontSize: 36
  }
}));


//returnCodeToBr()で、改行コード\nを、改行のHTMLタグ<br />に変換している この関数に用いているhtml-react-parserはnpmからコマンドでインストールする ＊Reactの中では改行コード\nは、ただの空白になるので変換が必要
//HTMLReactParser() ➡︎ Reactの中でHTMLタグを使えるようにするメソッド
const returnCodeToBr = (text) => {
  if (text === "") {
    return text
  } else {
    return HTMLReactParser(text.replace(/\r?\n/g, "<br/>"))
  }
};

const ProductDetail = () => {

  //Storeのstateを参照するフックはuseSelector()
  //『ReduxのStore』で管理している、『Routingのlocation』という中に、pathnameというものがあり、その中にURLの一部である「/product/商品ごとのid」が入っている
  //path.split("/product/") ➡︎ [0]= product   [1]= 商品毎のid
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const path = selector.router.location.pathname;
  const id = path.split("/product/")[1];

  // useEffect(() => {}) で取得してきたデータ ➡︎ productに入る
  const [product, setProduct] = useState(null);

  // 第二引数 ＝ []が空の時は、マウントとアンマウントの時（コンポーネントが配置された直前と破棄される時）に、第一引数の関数＝productデータの取得が実行される
  useEffect(() => {
    db.collection("products").doc(id).get()
      .then(doc => {
        const data = doc.data();
        setProduct(data);
      })
  }, []);

  // product.~ ➡︎ productはuseEfftectで取得して、productに格納したproductからデータを取り出している
  //toLocaleString() ➡︎ 数字（値段）の3桁区切り点をいれる(,)
  return (
    <section className="c-section-wrapin" >
      {product && (
        <div className="p-grid__row" >
          <div className={classes.sliderBox} >
            <ImageSwiper images={product.images} />
          </div>
          <div className={classes.detail} >
            <h2 className="u-text__headline">{product.name}</h2>
            <p className={classes.price}>{product.price.toLocaleString()}</p>
            <div className="module-spacer--samll"></div>
            <SizeTable sizes={product.sizes} />
            <div className="module-spacer--medium"></div>
            <p>{returnCodeToBr(product.description)}</p>
          </div>
        </div>
      )}
    </section>
  )
};

export default ProductDetail;
