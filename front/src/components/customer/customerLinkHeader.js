import React from 'react'
import { Link } from 'react-router-dom'
import {
  AppBar,
  Button,
  Container,
  Box
} from '@mui/material'

const CustomerLinkHeader = () => {

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
}

export default CustomerLinkHeader