import * as Actions from './actions'
import initialState from '../store/initialState'
import { UserActionsFormat } from './types'

export const UsersReducer = (
  state: any = initialState.users,
  action: UserActionsFormat,
) => {
  switch (action.type) {
    case Actions.SIGN_IN:
      // spread parameter
      // stateとaction.payloadで重複する部分は
      // action.payloadの方で上書きされる。
      return {
        ...state,
        ...action.payload,
      }
    case Actions.SIGN_OUT:
      return {
        ...initialState.users,
      }
    // サインインした瞬間など以外でstateを更新しようとすると全部ここにくる
    default:
      return state
  }
}
