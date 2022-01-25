import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
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
        <AppBar position='static'>
          <Container maxWidth='xl'>
            <Box sx={{
              display: 'flex',
              backgroundColor: 'primary.main'
            }}>
              <Button variant='outlined'>
                <Link to='/' style={{ color: 'white' }}>Stores</Link>
              </Button>
              <Button variant='outlined'>
                <Link to='/profile' style={{ color: 'white' }}>Profile</Link>
              </Button>
              <Button variant='outlined'>
                <Link to='/logout' style={{ color: 'white' }}>Logout</Link>
              </Button>
            </Box>
          </Container>
        </AppBar>    
      )
    } else {
      // store header
      return (    
        <AppBar position='static'>
          <Container maxWidth='xl'>
            <Box sx={{
              display: 'flex',
              backgroundColor: 'primary.main'
            }}>
              <Button variant='outlined'>
                <Link to='/ownstore' style={{ color: 'white' }}>Home</Link>
              </Button>
              <Button variant='outlined'>
                <Link to='/logout' style={{ color: 'white' }}>Logout</Link>
              </Button>
            </Box>
          </Container>
        </AppBar>
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
            backgroundColor: 'primary.main'
          }}>
            <Button variant='outlined'>
              <Link to='/' style={{ color: 'white' }}>Stores</Link>
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