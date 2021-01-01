import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { PaymentEdit } from '../components/Payemnt'
// loadStripeの引数に公開可能APIキー([pk...]から始まるキー)を指定
const stripePromise = loadStripe(
  'pk_test_51I4NBHBkcxkUdqKYYl8g8bp2Pef9J3DU5eDDWIFyD5N3inDsQqh1AlkLP1pVhJ45U85FilyH17Og8ozsVrAQ7yyL00U3vYNNoq',
)

const CheckoutWrapper = () => {
  return (
    // ElementsコンポーネントでラップしたコンポーネントでstripeAPIが使用可能になる
    <Elements stripe={stripePromise}>
      <PaymentEdit />{' '}
      {/* →実際にフォームを用意してカード情報を編集するページ */}
    </Elements>
  )
}

export default CheckoutWrapper
