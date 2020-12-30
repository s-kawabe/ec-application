// operationsには基本的にredux-thunkの関数を定義しておく

// ログイン時のpushはoperationsにまとめる
import firebase from 'firebase/app'
import { push } from 'connected-react-router'
import { auth, db, FirebaseTimestamp } from '../../firebase/index'
import {
  signInAction,
  signOutAction,
  fetchProductsInCartAction,
} from './actions'
import { TypeProduct } from './types'

interface IAddedProduct {
  added_at: firebase.firestore.Timestamp
  description: string
  gender: string
  name: string
  images: string[]
  price: number
  productId: string
  quantity: number
  size: string
  cartId?: string
}

export const addProductToCart = (addedProduct: IAddedProduct) => {
  return async (dispatch: any, getState: any) => {
    const uid = getState().users.uid
    // listen to users collection inner cart collection
    const cartRef = db.collection('users').doc(uid).collection('cart').doc()
    addedProduct['cartId'] = cartRef.id
    await cartRef.set(addedProduct)
    dispatch(push('/'))
  }
}

// 認証状態を監視して変化があったときにアクションを起こす
export const listenAuthState = () => {
  return async (dispatch: any) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        // ユーザが存在する→認証状態なのでDBからデータをとってくる！
        const uid = user.uid

        // 指定されたuidのデータをfirestoreから取得
        db.collection('users')
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data()

            if (data) {
              dispatch(
                signInAction({
                  isSignedIn: true,
                  role: data.role,
                  uid: uid,
                  username: data.username,
                }),
              )
            }

            // dispatch(push('/'));
            return
          })
      } else {
        // ユーザが存在しない→ログインしていないのでログインしてね！
        dispatch(push('/signin'))
      }
    })
  }
}

export const signIn = (email: string, password: string) => {
  return async (dispatch: any) => {
    // バリデーション
    if (email === '' || password === '') {
      alert('未入力の必須入力項目があります')
      return false
    }

    auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user

      if (user) {
        const uid = user.uid

        // 指定されたuidのデータをfirestoreから取得
        db.collection('users')
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data()

            if (data) {
              dispatch(
                signInAction({
                  isSignedIn: true,
                  role: data.role,
                  uid: uid,
                  username: data.username,
                }),
              )
            }

            dispatch(push('/'))
            return
          })
      }
      return
    })
    return
  }
}

export const signUp = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
) => {
  return async (dispatch: any) => {
    // バリデーションを定義 ★実際はもっと充実させる
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
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // result.userが入っていればサインアップ成功
        const user = result.user

        if (user) {
          // ユーザ一意のid
          const uid = user.uid
          // 現在のfirebaseが管理している時刻
          const timestamp = FirebaseTimestamp.now()

          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: 'customer',
            uid: uid,
            updated_at: timestamp,
            username: username,
          }

          // dbのドキュメントにはuidを設定しておく
          db.collection('users')
            .doc(uid)
            .set(userInitialData)
            .then(() => {
              dispatch(push('/'))
            })
        }
      })
  }
}

export const signOut = () => {
  return async (dispatch: any) => {
    auth.signOut().then(() => {
      // サインアウトの際reduxのstoreを初期化する
      dispatch(signOutAction())
      dispatch(push('/signin'))
    })
  }
}

export const resetPassword = (email: string) => {
  return async (dispatch: any) => {
    if (email === '') {
      alert('メールアドレスを入力してください')
      return false
    } else {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          alert('リセットパスワードをメールアドレスに送信しました。')
          dispatch(push('/signin'))
          return
        })
        .catch(() => {
          alert('パスワード変更に失敗しました。')
          return
        })
    }
    return
  }
}

export const fetchProductsInCart = (products: TypeProduct[]) => {
  return async (dispatch: any) => {
    dispatch(fetchProductsInCartAction(products))
  }
}
