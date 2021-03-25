//firebase を使用するのに必要ものをimportする

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import { firebaseConfig } from "./config";
//⬆︎ firebsase/confing.js での設定をimport
//⬇️ そして、改めて⬇️のコードで⬆︎でimportした設定を使って、firebaseを初期化している = 『これで,このReactの中でfirebaseが使えるようになる』
firebase.initializeApp(firebaseConfig);

//ここで記述を省略できるようにしてコードを簡潔にするためのfirebseの定数を仕込んでおいて便利にする！
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();
export const FirebaseTimestamp = firebase.firestore.Timestamp; //データの取得や作成した日時を取得する
