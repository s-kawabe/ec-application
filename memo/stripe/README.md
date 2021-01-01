# Reactアプリにstripe決済機能を追加してみる
stripeからAPIキーを取得して、メモをしながらecアプリに
決済機能を追加していこうと思います。
拙い点が多々あるかと思われますので、実装に取り組みたい方は
本記事はあくまで参考程度にしていただく様お願いします。<br><br>
**導入するアプリの使用技術**
```
・React(create-react-app)
・TypeScript
・firebase firestore
・firebase authentication
・firebase functions
・firebase strage
```

## stripeの基礎知識
### stripeとは
- オンライン決済のプラットフォーム
- 主要カード会社を網羅<br>
(VISA/MasterCard/AMEX/Discover/DinersClub/JCB
※JCBのみ申請が必要)
- デベロッパーファーストで複数の開発言語APIをサポートしている<br>
(Ruby,Python,PHP,Java,Node.js,Go,.NET)<br>
(何かしらのバックエンド言語を触ることになるということです...)<br>
[stripe APIリファレンス](https://stripe.com/docs/api)

### stripeの良さ
- 決済手数料が3.6%のみと安価<br>
(paypalの場合40円が上乗せされる)
> paypal例）国内の取引で、1カ月に10,000円の決済が10回行われた場合の手数料<br>
>（ 取引金額 1 万円 x 決済手数料 3.6 % + 40 円 / 件 ）x 10 回 = 手数料 4,000 円
- 開発者様のAPIドキュメントが豊富
- カード情報はStripe社が保持している<br>
(ユーザのカード情報を持つ責任はとても大きい、会社で持ってくれるのはとても便利)
- サブスクリプション(定期支払)の対応が用意
- オーソリ(与信確保)がとても便利
> オーソリ = Authorization

### stripe決済の仕組み
- カード情報を生で持たずにトークン化する
- stripe社のサーバーにカード情報を保存しない
(カード情報はstripe社で保持していると言ったが、自社サーバに格納しているわけでは無い)<br>
> **手順**
>1. Stripe.js & Elements（Checkout）を利用してブラウザから直接 Stripe へ決済（カード）情報を渡す
>2. Stripe のサーバからフロントエンドにトークンが返ってくる
>3. トークンを自身のサーバへ送る
>4. Charge / Customer のリクエストをサーバから送る（決済する / 決済情報を保存する）
>5. Stripe からのレスポンスを受ける<br>

引用元: https://qiita.com/y_toku/items/7e51ef7e69d7cbbfb3ca 

### アカウントを作成する
1. 以下にアクセスしてサインアップします<br>
https://dashboard.stripe.com/register
2. stripeダッシュボード画面に遷移します。
   (メールアドレスの確認を求められるため、確認しましょう)
   基本的にダッシュボードから購入履歴や顧客情報の管理が行えます。
3. APIキーを取得します。
   「APIキーの取得」からテストAPIキーを表示させます。
   以下の２つをコピーし、あとで使える様にしておきます。(再生成ができません)
    - 公開可能キー
    - シークレットキー 

※基本的には上記でOKですが、法人で使用する場合は「ビジネスの詳細情報を有効化してアカウントを追加する」
に進み、アカウント有効化後に「本番用APIキーの取得」を行う必要があります。

## 決済フォームを作る(フロントエンドの実装)
### React用のstripe packageをインストールする
[stripe公式reactドキュメント](https://stripe.com/docs/stripe-js/react)<br>

以下をプロジェクトディレクトリ直下実行する
```
% npm install --save @stripe/react-stripe-js @stripe/stripe-js
```
以下をfunctionsディレクトリ直下で実行する
```
% npm install --save stripe
```

### コンポーネントの作成
まずはフォームのあるコンポーネントをラップする親コンポーネントの作成になります。
[リファレンス](https://stripe.com/docs/stripe-js/react)の**Elements provider**の箇所を参考に以下の様なコンポーネントを作ります。
```tsx
import React from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
// loadStripeの引数に公開可能APIキー(pk...から始まるキー)を指定
const stripePromise = loadStripe('pk...hogehoge');

const CheckoutWrapper = () => {
  return (
    // ElementsコンポーネントでラップしたコンポーネントでstripeAPIが使用可能になる
    <Elements stripe={stripePromise}>
      <PaymentEdit /> {/* →実際にフォームを用意してカード情報を編集するページ */}
    </Elements>
  )
}

export default CheckoutWrapper
```

次にカード情報を編集するページを作成します。
こちらも[リファレンス](https://stripe.com/docs/stripe-js/react)から**Element components**の箇所
にサンプルが載っていますのでそちらを参考にします。
```tsx
// import割愛
const PaymentEdit = () => {
  const dispatch = useDispatch()
  const stripe = useStripe()
  // 親コンポーネント内のstripePromiseの戻り値を取得する
  const elements = useElements()

  const register = useCallback(() => {
    dispatch(registerCard(stripe, elements))
  }, [stripe, elements])
  
  const goBackToMyPage = useCallback(() => {
    dispatch(push("/user/mypage"))
  }, [dispatch])

  return (
    <section className="c-section-container">
      <h2 className="u-text__headline u-text-center">クレジットカード情報の登録/編集</h2>
      <div className="module-spacer--medium" />
      <CardElement ★
        options={{
         ...省略
        }}
      />
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton label={"カード情報を保存"} onClick={register} />
        <PrimaryButton label={"マイページに戻る"} onClick={goBackToMyPage} />
      </div>
    </section>
  )
}
```
stripe側で用意してくれているCardElementコンポーネントによって
このようなカード情報入力フォームが生成されます。

![スクリーンショット 2020-12-31 22 16 08](https://user-images.githubusercontent.com/65433193/103411873-cdde6500-4bb5-11eb-8ce9-e8a7520b49fb.png)


## クレジットカードを登録する(firebase FunctionsでAPIを作成)
フォームに入力したカード情報を実際にstripeAPIに渡すために、
一度firebaseのCloud Functionsで作るAPIを経由する必要がある。
Node.jsで書いていく。

### 環境変数にAPIキーを設定しておく
**環境変数の設定**
最初に取得したAPIキーのシークレットキー(sk...から始まる)を環境変数に設定しておきましょう
※シークレットAPIキーは基本的に自分以外が知るのは危険です。うっかりファイルに記述したままGitHubに
pushしたりしないよう注意しましょう（そのために環境変数を使用します。）
```
% firebase functions:config:set stripe.key="sk_hogehoge"
```
**環境変数の確認**
```
% firebase functions:config:get
```

続いてfunctionsフォルダのindex.tsにstripeのrequireを追加します。
この記述方法で、先ほどアクセスしたAPIキーで認証済みのstripeライブラリが使用可能となります。
```
const stripe = require('stripe')(functions.config().stripe.key)
```

### Cloud FunctionsにAPIを定義する
まずはcorsというライブラリを追加する(functionsフォルダ以下で実行)
(corsとは「同一生成元ポリシー」と呼ばれるリソースアクセスの制限を緩和するための仕組みだそうです。)
```
% npm install --save cors
```

functionsフォルダ内のファイルを編集する
```ts
const stripe = require('stripe')(functions.config().stripe.key)
const cors = require('cors')

const sendResponse = (response: any, statusCode: any, body: any) => {
  response.send({
    statusCode,
    headers: {"Access-Control-Allow-Origin": "*"},
    body: JSON.stringify(body)
  })
}

exports.stripeCustomer = functions.https.onRequest((req, res) => {
  const corsHandler = cors({origin: true});

  corsHandler(req, res, () => {
    // postメソッドで来ているかチェックする
    if (req.method === 'POST') {
        return stripe.customers.create({
            description: 'Toraseminar customer',
            email: req.body.email,
            metadata: {userId: req.body.userId},
            payment_method: req.body.paymentMethod,
        }).then((customer: any) => {
            sendResponse(res, 200, customer);
        }).catch((error: any) => {
            console.error(error);
            sendResponse(res, 500, {error: error})
        })
    }
  })
})
```

firebase.jsonのrewritesに新しいAPIエンドポイントとアクションを追加
```json
 "rewrites": [
      {
        "source": "/v1/customer",
        "function": "stripeCustomer"
      }
 ]
```
その後、ルートディレクトリに移動して`% firebase deploy`を実行する

### フォームに入力されたカード情報を元にCloudFunctionsAPIを叩く
`コンポーネントの作成`で作成したボタン`カード情報を保存`を押したあとの
`registerCard`関数を作成します。筆者はReduxを使用しているため
operationsファイルに関数を定義していきます。
ここではフォームに入力されたカード情報を元にStripe側の関数
`createPaymentMethod`を実行します。
(一部のバリデーションは公式から推奨されているものであるため、こちらも公式ドキュメントを
参照すると良いと思います。)
```tsx
//HTTP Requestに対する処理を行う
const headers = new Headers();
// HTTP headerをセット
headers.set('Content-type', 'application/json')
const BASE_URL = "https://ec-application-4132d.web.app/"

// APIのエンドポイントを指定
const createCustomer = async (email: string, paymentMethodId: string, uid: string) => {
  const response = await fetch(BASE_URL+"/v1/customer", {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      email: email,
      paymentMethod: paymentMethodId,
      userId: uid,
    })
  })

  // 返ってきたJSONをオブジェクトに変換して返す
  const customerResponse = await response.json()
  return JSON.parse(customerResponse.body)
}

export const registerCard = (stripe: any, elements: any) => {
  return async (dispatch: any, getState: any) => {
    const user = getState().users
    const email = user.email
    const uid = user.uid

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. 
    const cardElement = elements.getElement(CardElement);

    // stripe server access
    // paymentMethod: in card token information
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
      return;
    } 

    const paymentMethodId = paymentMethod.id
    const customerData = await createCustomer(email, paymentMethodId, uid)

    if(customerData.id === "") {
      alert('カード情報の登録に失敗しました。')
      return 
    } else {
      const updateUserState = {
        customer_id: customerData.id,
        payment_method_id: paymentMethodId
      }

      db.collection('users').doc(uid)
        .update(updateUserState)
        .then(() => {
          dispatch(updateUserStateAction(updateUserState))
          dispatch(push('/user/mypage'))
        })
    }
  };
}
```

### クレジットカードを登録してみる
stripe公式の[テストカード情報](https://stripe.com/docs/testing)で
実際にフォームに入力し登録されるか試してみましょう。



## クレジットカードを編集する

## テスト決済をする

## 決済後に領収書をメール送信する