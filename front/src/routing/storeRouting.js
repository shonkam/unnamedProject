import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StoreLinkHeader from '../components/store/storeLinkHeader'
import Logout from '../components/logout'
import Products from '../components/store/Products'
import AddProduct from '../components/store/addProduct'
import CustomizeProduct from '../components/store/customizeProduct'
import StoreProfile from '../components/store/storeProfile'
import StoreOrders from '../components/store/storeOrders'
import {
  Typography,
  Container,
  Box
} from '@mui/material'

const StoreRouting = () => {
  return (
    <BrowserRouter>
      <StoreLinkHeader />
      <Routes>

        <Route exact path='/' element={<StoreProfile />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<CustomizeProduct />} />
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/orders' element={<StoreOrders />} />
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

export default StoreRouting