// 自作のcreateStoreもあるためreduxの方は別名でimport
import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
// Reducersは分けて管理→Storeでまとめる
// import {ProductsReducer} from '../products/reducers';
import { UsersReducer } from '../users/reducers'

// history: ブラウザのどのパスにいるのかを管理する引数
export default function createStore(history: any) {
  return reduxCreateStore(
    // Reducerを纏めて現在のそれぞれのstateを取得する
    combineReducers({
      // URLパスの情報をStoreで管理可能にする
      router: connectRouter(history),
      // products: ProductsReducer,
      users: UsersReducer,
    }),
    applyMiddleware(routerMiddleware(history)),
  )
}
