import React from 'react'
import { Switch, Route } from 'react-router'
// tepmlateファイルはページごとにつくる
// 各ページの親コンポーネントが配置される
import { SignIn, SignUp, Reset, ProductEdit, ProductList } from './templates'
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
        <Route path={'/product/edit(/:id)?'} component={ProductEdit} />
      </Auth>
    </Switch>
  )
}

export default Router
