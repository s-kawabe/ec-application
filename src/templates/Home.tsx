import React from 'react'
import { getUserId, getUserName } from '../reducks/users/selector'
import { useSelector } from 'react-redux'

const Home = () => {
  // store全体のstateを引数に渡す
  const selector = useSelector((state) => state)
  const uid = getUserId(selector)
  const userName = getUserName(selector)

  return (
    <div>
      <h2>Home</h2>
      <p>ユーザID：{uid}</p>
      <p>ユーザ名：{userName}</p>
    </div>
  )
}

export default Home
