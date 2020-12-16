import React, { useCallback, useState } from 'react'
import { TextInput, PrimaryButton } from '../component/UIkit'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // 子コンポーネントにstate変更関数を渡す際はuseCallbackを使用する
  // →関数のメモ化

  // コールバック関数の引数eventは小コンポーネントをクリックしたときのその要素
  const inputUsername = useCallback(
    (event) => {
      setUsername(event.target.value)
    },
    [setUsername],
  )

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value)
    },
    [setEmail],
  )

  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value)
    },
    [setPassword],
  )

  const inputConfirmPassword = useCallback(
    (event) => {
      setConfirmPassword(event.target.value)
    },
    [setConfirmPassword],
  )

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">アカウント登録</h2>
      <div className="module-spacer--medium"></div>
      <TextInput
        fullWidth={true}
        label={'ユーザ名'}
        multiline={false}
        required={true}
        rows={1}
        value={username}
        type={'text'}
        onChange={inputUsername}
      />
      <TextInput
        fullWidth={true}
        label={'メールアドレス'}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={'email'}
        onChange={inputEmail}
      />
      <TextInput
        fullWidth={true}
        label={'パスワード'}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={'password'}
        onChange={inputPassword}
      />
      <TextInput
        fullWidth={true}
        label={'パスワード(確認用)'}
        multiline={false}
        required={true}
        rows={1}
        value={confirmPassword}
        type={'password'}
        onChange={inputConfirmPassword}
      />
      <div className="module-spacer--medium"></div>
      <div className="center">
        <PrimaryButton
          label={'アカウントを登録する'}
          onClick={() => console.log('click!')}
        />
      </div>
    </div>
  )
}

export default SignUp
