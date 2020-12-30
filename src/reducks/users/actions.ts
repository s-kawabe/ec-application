import { TypeProduct, TypeActionReturn } from './types'

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
      isSignedIn: true,
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
