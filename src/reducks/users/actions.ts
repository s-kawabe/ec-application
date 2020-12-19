export const SIGN_IN: string = 'SIGN_IN'
export const signInAction = (userState: any) => {
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
export const signOutAction = () => {
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
