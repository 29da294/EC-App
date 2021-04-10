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
//let query = productsRef.orderBy("updated_at", "desc")で、DBでクエリを使うための準備を行う構文宣言
//where クエリを検索するための条件を追加している genderカテゴリが選択されていたら、選択された一致するgenderタイプを加える条件を追加して、DBからデータを絞り込むロジックを展開せよということになる → SQLでも『where句』で検索する条件を追加するので同じようなものと考えるといい → （"DBのカラム" "== は等しいという条件" 受け取った引数）
export const fetchProducts = (gender, category) => {
  return async (dispatch) => {
    let query = productsRef.orderBy("updated_at", "desc");
    query = (gender !== "") ? query.where("gender","==",gender) : query;
    query = (category !== "") ? query.where("category", "==", category) : query;

    query.get()
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


//amount = 合計金額 （価格、額）
//for (const product of productsInCart) {〜} ➡︎『選択したサイズの商品の在庫が売り切れていないか確認するロジック』 ➡︎ snapshot定数にDB内にある商品情報から「productsInCart」、つまりカート内の商品（のID）と一致する商品データを取得して格納している ➡︎ その後、data()メソッドを使って対象のIDの商品の、sizesカラムにある登録されているsize情報を全て取得して sizes定数に格納する
//【整理】●product ＝ productsInCartよりfor文で1商品ごとに抽出している「カート内の商品のデータ」 ●定数sizes、map引数ので1商品ずつ抽出しているsize ＝ Firestore（"products"カラム）内の「サイズごとの商品在庫数のデータ」
//soldOutProducts.join("と") → .join()で配列の間に文字列を追加できる
//products.push({}) → 同じ商品の、サイズ違いも1つの商品として、履歴に反映させる ＊products[product.productId]にしてしまうと同じ商品のサイズ違いが反映されなくなってしまうので注意！
//timestamp.toDate() → 現日付のタイムスタンプを、JavaScriptのDateオブジェクトに変換している そこから改めて、下記の newDate(〜)において新しい日付 ＝ 配送日を生成して、また改めてtimestamp化している
//FirebaseTimestamp.fromDate() → 新しいタイムスタンプを生成するためのメソッド → 今回はdate定数に現時点の日付を生成し、そこから＋3日後の日付をタイムスタンプとして生成して配送日の定数に格納している

export const orderProduct = (productsInCart, amount) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const userRef = db.collection("users").doc(uid);
    const timestamp = FirebaseTimestamp.now();

    let products = [],
        soldOutProducts = [];

    const batch = db.batch();

    //SOLD OUT Check_Alert & Stock＿Control(-1)
    for (const product of productsInCart) {
      const snapshot = await productsRef.doc(product.productId).get();
      const sizes = snapshot.data().sizes;


      const updatedSizes = sizes.map(size => {
        if (size.size === product.size) {
          if (size.quantity === 0) {
            soldOutProducts.push(product.name);
            return size
          }
          return {
            size: size.size,
            quantity: size.quantity - 1
          }
      } else {
        return size
      }
    });

      //注文商品履歴:オブジェクト型 上記で用意した変数products[]へ注文した商品の詳細データを格納する
      products.push( {
        id: product.productId,
        images: product.images,
        name: product.name,
        price: product.price,
        size: product.size
      } );

      //同一商品(ID)のサイズ違いを同時に購入する場合の在庫減させるための分岐（カート内の商品ID全取得 → 同一商品IDが複数あるかif文でチェック）
      //sizes配列のオブジェクトの在庫の数量を変更する
      let CartProductsIdList = [];

      productsInCart.map(product => {
        const id = product.productId;
        CartProductsIdList.push(id);
        });

      if(CartProductsIdList.includes(product.productId)) {
        productsRef.doc(product.productId).update(
          { sizes: updatedSizes }
        );
      } else {
        batch.update(
          productsRef.doc(product.productId),
          { sizes: updatedSizes }
        );
      };


      //cartsから購入商品を削除する処理をバッチに追加し、まとめて処理
      batch.delete(
        userRef.collection("carts").doc(product.cartId)
      );
    }


    //❶Batch処理 ＋ ❷SOLD OUT商品があった時にアラート発動
    if (soldOutProducts.length > 0) {
      const errorMessage = (soldOutProducts.length > 1) ?
        soldOutProducts.join("と") :
        soldOutProducts[0];
      alert("大変申し訳ございません。" + errorMessage + "の商品の在庫がありません。対象の商品を削除して、再度ご注文をお願いいたします。");
      return false;
    } else {
      //注文完了の処理 ➡︎ Batch書き込み処理
      batch.commit()
        .then(() => {
          const orderRef = userRef.collection("orders").doc();
          const date = timestamp.toDate(); //JS版の現時点の日付取得
          const shippingDate = FirebaseTimestamp.fromDate(new Date(date.setDate(date.getDate() + 3))); //配送日の設定

          const history = {
            amount: amount,
            created_at: timestamp,
            id: orderRef.id,
            products: products, //上記の注文商品履歴の[]
            shipping_date: shippingDate,
            updated_at: timestamp
          };

          orderRef.set(history);

          dispatch(push("/order/completes"));

        }).catch(() => {
          alert("注文処理に失敗しました。通信環境をご確認の上、もう一度お試しください。")
          return false;
        });

    }
  }
}
