import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserLoggedOut } from '../reducers/userReducer'

const Logout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const executeLogout = async () => {
    console.log('logout')
    await localStorage.clear()
    await dispatch(setUserLoggedOut())
    navigate('/')
  }

  executeLogout()

  return (
    <div>
      logging out...
    </div>
  )
}

export default Logout