import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createStore from './reducks/store/store'
import './index.css'
import App from './App'
import { ConnectedRouter } from 'connected-react-router'
import * as History from 'history'

const history = History.createBrowserHistory()
// Storeの情報を格納
export const store = createStore(history)

ReactDOM.render(
  // Appの中でStoreの情報を参照できる
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)
