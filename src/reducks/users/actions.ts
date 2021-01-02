import { TypeProduct, TypeActionReturn } from './types'

export const FETCH_ORDERS_HISTORY: string = 'FETCH_ORDERS_HISTORY'
export const fetchOrdersHistoryAction = (
  history: TypeProduct[],
): TypeActionReturn => {
  return {
    type: 'FETCH_ORDERS_HISTORY',
    payload: history,
  }
}

export const FETCH_PRODUCTS_IN_CART: string = 'FETCH_PRODUCTS_IN_CART'
export const fetchProductsInCartAction = (
  products: TypeProduct[],
): TypeActionReturn => {
  return {
    type: 'FETCH_PRODUCTS_IN_CART',
    payload: products,
  }
}

export const SIGN_IN: string = 'SIGN_IN'
export const signInAction = (userState: any): TypeActionReturn => {
  return {
    type: 'SIGN_IN',
    payload: {
      customer_id: userState.customer_id,
      email: userState.email,
      isSignedIn: true,
      payment_method_id: userState.payment_method_id,
      role: userState.role,
      uid: userState.uid,
      userName: userState.username,
    },
  }
}

export const SIGN_OUT: string = 'SIGN_OUT'
export const signOutAction = (): TypeActionReturn => {
  return {
    type: 'SIGN_OUT',
    payload: {
      isSignedIn: false,
      role: '',
      uid: '',
      userName: '',
    },
  }
}

export const UPDATE_USER_STATE: string = 'UPDATE_USER_STATE'
export const updateUserStateAction = (userState: any): TypeActionReturn => {
  return {
    type: 'UPDATE_USER_STATE',
    payload: userState,
  }
}
