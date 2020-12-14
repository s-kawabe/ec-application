import React from 'react'
import { getUserId } from '../reducks/users/selector'
import { useSelector } from 'react-redux'

const Home = () => {
  // store全体のstateを引数に渡す
  const selector = useSelector((state) => state)
  const uid = getUserId(selector)

  console.log(selector)
  console.log(uid)

  return (
    <div>
      <h2>Home</h2>
      <p>{uid}</p>
    </div>
  )
}

export default Home
