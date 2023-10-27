# PHP Calculator

## 概要

本プログラムは、以下の設定をベースに制作したWebアプリケーションである。

- 四則演算ができる電卓を作成する
- 工数は2日程度（合計16時間）とする

### 使用言語

- HTML
- CSS
- JavaScript
- PHP

### 使用外部リソース

- Google Fonts
    - https://fonts.google.com/specimen/BIZ+UDPGothic
    - https://fonts.google.com/specimen/Open+Sans
    - https://fonts.google.com/specimen/Roboto+Mono

### 動作確認済みOS・ブラウザ

- Windows 11
    - Firefox (119.0)
    - Google Chrome (118.0.5993.118)
    - Microsoft Edge (118.0.2088.69)
- iOS 16.6.1
    - Safari

## 利用方法

### ローカル環境の立ち上げ方法

#### 前提条件

- Docker と Docker Compose がインストールされていること

#### 手順

1. **リポジトリのクローン**
    ```bash
    git clone git@github.com:hi3103/php_calculator.git [任意のディレクトリ名]

2. **作成されたディレクトリへ移動**
    ```
    cd [任意のディレクトリ名]
    ```

3. **Docker コンテナの立ち上げ**

    ```bash
    docker compose up -d
    ```

3. **ブラウザでの確認**: 以下のURLにアクセスして、電卓のアプリケーションが正しく動作しているかを確認する
    ```
    http://localhost:8080
    ```

4. **終了方法**: 以下のコマンドで、Docker コンテナを停止する
    ```bash
    docker compose down
    ```

### キーボード入力による操作方法

| 画面上のボタン | 対応するキー |
|---------|--------|
| 0～9     | 0～9    |
| AC      | Esc    |
| ÷       | /      |
| ×       | *      |
| −       | -      |
| ＋       | +      |
| ＝       | Enter  |

## 参考情報

### 制作上の要件

制作にあたっては、以下の追加要件を定めた。

- PHP が利用できる仮想環境を、Docker を使って構築する
- Web ブラウザ上で動作するアプリケーションにする
- クリック操作以外にも対応する
    - パソコン：キーボード入力操作
    - スマートフォン：タッチ操作

また、以下を完成目標とし、実施を見送った内容については Issue に記録した。

- 見た目：
    - 画面をみて「電卓」だと認識でき、違和感なく四則演算の操作ができる
- 動作：
    - 四則演算が可能である
        - 四則演算以外の機能は、一般的な電卓なら備わっているようなものであっても工数に収まらなければ実装を見送る

### 使用ツール

- [ChatGPT（GPT-4）](https://chat.openai.com/share/983f739b-24ea-4a4e-bfb8-2887daa13ae1)
- PHPStorm
- Sublime Merge

### 参考書籍

- 『Docker&仮想サーバー完全入門 Webクリエイター＆エンジニアの作業がはかどる開発環境構築ガイド』（株式会社インプレス）
    - https://book.impress.co.jp/books/1121101138
- 『JavaScript コードレシピ集』（技術評論社）
    - https://gihyo.jp/book/2019/978-4-297-10368-2
