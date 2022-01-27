import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeUserType } from '../redux/reducers/userReducer'

const Logout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
  const executeLogout = async () => {
    console.log('logout')
    await localStorage.clear()
    navigate('/')
    await dispatch(removeUserType())
  }
  executeLogout()
})


  return (
    <div>
      logging out...
    </div>
  )
}

export default Logout