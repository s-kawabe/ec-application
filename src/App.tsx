import React from 'react'
import Router from './Router'
import { Header } from './components/Header'

const App = () => {
  return (
    // returnするelementは常にルート１個でないと
    <>
      <Header />
      <main className="c-main">
        {/* この中でURLを解析し、適切なコンポーネントを表示する */}
        <Router />
      </main>
    </>
  )
}

export default App
