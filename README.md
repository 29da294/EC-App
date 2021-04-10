# EC-CITY

ファッション系ECアプリです。アパレルのカテゴリー（服、靴、バッグ等）を出品することを想定しています。
* 店舗：ユーザー ＝ 1 ： ｎ
  - 店舗 ： 商品の出品・変更、在庫管理
  - ユーザー ： 商品閲覧、カート・お気に入りリストへの追加、注文履歴の確認

JavaScript React Redux Firebase を用いて開発しました。

## デモアプリURL
[URL]: 

**デモ用アカウント**  
メールアドレス: **test@gmail.com**  
パスワード: **password**  
上記のアドレスとパスワードから操作していただけます。

## 使用技術（Use technology）
* React 17.0.1
* Redux 4.0.5
* Firebase 8.2.7
* Material-UI 4.11.3
* HTML5
* CSS
* JavaScript

## 機能一覧（Development Functions）
* **認証機能・認証のリッスン**
  - ユーザー登録・ログイン機能(Firebase Auth)
  - パスワードリセット機能 ➡︎ リセット用メール案内の送信(Firebase)
  - 認証情報をブラウザへの残す（リッスン）を行い、再ログインの手間を省略化
  - 認証よって、ヘッダーメニューの表示を制御し、ログイン時のみ表示させている

* **商品情報のCRUD（追加登録・編集・削除）**
  - 商品画像の登録・プレビュー・削除
  - 商品登録内容の追加・修正編集
  - 商品のサイズ、在庫数量の変更機能
  - 商品一覧表示
  
* **画像スライダー機能**
  - 1つの商品に対して、複数の登録した画像を表示、閲覧できる動的な画像スライダーを実装（react-swiper）

* **スライドメニュー表示（Drawerメニュー）**
  - ヘッダーメニューより、表示・非表示を動的に制御できる（Material-UI）

* **購入商品カート**
  - 商品追加・更新・削除機能
  - カートアイコンにバッチ表示（追加点数を表示）

* **お気に入りリスト**
  - 気になった商品を一覧ページに保管・削除
  - リストページから商品をカートへ入れて購入可能
  - お気に入りアイコンにバッチ表示（追加数を表示）

* **タグ検索機能**
  - Drawerメニュー内にある各カテゴリータグごとに商品一覧の表示を絞り込むことが可能（Firestore Indexes）

* **商品の注文**
  - トランザクションを実装し、処理のロールバック（Firestore - batch()メソッド）

* **注文履歴**
  - 注文ID、注文日、発送予定日（仮）、購入商品の一覧を確認可能

##デモ一例

* ユーザー登録・ログイン機能(Firebase Auth)
* パスワードリセット機能 ➡︎ リセット用メール案内の送信(Firebase)
![login_page](https://user-images.githubusercontent.com/80564526/112939288-2a75ff80-9166-11eb-90d3-67079eb4a180.png)
![rest_passwprd](https://user-images.githubusercontent.com/80564526/112939309-3366d100-9166-11eb-9bdb-57e2d615f070.png)
![newpassword_firebase](https://user-images.githubusercontent.com/80564526/112939298-306be080-9166-11eb-863d-919f117e8868.png)

* 商品一覧表示
![ProductDev.](https://user-images.githubusercontent.com/80564526/112759418-d7992c80-902d-11eb-86fe-86745dd0d5e5.png)
![sizeEdit_demo](https://user-images.githubusercontent.com/80564526/112784195-f8906a80-908b-11eb-9bc6-326f42165888.gif)
![list_demo](https://user-images.githubusercontent.com/80564526/112944484-dc64fa00-916d-11eb-8488-cce53c25ccd8.gif)

* 商品ページ（画像スライダー機能 Matrial-UI React-Swiper）
![product_swiper](https://user-images.githubusercontent.com/80564526/113097044-3ed2fe80-9231-11eb-8a75-9678a080406f.gif)
