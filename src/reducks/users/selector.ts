// stateの中から自分が使いたいstateを抽出できる
import { createSelector } from 'reselect'

export const usersSelector = (state: any) => state.users
export const getUserId = createSelector([usersSelector], (state) => state.uid)
export const getUserName = createSelector(
  [usersSelector],
  (state) => state.userName,
)
