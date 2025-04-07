
import React from 'react'
import { useSelector } from 'react-redux'

export default function Home() {
  const { currentUser } = useSelector(state => state.user);
  return (
    <div>
      <h1 className='text-4xl text-center mt-20 '>Hello <span className='font-bold italic'>{currentUser && currentUser.fullname}</span></h1>
    </div>
  )
}