import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../components/Products/index"
import { fetchProducts } from "../reducks/products/operations";
import { getProducts } from "../reducks/products/selectors"

const ProductList = () => {
  const dispatch = useDispatch();

  //⬇️Store全体の値を取得してから…
  const selector = useSelector((state) => state);
  //⬇️Store全体から、商品のStoreデータだけをselectors.jsのgetProducts関数を使って取り出している
  const products = getProducts(selector);

  // *(didMount)
  useEffect(() => {
    dispatch(fetchProducts())
  }, []);

  console.log(products)

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
