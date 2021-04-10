import React from "react";
import Router from "./Router";
import "./assets/reset.css";
import "./assets/style.css";
import { Header } from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <main className="c-main">
          <Router />
      </main>
    </>
  );
};

export default App;

//<Header /> を読み込み、全ページでHeaderを共通して表示させるようにする
//<></>で囲む必要がある JSXは並列に並べることはできない = 要素で<＞</>括らないといけない
