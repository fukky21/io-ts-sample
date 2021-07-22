# io-ts-sample
[io-ts](https://github.com/gcanti/io-ts)を使用するサンプルコードです。

## Setup
必要なパッケージをインストール
```
$ yarn
```

サーバーを起動
```
$ yarn dev
```

## Usage
- ユーザー一覧を取得する
```
$ curl localhost:3000/users
```

- ユーザーを追加する
```
$ curl -X POST -H "Content-Type: application/json" -d '{ "name": "Tanaka Taro", "age": 25, "gender": "male", "email": "taro@example.com" }' localhost:3000/users
```

# ユーザーデータの定義
- `name`: 文字列, 空白はNG
- `age`: 正の整数, 文字列はNG
- `gender`: `male`, `female`, `other`のいずれかの文字列, これ以外はNG
- `email`: 文字列, メールアドレスの書式でなければNG
