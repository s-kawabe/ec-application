export interface UserActionsFormat {
  type: string
  payload: {
    icon: string
    isSignedIn: boolean
    uid: string
    userName: string
  }
}

export const SIGN_IN = 'SIGN_IN'
export const signInAction = (userState: any): UserActionsFormat => {
  return {
    type: 'SIGN_IN',
    payload: {
      icon: userState.icon,
      isSignedIn: true,
      uid: userState.name,
      userName: userState.username,
    },
  }
}

export const SIGN_OUT = 'SIGN_OUT'
export const signOutAction = (): UserActionsFormat => {
  return {
    type: 'SIGN_OUT',
    payload: {
      icon: '',
      isSignedIn: false,
      uid: '',
      userName: '',
    },
  }
}
