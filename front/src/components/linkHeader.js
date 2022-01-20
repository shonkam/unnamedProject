import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Toolbar,
  AppBar,
  Button,
  Container,
  Box
} from '@mui/material'

const LinkHeader = () => {
  const userLoggedIn = useSelector(state => state.user)
  if (userLoggedIn) {
    const userType = localStorage.getItem('userType')
    console.log(userType)
    if (userType === 'customer') {
      // customer header
      return (
        <div>
          <Link to='/'>Home</Link>
          <Link to='/logout'>Logout</Link>
        </div>
      )
    } else {
      // store header
      return (
        <div>
          <Link to='/'>Home</Link>
          <Link to='/logout'>Logout</Link>
        </div>
      )
    }
  }
  // header if not signed in
  else {
    return (
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Box sx={{
            display: 'flex',
            backgroundColor: 'primary.main',



          }}>
            <Button variant='outlined'>
              <Link to='/' style={{ color: 'white' }}>Home</Link>
            </Button>
            <Button variant='outlined'>
              <Link to='/login' style={{ color: 'white' }}>Login</Link>
            </Button>
            <Button variant='outlined'>
              <Link to='/signup' style={{ color: 'white' }}>Sign up</Link>
            </Button>
            <Button variant='outlined'>
              <Link to='/storelogin' style={{ color: 'white' }}>Store login</Link>
            </Button>
          </Box>
        </Container>
      </AppBar>
    )
  }
}

export default LinkHeader