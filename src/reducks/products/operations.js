import React from "react";
import { push } from "connected-react-router";
import { db, FirebaseTimestamp } from "../../firebase";
import { fetchProductsAction, deleteProductAction } from "./actions"

//『collection("")』の（""）はデータの登録するカラム名のこと 今回の場合はFirebaseの「productsという名前のコレクションのカラムを作成し、カラムの先にデータを入れなさい」ということになる
const productsRef = db.collection("products");

//getState()により、現時点でのproductsを取得する。その後、filterメソッドで該当する商品情報を配列から削除し、deleteProductAction ()に渡す
export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    productsRef.doc(id).delete()
      .then(() => {
        const prevProducts = getState().products.list;
        const nextProducts = prevProducts.filter(product => product.id !== id)
        dispatch(deleteProductAction(nextProducts))
      })
  }
}

//desc = 降順(更新日付が新しいもの順)
//snapshots = 〜.orderBy()で取得できた値が入っている
export const fetchProducts = () => {
  return async (dispatch) => {
    productsRef.orderBy("updated_at", "desc").get()
      .then(snapshots => {
        const productList = [];

        snapshots.forEach(snapshot => {
          const product = snapshot.data();

          productList.push(product);
        })
        dispatch(fetchProductsAction(productList))
      })
  }
}

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
    //＊ const id = ref.id として、『const』は付けないこと 付けてしまうと、引数で渡ってきたidが渡らなくなってしまい、新しいidが定義されたこととなり、新規にidがここで生成されてしまい、エラーとなる
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
