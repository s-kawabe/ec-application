import React from 'react'
import Router from './Router'

const App = () => {
  return (
    <main>
      {/* この中でURLを解析し、適切なコンポーネントを表示する */}
      <Router />
    </main>
  )
}

export default App
