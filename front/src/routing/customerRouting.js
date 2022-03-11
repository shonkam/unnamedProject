import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CustomerLinkHeader from '../components/customer/customerLinkHeader'
import Logout from '../components/logout'
import Home from '../components/customer/home'
import Orders from '../components/customer/Orders'
import CustomerAllProducts from '../components/customer/CustomerAllProducts'
import ShoppingCart from '../components/customer/ShoppingCart'
import {
  Typography,
  Container,
  Box
} from '@mui/material'

const CustomerRouting = () => {
  return (
    <BrowserRouter>
      <CustomerLinkHeader />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/cart' element={<ShoppingCart />} />
        <Route path='store/:storeID' element={<CustomerAllProducts />} />
        <Route path='/logout' element={<Logout />} />
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
  )
}

export default CustomerRouting