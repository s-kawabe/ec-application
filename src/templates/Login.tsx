import React from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { signInAction } from '../reducks/users/actions'

const Login = () => {
  const dispatch = useDispatch()

  // console.log(dispatch(signInAction({uid: "000001", username: "shintaro"})));
  return (
    <div>
      <h2>ログイン</h2>
      <button
        onClick={() => {
          dispatch(signInAction({ uid: '000001', userName: 'shintaro' }))
          dispatch(push('/'))
        }}
      >
        ログインする
      </button>
    </div>
  )
}
export default Login
