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
          payment_method: req.body.paymentMethod,
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
