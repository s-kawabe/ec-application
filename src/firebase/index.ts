import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'
import { firebaseConfig } from './config'

// 設定ファイルのSDKsnippetを読み込んで、各サービス利用のヘルパー変数を作成
firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()
export const functions = firebase.functions()
export const FirebaseTimestamp = firebase.firestore.Timestamp
