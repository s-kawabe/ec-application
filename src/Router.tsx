import React from 'react'
import { Switch, Route } from 'react-router'
// tepmlateファイルはページごとにつくる
// 各ページの親コンポーネントが配置される
import {
  SignIn,
  SignUp,
  Reset,
  ProductEdit,
  ProductList,
  ProductDetail,
  CartList,
  OrderConfirm,
} from './templates'
import Auth from './Auth'
import './assets/reset.css'
import './assets/style.css'

const Router = () => {
  return (
    <Switch>
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/signin'} component={SignIn} />
      <Route exact path={'/signin/reset'} component={Reset} />
      {/* 認証が必要なページではAuthコンポーネントでラップする */}
      <Auth>
        <Route exact path={'(/)?'} component={ProductList} />
        {/* 正規表現でedit/(:id)になっているURLは全てProductEditテンプレートを表示 */}
        {/* idなし→新規登録ページ idあり→編集ページ */}
        <Route exact path={'/product/:id'} component={ProductDetail} />
        <Route path={'/product/edit(/:id)?'} component={ProductEdit} />

        <Route exact path={'/cart'} component={CartList} />
        <Route exact path={'/order/confirm'} component={OrderConfirm} />
      </Auth>
    </Switch>
  )
}

export default Router
