// このコンポーネント内に包容したコンポーネントは認証が求められる

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIsSignedIn } from './reducks/users/selector'
import { listenAuthState } from './reducks/users/operations'

// propsにRouter.tsxの<Router>でラップした小要素を受け取る
const Auth = ({ children }: any) => {
  const dispatch = useDispatch()
  const selector = useSelector((state: any) => state)
  const isSignedIn = getIsSignedIn(selector)

  // ユーザがサインインしているか確認し、していなければlistenAuthStateを呼ぶ
  // →ComponentDidMountでチェック

  // 小要素(children)を返してrenderが終わった後に始動する
  // ログイン状態→firestoreからuser情報を取得しstoreを更新
  // 未ログイン状態→ログイン画面にリダイレクト
  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState())
    }
  }, [dispatch, isSignedIn])

  return isSignedIn ? children : <></>
}
export default Auth
