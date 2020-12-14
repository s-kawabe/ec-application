export interface UserActionsFormat {
  type: string
  payload: {
    isSignedIn: boolean
    uid: string
    userName: string
  }
}
