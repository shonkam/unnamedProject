import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const LinkHeader = () => {
  const userLoggedIn = useSelector(state => state.user)

  if (userLoggedIn) {
    return (
      <div>
        <Link to='/'>Home</Link>
        <Link to='/logout'>Logout</Link>
      </div>
    )
  }
  else {
    return (
      <div>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Sign up</Link>
      </div>
    )
  }
}

export default LinkHeader