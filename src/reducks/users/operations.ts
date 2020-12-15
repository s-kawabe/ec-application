import { signInAction } from './actions'
// ログイン時のpushはoperationsにまとめる
import { push } from 'connected-react-router'

export const signIn = () => {
  return async (dispatch: any, getState: Function) => {
    const state = getState()
    const isSignnedIn = state.users.isSignedIn

    if (!isSignnedIn) {
      const url = 'https://api.github.com/users/s-kawabe'

      const response = await fetch(url)
        .then((res) => res.json())
        .catch(() => null)
      const username = response.login

      console.log('from gitub get by :', username)

      // stateを更新
      dispatch(
        signInAction({
          isSignnedIn: true,
          uid: '101010',
          userName: username,
        }),
      )
      // rootにリダイレクト
      dispatch(push('/'))
    }
  }
}
