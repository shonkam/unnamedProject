import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home'
import Login from './components/login'
import LinkHeader from './components/linkHeader'
import SignUp from './components/signUp'
import Logout from './components/logout'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setUserLoggedIn } from './reducers/userReducer'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if (token) {
      dispatch(setUserLoggedIn())
    }
  }, [dispatch])

  const userLoggedIn = useSelector(state => state.user)

  return (
    <BrowserRouter>
      <LinkHeader />
      {userLoggedIn
        ?
        <Routes>
          <Route path='/logout' element={<Logout />} />
          <Route exact path='/' element={<Home />} />
        </Routes>
        :
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route exact path='/' element={<Home />} />
        </Routes>
      }
    </BrowserRouter>
  )
}

export default App;
