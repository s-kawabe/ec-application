import * as functions from 'firebase-functions'
const stripe = require('stripe')(functions.config().stripe.key)
const cors = require('cors')

const sendResponse = (response: any, statusCode: any, body: any) => {
  response.send({
    statusCode,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(body),
  })
}

exports.retrievePaymentMethod = functions.https.onRequest((req, res) => {
  const corsHandler = cors({ origin: true })

  corsHandler(req, res, () => {
    // POSTメソッド以外ならエラー
    if (req.method !== 'POST') {
      sendResponse(res, 405, { error: 'Invalid Request method!' })
    }

    return stripe.paymentMethods
      .retrieve(req.body.paymentMethodId)
      .then((paymentMethod: any) => {
        sendResponse(res, 200, paymentMethod)
      })
      .catch((error: any) => {
        console.error(error)
        sendResponse(res, 500, { error: error })
      })
  })
})

exports.stripeCustomer = functions.https.onRequest((req, res) => {
  const corsHandler = cors({ origin: true })

  corsHandler(req, res, () => {
    // postメソッドで来ているかチェックする
    if (req.method === 'POST') {
      return stripe.customers
        .create({
          description: 'Test customer',
          email: req.body.email,
          metadata: { userId: req.body.userId },
          payment_method:
            req.body.paymentMethod /* ユーザが入力したカード情報 */,
        })
        .then((customer: any) => {
          sendResponse(res, 200, customer)
        })
        .catch((error: any) => {
          console.error(error)
          sendResponse(res, 500, { error: error })
        })
    }
  })
})

exports.updatePaymentMethod = functions.https.onRequest((req, res) => {
  const corsHandler = cors({ origin: true })

  corsHandler(req, res, () => {
    //POSTメソッドでなければ405で返す
    if (req.method !== 'POST') {
      sendResponse(res, 405, { error: 'Invalid Request method!' })
    }

    return stripe.paymentMehod
      .detach(req.body.prevPaymentMethodId)
      .then(() => {
        return stripe.paymentMethods
          .attach(req.body.nextPaymentMethodId, {
            customer: req.body.customerId,
          })
          .then((nextPaymentMethod: any) => {
            sendResponse(res, 200, nextPaymentMethod)
          })
      })
      .catch((error: any) => {
        sendResponse(res, 500, { error: error })
      })
  })
})
