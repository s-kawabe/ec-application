import { UserActionsFormat } from './types'

export const SIGN_IN: string = 'SIGN_IN'
export const signInAction = (userState: any): UserActionsFormat => {
  return {
    type: 'SIGN_IN',
    payload: {
      isSignedIn: true,
      uid: userState.uid,
      userName: userState.userName,
    },
  }
}

export const SIGN_OUT: string = 'SIGN_OUT'
export const signOutAction = (): UserActionsFormat => {
  return {
    type: 'SIGN_OUT',
    payload: {
      isSignedIn: false,
      uid: '',
      userName: '',
    },
  }
}
