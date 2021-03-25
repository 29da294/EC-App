import React from "react";
import { push } from "connected-react-router";
import { db, FirebaseTimestamp } from "../../firebase";


//『collection("")』の（""）はデータの登録するカラム名のこと 今回の場合はFirebaseの「productsという名前のコレクションカラムの先にデータを入れなさい」ということになる
const productsRef = db.collection("products");

export const saveProduct = (name, description, category, gender, price) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now()

    const data = {
      name: name,
      description: description,
      category: category,
      gender: gender,
      price: parseInt(price, 10),
      updated_at: timestamp
    }

    const ref = productsRef.doc() //DB内で自動採番されるIDを取得している
    const id = ref.id
    data.id = id
    data.created_at = timestamp;

    //自動採番されたIDを保存したい商品内容と一緒に登録する
    return productsRef.doc(id).set(data)
      .then(() => {
        dispatch(push("/"))
      }).catch ((error) => {
        throw new Error(error)
      })
  }
}
