import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../components/Products/index"
import { fetchProducts } from "../reducks/products/operations";
import { getProducts } from "../reducks/products/selectors"

//『クエリパラメーター = URLの /?category=outer 部分』を取得する
  //「selector.router.location.search」によって、「?category=outer」の部分が取得できる ＊selectorは元々『query情報』を持っているので引き出せる
// /^\?gender=/.test(query) → 「^」＝ 正規表現で「先頭の〜」を表す  .test()メソッドは、一度検証（確認）を行う 今回は、「取得したqueryの先頭がgender= か.test(query)として検証してtrueならば、定数genderへ入れ込む」

const ProductList = () => {
  const dispatch = useDispatch();
  //⬇️Store全体の値を取得してから…
  const selector = useSelector((state) => state);
  //⬇️Store全体から、商品のStoreデータだけをselectors.jsのgetProducts関数を使って取り出している
  const products = getProducts(selector);

  const query = selector.router.location.search;
  const gender = /^\?gender=/.test(query) ? query.split("?gender=")[1] : "";
  const category = /^\?category=/.test(query) ? query.split("?category=")[1] : "";

  // *(didMount) [query]を指定することで、選択したgenderやcategoryが変更される度に表示されるデータが変更される仕組みが動く
  useEffect(() => {
    dispatch(fetchProducts(gender, category))
  }, [query]);

  return (
    <section className="c-section-wrapin" >
      <div className="p-grid__row">
        {products.length > 0 && (
          products.map(product => (
            <ProductCard
              key={product.id} id={product.id} name={product.name} images={product.images} price={product.price}
            />
          ))
        )}
      </div>
    </section>
  )
};


export default ProductList;
