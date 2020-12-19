import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { TextInput, PrimaryButton } from '../components/UIkit'
import { resetPassword } from '../reducks/users/operations'

const Reset = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value)
    },
    [setEmail],
  )

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">パスワード変更</h2>
      <div className="module-spacer--medium"></div>
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

      <div className="module-spacer--medium"></div>

      <div className="center">
        <PrimaryButton
          label={'パスワードを変更'}
          onClick={() => dispatch(resetPassword(email))}
        />
      </div>
    </div>
  )
}

export default Reset
