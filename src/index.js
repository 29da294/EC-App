import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import createStore from "./reducks/store/store"
import { ConnectedRouter } from "connected-react-router";
import * as History from "history"

//{Provider} と createStore()関数をimportする

//『Store』と『Reactのアプリ』を接続する処理を行う
//❶ 『createStore()関数』（store.jsの）を、まずは実行してやる ➡︎ 実行した結果の出力したデータを『定数store』に入れておく ★更にこのあと別の場所でも使うので『export』もしておく
//❷ <Provider>で、<App/>をラップする
//Providerとは？
//①『props』に『store』を渡す ➡︎ つまり、ラップしたコンポーネントに『storeの情報』を渡す！ ★今回の場合は、『<App />コンポーネントをラップしており、このラップしたことにより、<App />コンポーネントで『store の中の情報を参照できるようになる！』』
//★更に、『このラップしたコンポーネントの中で』『react-reduxの『connect関数』が扱えるようになる ＊下記の②のこと』つまり、今回だと『<App/>コンポーネントの中で「connect関数」が使えるようにしている』ということになる
//◎『connect関数』とは…『React』と『Redux』を『接続して』、『store を変更したり、参照したりできるようにする関数のこと
//② ★『React』と『Redux』を『接続して』、『store を変更できるようにしている！』➡︎ そのために、このProviderが、Reactコンポーネント内で、『react - reduxの「connect関数」を使えるようにしている！！』
//❸ 以上のことから、<Provider store={store}>として、createStore()関数で作成したデータを入れた、 『定数const store』を『store={store}』として、『storeというpropsの中にstoreのデータ』を『Provider に渡している』 これによって、<App/>コンポーネントでも『store のデータを扱えるようになる！』
//export const store = createStore();


//『store.js』で引数として受け取っていた、『history』をここで生成する！
const history = History.createBrowserHistory();
export const store = createStore(history);

ReactDOM.render(
  < Provider store={store} >
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </ Provider>,
  document.getElementById('root')
)
//serviceWorker.unregister();

reportWebVitals();
