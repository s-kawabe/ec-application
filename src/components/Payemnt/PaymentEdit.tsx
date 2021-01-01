import React, { useCallback } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useDispatch } from 'react-redux'
import { PrimaryButton } from 'components/UIkit'
import { push } from 'connected-react-router'
import { registerCard } from '../../reducks/payments/operations'

const PaymentEdit = () => {
  const dispatch = useDispatch()
  const stripe = useStripe()
  // 親コンポーネント内のstripePromiseの戻り値を取得する
  const elements = useElements()

  const register = useCallback(() => {
    dispatch(registerCard(stripe, elements))
  }, [stripe, elements])

  const goBackToMyPage = useCallback(() => {
    dispatch(push('/user/mypage'))
  }, [dispatch])

  return (
    <section className="c-section-container">
      <h2 className="u-text__headline u-text-center">
        クレジットカード情報の登録/編集
      </h2>
      <div className="module-spacer--medium" />
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
