# React×TypeScriptでECサイトを作成する

https://ec-application-4132d.web.app/

[日本一わかりやすいReact-Redux入門](https://www.youtube.com/watch?v=FBMA34gUsgw&list=PLX8Rsrpnn3IWavNOj3n4Vypzwb3q1RXhr&index=1)
こちらの講座をTypeScriptに置き換えて実装

## 事前準備
1. `npx creat-react-app [プロジェクト名] --template typescript`
2. firebaseプロジェクト作成
3. reactのディレクトリから`firebase login`(過去にログインしている場合は必要なかった)
4. `firebase init`
- 使用するサービスを選択(Firestore,Functions,Hosting,Strage)
- Firestore.rulesとFirestore.indexesはデフォルト
- use to write Cloud Functions? → **TypeScript**
- ESlint → **y**
- What do you want to use as your public directory? → **build**
- single-page appz? → **y**
- automatic builds and deploys with GitHub? → n
- What file should used for Strage Rules? → デフォルト
5. [こちらのサイト](https://qiita.com/sunnyG/items/05c2e9381d6ba2d9fccf)でprettierとかtsconfig.jsonの設定をした
- lint-staged<br>
  拡張子が`ts`または`tsx`の場合に`prettier`を走らせてから`git add`する設定を`package.json`に追記
  ```json
  "lint-staged": {
    "*.{ts,tsx}": [
      "prettier --write"
    ]
  }
  ```
- husky<br>
`precommit`時に上記の`lint-staged`が実行されるように`package.json`に追記
  ```json
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  }
  ```
- prettier<br>
コードフォーマット関連の設定。`package.json`に記述する
  ```json
  "prettier": {
    "semi": false,
    "singleQuote": true,
    "tabWidtj": 2,
    "trailingComma": "all"
  }
  ```
6. 必要なモジュールのインストール
    ```
    npm install --save @material-ui/core @material-ui/icons @material-ui/styles connected-react-router firebase history react-redux react-router redux redux-actions redux-logger redux-thunk reselect
    // コレに加えて型定義ファイルもnpm installした
    ```
7. いったんビルド、デプロイ<br>
    `npm run build`実行<br>
    `firebase deploy`実行

## 注意
`npx create-react-app`は最新版をインストールするため注意。react17はjsx記法だけならimport Reactが不要だったり、typescriptが追いついていなく、tsconfig.jsonの設定が勝手に書き換わったりする。
<br><br>
functionsフォルダにもtsconfig.jsonがある


## エラー
- *ESLint couldn't find the config "react-app/jest" to extend from. Please check that the name of the config is correct.*<br>
ESLintの設定が競合している。`firebase init`している場合functionsフォルダ内にも`eslintrc.js`が生成され。
PJフォルダ内に複数のESLintファイルが存在することが原因<br>
package.jsonとfunctions/eslintrc.jsに対して以下を追記
  ```
  "root": true
  ```

- fireabse deploy後tscでいっぱいエラーが出る<br>
tscのオプションに`--skipLibCheck`を付加<br>
tsconfig.jsonに`"skipLibCheck": true`を追記
