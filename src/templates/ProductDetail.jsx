import React, {useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db, FirebaseTimestamp } from "../firebase";
import HTMLReactParser from "html-react-parser";
import { addProductsToCart, addProductsToFavorite } from "../reducks/users/operations";
import { ImageSwiper } from "../components/Products/index";
import { AutorenewTwoTone } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import { SizeTable } from "../components/Products/index";
import { getUserId } from "../reducks/users/selectors";

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
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const uid = getUserId(selector);
  const path = selector.router.location.pathname;
  const id = path.split("/product/")[1];

  // useEffect(() => {}) で取得してきたデータ ➡︎ setProduct()を経由して productに入る
  const [product, setProduct] = useState(null);
  const favoriteList = [];
  const favorite = [];

  // 第二引数 ＝ []が空の時は、マウントとアンマウントの時（コンポーネントが配置された直前と破棄される時）に、第一引数の関数＝productデータの取得が実行される
  // (id) ＝ 上記で取得した商品ごとのpath → 「docの中のdata」にpathが入っているので、doc.data()
  useEffect(() => {
    db.collection("products").doc(id).get().then(doc => {
        const data = doc.data()
        setProduct(data)
      })
  }, []);

  useEffect(() => {
    db.collection("users").doc(uid).collection("favorites").get().then(snapshots => {
        snapshots.forEach(snapshot => {
          favoriteList.push(snapshot.data())
          favoriteList.map(favo =>
            favorite.push(favo.size));
        })
      })
  }, [favoriteList]);



  //上記の[product,setProduct]が最初のマウント時と変化する度に実行する  カートに入れたい商品の情報を配列にして生成し、addProductToCart()へ渡す関数として、addProducts()を定義
  //selectSize ＝ SizeTable.jsx：IconButton onClick={() => props.addProduct(size.size)} ➡︎ 選択したサイズのカートアイコンをクリックした値(size.sizeのサイズ情報)が入ってくる
  const addProduct = useCallback((selectedSize) => {
    const timestamp = FirebaseTimestamp.now();
    dispatch(addProductsToCart({
      added_at: timestamp,
      description: product.description,
      gender: product.gender,
      images: product.images,
      name: product.name,
      price: product.price,
      productId: product.id,
      quantity: 1,
      size: selectedSize
    }))
  }, [product]);


  //お気に入りリスト登録-重複する商品はアラートでお知らせ
  const addFavorite = useCallback((selectedSize) => {
    let alreadyFavorite = "";

    for (const fav of favorite) {
      if (fav === selectedSize.size) {
        alreadyFavorite = fav;
      }
    };

    if (alreadyFavorite === selectedSize.size) {
      alert("この商品とサイズの組み合わせは、既に登録されています。")
    } else {
      const timestamp = FirebaseTimestamp.now();
      dispatch(addProductsToFavorite({
        added_at: timestamp,
        description: product.description,
        gender: product.gender,
        images: product.images,
        name: product.name,
        price: product.price,
        productId: product.id,
        quantity: selectedSize.quantity,
        size: selectedSize.size,
      }))
    }
  }, [product]);

  // product.~ ➡︎ productはuseEffectで取得して、productに格納したproductからデータを取り出している
  //toLocaleString() ➡︎ 数字（値段）の3桁区切り点をいれる(,)
  //配列には、サイズの情報も必要になるため、addProducts()をuseCallback()で定義した上で、子コンポーネントの<SizeTable>へも渡す
  return (
    <section className="c-section-wrapin" >
      {product && (
        <div className="p-grid__row" >
          <div className={classes.sliderBox} >
            <ImageSwiper images={product.images} />
          </div>
          <div className={classes.detail} >
            <h2 className="u-text__headline">{product.name}</h2>
            <p className={classes.price}>{"¥" + product.price.toLocaleString()}</p>
            <div className="module-spacer--samll"></div>
            <SizeTable addProduct={addProduct} addFavorite={addFavorite} sizes={product.sizes} />
            <div className="module-spacer--medium"></div>
            <p>{returnCodeToBr(product.description)}</p>
          </div>
        </div>
      )}
    </section>
  )
};

export default ProductDetail;
