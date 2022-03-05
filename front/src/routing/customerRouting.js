import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CustomerLinkHeader from '../components/customer/customerLinkHeader'
import Logout from '../components/logout'
import Home from '../components/customer/home'
import Profile from '../components/customer/profile'
import CustomerAllProducts from '../components/customer/CustomerAllProducts'
import CustomerSingleProduct from '../components/customer/CustomerSingleProduct'
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
        <Route path='/profile' element={<Profile />} />
        <Route path='/:storeID' element={<CustomerAllProducts />} />
        <Route path='/:storeID/:productID' element={<CustomerSingleProduct />} />
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