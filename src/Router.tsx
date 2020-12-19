import React from 'react'
import { Switch, Route } from 'react-router'
// tepmlateファイルはページごとにつくる
// 各ページの親コンポーネントが配置される
import { SignIn, Home, SignUp, Reset, ProductEdit } from './templates'
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
        <Route exact path={'(/)?'} component={Home} />
        <Route exact path={'(/product/edit)'} component={ProductEdit} />
      </Auth>
    </Switch>
  )
}

export default Router
