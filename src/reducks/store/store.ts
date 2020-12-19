import {
  // 自作のcreateStoreもあるためreduxの方は別名でimport
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
// Reducersは分けて管理→Storeでまとめる
import { ProductsReducer } from '../products/reducers'
import { UsersReducer } from '../users/reducers'

// history: ブラウザのどのパスにいるのかを管理する引数
export default function createStore(history: any) {
  // ★useSelector((state) => state)された時に返ってくるやつ
  return reduxCreateStore(
    // Reducerを纏めて現在のそれぞれのstateを取得する
    combineReducers({
      products: ProductsReducer,
      // URLパスの情報をStoreで管理可能にする
      router: connectRouter(history),
      // products: ProductsReducer,
      users: UsersReducer,
    }),
    // applyMiddlewareを使うことでdispatch関数をラップし、actionがreducerに到達する前にmiddlewareがキャッチできるようにする。
    applyMiddleware(routerMiddleware(history), thunk),
  )
}
