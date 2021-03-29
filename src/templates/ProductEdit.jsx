import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { db } from "../firebase";
import { saveProduct } from "../reducks/products/operations";
import { PrimaryButton, SelectBox, TextInput } from "../components/UIkit";
import { ImageArea, SetSizeArea } from "../components/Products/index";

const ProductEdit = () => {
  const dispatch = useDispatch();

//split("product/edit")[1]で、[1]をつけるのか？ ➡︎       /product/edit/(保存済みの products の id（例:abcdefgh）) だとすると ➡︎ splitで分割して出力すると「”/”, id(例:abcdefgh) 」となるため、2つ目 ＝[1]を指定する

  let id = window.location.pathname.split("/product/edit")[1];
  console.log("Before split", id);

  if (id !== "") {
    id = id.split("/")[1]
    console.log("After split", id);
  }

  const
    [name, setName] = useState(""),
    [description, setDescription] = useState(""),
    [category, setCategory] = useState(""),
    [gender, setGender] = useState(""),
    [price, setPrice] = useState(""),
    [images, setImages] = useState([]),
    [sizes, setSizes] = useState([]);

  //set〜系に値をセットしていく関数 onClick や onChangeなどのイベントのporpsに渡す経由で行う
  const inputName = useCallback((event) => {
    setName(event.target.value)
  }, [setName])

  const inputDescription = useCallback((event) => {
    setDescription(event.target.value)
  }, [setDescription])

  const inputPrice = useCallback((event) => {
    setPrice(event.target.value)
  }, [setPrice])

  const categories = [
    { id: "top", name: "トップス" },
    { id: "shirt", name: "シャツ" },
    { id: "bottom", name: "ボトム" },
    { id: "knit", name: "ニット" },
    { id: "outer", name: "アウター" },
    { id: "onepice", name: "ワンピース" },
    { id: "skirt", name: "スカート" },
    { id: "bag&luggage", name: "バッグ＆ラゲッジ" },
    { id: "shoes", name: "シューズ" },
    { id: "underwear", name: "肌着" },
    { id: "watch", name: "時計" },
    { id: "wallet", name: "財布" },
    { id: "accessories", name: "アクセサリー" },
  ]

  const genders = [
    { id: "all", name: "すべて" },
    { id: "male", name: "メンズ" },
    { id: "female", name: "レディース" },
    { id: "child", name: "キッズ" }
  ]

  //第2引数に[id]をとることで、URLのidが切り替わった時のみ、Cloud Firestoreから切り替わったidのデータを取得するようにすることで効率的、かつ負担が少なく表示されるようになる
  useEffect(() => {
    if (id !== "") {
      db.collection("products").doc(id).get()
        .then(snapshot => {
          const data = snapshot.data();
          setImages(data.images);
          setName(data.name);
          setDescription(data.description);
          setGender(data.gender);
          setCategory(data.category);
          setPrice(data.price);
          setSizes(data.sizes)
        })
    }
  }, [id]);

  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品登録・編集</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages} />
        <TextInput
            fullWidth={true} label={"商品名"} multiline={false} reqired={true} onChange={inputName} rows={1} value={name} type={"text"}
        />
        <TextInput
            fullWidth={true} label={"商品説明"} multiline={true} reqired={true} onChange={inputDescription} rows={5} value={description} type={"text"}
          />
        <SelectBox
          label={"カテゴリー"} required={true} options={categories} select={setCategory}
        />
        <SelectBox
          label={"性別"} required={true} options={genders} select={setGender}
        />
        <TextInput
            fullWidth={true} label={"価格"} multiline={false} reqired={true} onChange={inputPrice} rows={1} value={price} type={"number"}
          />
        <div className="module-spacer--medium" />
        <SetSizeArea sizes={sizes} setSizes={setSizes} />
        <div className="module-spacer--medium" />
        <div className="center">
          <PrimaryButton
            label={"商品情報を保存"}
            onClick={() => dispatch(saveProduct(id, name, description, category, gender, price, images, sizes))}
          />
        </div>
      </div>
    </section>
  )
}

export default ProductEdit;
