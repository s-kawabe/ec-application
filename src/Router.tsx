import React from 'react'
import { Switch, Route } from 'react-router'
// tepmlateファイルはページごとにつくる
// 各ページの親コンポーネントが配置される
import { SignIn, Home, SignUp } from './templates'
import './assets/reset.css'
import './assets/style.css'

const Router = () => {
  return (
    <Switch>
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/signin'} component={SignIn} />
      <Route exact path={'(/)?'} component={Home} />
    </Switch>
  )
}

export default Router
