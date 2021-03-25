//『Actions』という名前をつけて、『actionsファイル内』のモジュールを全てここへ、importする
//initialStateもimportする
import * as Actions from "./actions";
import initialState from "../store/initialState";


export const UsersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case Actions.SIGN_IN:
      return {
        ...state,
        ...action.payload
        //スプレット構文で書かない場合の書き方⬇️
        //isSignedIn: action.payload.uid
        //uid: action.payload.uid
        //username: action.payload.username
      }
    case Actions.SIGN_OUT:
      return {
        ...action.payload
      }
    default:
      return state
  }
}

//const UsersReducer = (state = 【第1引数】には『初期値』を指定する  基本的に第ｎ一引数のstateには、『現在のstoreの状態』を受け取るようにしておく！ もし、受け取れてなくても『デフォルトの値として』設定しておいている
//【第2引数】には『action.jsファイル＝action で  return した値』を受け取っている（受け取るようにしている）  『action』はReducerが呼び出される時の『アクション』ということであり、この中には『呼び出したい内容がまとまったオブジェクトが詰まっている』)
//『action.type』は「actions.js」の中で宣言した、例えば、『関数:signInActionであれば、type:"SIGN_IN",』などと指定した、『呼び出す情報のtype = 種類』を指し示し、『type = 種類ごとに処理を行うようにせよ！』と識別できるように記述している
//よって、switch(action.type) => {case Actions.SIGN_IN: 〜} のswitch文で、データの『type』ごとに行う処理を分岐させて処理しているロジックとなっている！ つまり、『Actionsのtypeに応じて、switch文で、stateをどのように変更するのか振り分けて、決定しているロジック』と言える！
//return{ }の中で、stateをどうするのか決めている どれを『{}で括ってオブジェクトにして』『...スプレット構文で展開している』！
//『action.payload』とは『actions.js』で書いた『payload:{}の{}の中身のことである！』

//★【ポイント】：『Reducers』は『stores』の状態を『⚠︎上書きしてしまう！』という点に注意すること！！ この時、⚠︎『指定されていないフィールドは消えてしまう』ことにまたまた注意すること！！
//但し、『...state,』を記述しているため、例えば、initialStateの中身を『icon: "", isSingedIn: false, uid: "", username: ""』指定していて、スプレット構文で展開しておく  更に『...action.payload』でデータの中身を展開しておく  ★この時、『Reducerは、『state と action.payloadで被ったデータの項目があったら、』後から記述した内容のものに、更新していくルールがある』ので、この例の場合、差分で残った『state の icon=""』は消えずに、このまま項目として残るように上手く処理されるのである！
//★つまり、展開して残るデータ項目は『icon: "", isSignedIn: action.payload.uid, uid: action.payload.uid, username: action.payload.username』となり、『iconの項目はそのまま残る！』
//★つまり、『stateにはある！』けど、『actions.js = action.payload には無いよ〜！』というもの、すなわち、『stateにはあるものを残すせる』ようになる！
//これが、わざわざ初期値を引数に渡して書いている理由である ➡︎『...state,...action.payload』と書くことで上書きの削除（更新されてしまうこと）を防ぎながら『storeの中の状態も削除せずに』変更を行える！
