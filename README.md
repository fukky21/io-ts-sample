# io-ts-sample
[io-ts](https://github.com/gcanti/io-ts)を使用するサンプルコードです。

解説記事は[こちら](https://qiita.com/fukky21/items/421f41baf3ebc4016d3c)

## Setup
必要なパッケージをインストール
```bash
$ yarn
```

サーバーを起動
```bash
$ yarn dev
```

## Usage
- ユーザー一覧を取得する
```bash
$ curl localhost:3000/users
```

- ユーザーを追加する
```bash
$ curl -X POST -H "Content-Type: application/json" -d '{ "name": "Tanaka Taro", "age": 25, "gender": "male", "email": "taro@example.com" }' localhost:3000/users
```

## ユーザーデータの定義
- `name`: 文字列, 空白はNG
- `age`: 正の整数, 文字列はNG
- `gender`: `male`, `female`, `other`のいずれかの文字列, これ以外はNG
- `email`: 文字列, メールアドレスの書式でなければNG
