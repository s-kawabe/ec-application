import { CardElement } from '@stripe/react-stripe-js'
import { push } from 'connected-react-router'
import { db } from '../../firebase/index'
import { updateUserStateAction } from '../users/actions'

//HTTP Requestに対する処理を行う
const headers = new Headers()
// HTTP headerをセット
headers.set('Content-type', 'application/json')
const BASE_URL = 'https://ec-application-4132d.web.app/'

// APIのエンドポイントを指定
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

export const registerCard = (stripe: any, elements: any) => {
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

    const paymentMethodId = paymentMethod.id
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
  }
}
