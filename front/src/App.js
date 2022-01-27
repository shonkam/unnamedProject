import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Stores from './components/stores'
import Login from './components/customer/login'
import LinkHeader from './components/linkHeader'
import SignUp from './components/signUp'
import StoreLogin from './components/store/storeLogin'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setUserType } from './redux/reducers/userReducer'
import CustomerRouting from './routing/customerRouting'
import StoreRouting from './routing/storeRouting'
import {
  Typography,
  Container,
  Box
} from '@mui/material'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if (token) {
      const userType = localStorage.getItem('userType')
      dispatch(setUserType(userType))
    }
  }, [dispatch])

  const userType = useSelector(state => state.user)

  if (userType === 'store') {
    return (
      < StoreRouting />
    )
  }

  else if (userType === 'customer') {
    return (
      < CustomerRouting />
    )
  }
  else {
  return (
    <div style={{ flex: 1 }}>
      <BrowserRouter>
        <LinkHeader />     
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route exact path='/' element={<Stores />} />
          <Route exact path='/storelogin' element={<StoreLogin />} />
          <Route
            path="*"
            element={
              <Container maxWidth='lg'>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingTop: 20
                }}>
                  <Typography
                    component='h1'
                    variant='h6'
                    alignSelf='center'
                  >
                    Nothing to see here...
                  </Typography>
                </Box>
              </Container>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
}

export default App;
