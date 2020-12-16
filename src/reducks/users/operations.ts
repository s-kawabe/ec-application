import { signInAction } from './actions'
// ログイン時のpushはoperationsにまとめる
import { push } from 'connected-react-router'
import { auth } from '../../firebase/index'

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

// redux-thunkで作るサインアップメソッド
export const signUp = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
) => {
  return async (dispatch: any) => {
    // バリデーションを定義
    if (
      username === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      alert('未入力の必須入力項目があります')
      return false
    }

    if (password !== confirmPassword) {
      alert('パスワードが一致しません。もう一度お試しください。')
      return false
    }

    // firebaseのauthでサインアップ処理実行
    return auth.createUserWithEmailAndPassword(email, password)
  }
}
