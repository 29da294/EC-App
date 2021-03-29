import React from "react";
import { push } from "connected-react-router";
import { db, FirebaseTimestamp } from "../../firebase";


//『collection("")』の（""）はデータの登録するカラム名のこと 今回の場合はFirebaseの「productsという名前のコレクションのカラムを作成し、カラムの先にデータを入れなさい」ということになる
const productsRef = db.collection("products");

export const saveProduct = (id, name, description, category, gender, price, images, sizes) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now()

    const data = {
      name: name,
      description: description,
      category: category,
      gender: gender,
      price: parseInt(price, 10),
      images: images,
      sizes: sizes,
      updated_at: timestamp
    }

    //新規idの発行は、「新規登録」のときのみとしたいので、if (id === "") {}で条件分岐させる
    if (id === "") {
      //DB内で自動採番されるIDを取得している
      const ref = productsRef.doc()
      id = ref.id
      data.id = id
      data.created_at = timestamp;
    }

    //自動採番されたIDを保存したい商品内容と一緒に登録する
    //returnで.set(data, {merge: true})とすることで、既存のフィールド値はそのまま、変更箇所のみを更新する、という操作が可能になる
    return productsRef.doc(id).set(data, {merge: true})
      .then(() => {
        dispatch(push("/"))
      }).catch ((error) => {
        throw new Error(error)
      })
  }
}
