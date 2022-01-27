import React from 'react'
import { Link } from 'react-router-dom'
import {
  AppBar,
  Button,
  Container,
  Box
} from '@mui/material'

const StoreLinkHeader = () => {

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Box sx={{
          display: 'flex',
          backgroundColor: 'primary.main'
        }}>
          <Button variant='outlined'>
            <Link to='/' style={{ color: 'white' }}>Profile</Link>
          </Button>

          <Button variant='outlined'>
            <Link to='/products' style={{ color: 'white' }}>Products</Link>
          </Button>

          <Button variant='outlined'>
            <Link to='/addproduct' style={{ color: 'white' }}>Add product</Link>
          </Button>

          <Button variant='outlined'>
            <Link to='/orders' style={{ color: 'white' }}>Orders</Link>
          </Button>

          <Button variant='outlined'>
            <Link to='/logout' style={{ color: 'white' }}>Logout</Link>
          </Button>
        </Box>
      </Container>
    </AppBar>
  )
}

export default StoreLinkHeader