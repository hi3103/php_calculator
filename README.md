# php_calculator
## ローカル環境の立ち上げ方法

### 前提条件

- Docker と Docker Compose がインストールされていること

### 手順

1. **リポジトリのクローン**
    ```bash
    git clone [リポジトリのURL] [任意のディレクトリ名]
    cd [任意のディレクトリ名]
    ```

2. **Docker コンテナの立ち上げ**
    ```bash
    docker compose up -d
    ```

3. **ブラウザでの確認**
    以下のURLにアクセスして、電卓のアプリケーションが正しく動作しているかを確認してください。
    ```
    http://localhost:8080
    ```

4. **終了方法**
    以下のコマンドで、Docker コンテナを停止します。
    ```bash
    docker compose down
    ```
