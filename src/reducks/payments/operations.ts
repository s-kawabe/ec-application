import { CardElement } from '@stripe/react-stripe-js'
import { push } from 'connected-react-router'
import { db } from '../../firebase/index'
import { updateUserStateAction } from '../users/actions'

//HTTP Requestに対する処理を行う
const headers = new Headers()
// HTTP headerをセット
headers.set('Content-type', 'application/json')
const BASE_URL = 'https://ec-application-4132d.web.app/'

// FunctionsのAPIを呼び出す用の関数(fetchメソッドでURLにPOSTリクエストを飛ばす)
const createCustomer = async (
  email: string,
  paymentMethodId: string,
  uid: string,
) => {
  const response = await fetch(BASE_URL + 'v1/customer', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      email: email,
      paymentMethod: paymentMethodId,
      userId: uid,
    }),
  })

  // 返ってきたJSONをオブジェクトに変換して返す
  const customerResponse = await response.json()
  return JSON.parse(customerResponse.body)
}

export const retrievePaymentMethod = async (paymentMethodId: string) => {
  const response = await fetch(BASE_URL + 'v1/paymentMethod', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      paymentMethodId: paymentMethodId,
    }),
  })

  // 返ってきたJSONをオブジェクトに変換して返す
  const paymentMethodResponse = await response.json()
  console.log(paymentMethodResponse)
  const paymentMethod = JSON.parse(paymentMethodResponse.body)
  return paymentMethod.card
}

const updatePaymentMethod = async (
  customerId: any,
  prevPaymentMethodId: any,
  nextPaymentMethodId: any,
) => {
  const response = await fetch(BASE_URL + 'v1/updatePaymentMethod', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      customerId: customerId,
      prevPaymentMethodId: prevPaymentMethodId,
      nextPaymentMethodId: nextPaymentMethodId,
    }),
  })

  const paymentMethodResponse = await response.json()
  const paymentMethod = JSON.parse(paymentMethodResponse.body)
  return paymentMethod.card
}

// カード情報の更新を押した際の処理
// カード情報が未登録 → stripe.customers
// カード情報が登録済みで更新する場合 → stripe.paymentMethods.detachとattach
export const registerCard = (stripe: any, elements: any, customerId: any) => {
  return async (dispatch: any, getState: any) => {
    const user = getState().users
    const email = user.email
    const uid = user.uid

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    // Get a reference to a mounted CardElement.
    const cardElement = elements.getElement(CardElement)

    // stripe server access
    // paymentMethod: in card token information
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })

    if (error) {
      console.log('[error]', error)
      return
    }

    // 新しいカード情報
    const paymentMethodId = paymentMethod.id

    // カード情報新規登録の場合
    if (customerId === '') {
      const customerData = await createCustomer(email, paymentMethodId, uid)

      if (customerData.id === '') {
        alert('カード情報の登録に失敗しました。')
        return
      } else {
        const updateUserState = {
          customer_id: customerData.id,
          payment_method_id: paymentMethodId,
        }

        db.collection('users')
          .doc(uid)
          .update(updateUserState)
          .then(() => {
            dispatch(updateUserStateAction(updateUserState))
            dispatch(push('/user/mypage'))
          })
          .catch(() => {
            alert('カード情報の登録に失敗しました。')
            return
          })
      }
      // カード情報更新の場合
    } else {
      // redux経由で現在のpaymentmethodIdを取得する
      const prevPaymentMethodId = getState().users.payment_method_id
      const updatedPaymentMethod = await updatePaymentMethod(
        customerId,
        prevPaymentMethodId,
        paymentMethodId,
      )

      if (!updatedPaymentMethod) {
        alert('お客様情報の登録に失敗しました。')
      } else {
        const userState = {
          payment_method_id: paymentMethodId,
        }
        db.collection('users')
          .doc(uid)
          .update(userState)
          .then(() => {
            dispatch(updateUserStateAction(userState))
            alert('お客様情報を更新しました。')
            dispatch(push('/user/mypage'))
          })
          .catch(() => {
            alert('お客様情報の更新に失敗しました。')
          })
      }
    }
  }
}
