import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { saveProduct } from "../reducks/products/operations";
import { PrimaryButton, SelectBox, TextInput } from "../components/UIkit";


const ProductEdit = () => {
  const dispatch = useDispatch();

  const
    [name, setName] = useState(""),
    [description, setDescription] = useState(""),
    [category, setCategory] = useState(""),
    [gender, setGender] = useState(""),
    [price, setPrice] = useState("");

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

  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品登録・編集</h2>
      <div className="c-section-container">
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
      </div>
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton
          label={"商品情報を保存"}
          //onClick={() => {console.log("Clicked!")}}
          onClick={() => dispatch(saveProduct(name, description, category, gender, price))}
        />
      </div>
    </section>
  )
}

export default ProductEdit;
