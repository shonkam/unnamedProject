import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Stores from './components/stores'
import Login from './components/customer/login'
import LinkHeader from './components/linkHeader'
import SignUp from './components/signUp'
import Logout from './components/logout'
import StoreLogin from './components/store/storeLogin'
import Profile from './components/customer/profile'
import OwnStore from './components/store/ownStore'
import AddProduct from './components/store/addProduct'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setUserLoggedIn } from './redux/reducers/userReducer'


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
    <div style={{ flex: 1 }}>
      <BrowserRouter>
        <LinkHeader />
        {userLoggedIn
          ?
          <Routes>
            <Route path='/logout' element={<Logout />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/ownstore' element={<OwnStore />} />
            <Route path='/addproduct' element={<AddProduct />} />
            <Route exact path='/' element={<Stores />} />
          </Routes>
          :
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route exact path='/' element={<Stores />} />
            <Route exact path='/storelogin' element={<StoreLogin />} />
          </Routes>
        }
      </BrowserRouter>
    </div>
  )
}

export default App;
