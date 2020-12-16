import React from 'react'
import { Switch, Route } from 'react-router'
// tepmlateファイルはページごとにつくる
// 各ページの親コンポーネントが配置される
import { Login, Home, SignUp } from './templates'
import './assets/reset.css'
import './assets/style.css'

const Router = () => {
  return (
    <Switch>
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/login'} component={Login} />
      <Route exact path={'(/)?'} component={Home} />
    </Switch>
  )
}

export default Router
