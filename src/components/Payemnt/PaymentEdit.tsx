import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import { PrimaryButton, TextDetail } from 'components/UIkit'
import { push } from 'connected-react-router'
import {
  registerCard,
  retrievePaymentMethod,
} from '../../reducks/payments/operations'
import { getPaymentMethodId, getCustomerId } from '../../reducks/users/selector'

const PaymentEdit = () => {
  const dispatch = useDispatch()
  const stripe = useStripe()
  // 親コンポーネント内のstripePromiseの戻り値を取得する
  const elements = useElements()
  const selector = useSelector((state) => state)
  const customerId = getCustomerId(selector)
  const paymentMethodId = getPaymentMethodId(selector)

  // ユーザのカード情報
  const [card, setCard] = useState<any>({})

  const register = useCallback(() => {
    dispatch(registerCard(stripe, elements, customerId))
  }, [stripe, elements, customerId])

  const goBackToMyPage = useCallback(() => {
    dispatch(push('/user/mypage'))
  }, [dispatch])

  useEffect(() => {
    // 即時実行関数で非同期処理を行う
    // Reduxに保存されたpaymentMethodIdを引数に
    // stripe.paymentMethods.retrieveでカード情報を取得
    ;(async () => {
      const cardData = await retrievePaymentMethod(paymentMethodId)
      if (cardData) {
        setCard(cardData)
      }
    })()
  }, [paymentMethodId])

  // cardが変更されたら再計算
  const cardNumber = useMemo(() => {
    if (card.last4) {
      return '**** **** **** ' + card.last4
    } else {
      return '未登録'
    }
  }, [card])

  return (
    <section className="c-section-container">
      <h2 className="u-text__headline u-text-center">
        クレジットカード情報の登録/編集
      </h2>
      <div className="module-spacer--medium" />
      <h3>現在登録されているカード情報</h3>
      <div className="module-spacer--small" />
      <TextDetail label={card.brand} value={cardNumber} />
      <div className="module-spacer--small" />
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton label={'カード情報を保存'} onClick={register} />
        <PrimaryButton label={'マイページに戻る'} onClick={goBackToMyPage} />
      </div>
    </section>
  )
}

export default PaymentEdit
