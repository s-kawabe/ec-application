import React from 'react'
import { useDispatch } from 'react-redux'
import { signIn } from '../reducks/users/operations'

const Login = () => {
  const dispatch = useDispatch()

  // console.log(dispatch(signInAction({uid: "000001", username: "shintaro"})));
  return (
    <div>
      <h2>ログイン</h2>
      <button onClick={() => dispatch(signIn())}>ログインする</button>
    </div>
  )
}
export default Login
