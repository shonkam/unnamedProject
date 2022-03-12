import React from 'react'
import { Link } from 'react-router-dom'
import {
  AppBar,
  Button,
  Container,
  Box,
} from '@mui/material'

const LinkHeader = () => (
  <AppBar position='static'>
    <Container maxWidth='xl'>
      <Box sx={{
        display: 'flex',
        backgroundColor: 'primary.main',
      }}
      >
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

export default LinkHeader
