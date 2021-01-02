// stateの中から自分が使いたいstateを抽出できる
import { createSelector } from 'reselect'

const usersSelector = (state: any) => state.users

export const getCustomerId = createSelector(
  [usersSelector],
  (state) => state.customer_id,
)

export const getIsSignedIn = createSelector(
  [usersSelector],
  (state) => state.isSignedIn,
)

export const getOrdersHistory = createSelector(
  [usersSelector],
  (state) => state.orders,
)

export const getPaymentMethodId = createSelector(
  [usersSelector],
  (state) => state.payment_method_id,
)

export const getProductsInCart = createSelector(
  [usersSelector],
  (state) => state.cart,
)

export const getUserId = createSelector([usersSelector], (state) => state.uid)

export const getUserName = createSelector(
  [usersSelector],
  (state) => state.userName,
)
