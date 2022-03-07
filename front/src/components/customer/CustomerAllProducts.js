import React from 'react'
import { useParams } from 'react-router-dom'
import useGetAllProducts from '../../hooks/useGetAllProducts'
import LoadingScreen from '../LoadingScreen'
import {
  Container,
  Box,
  Typography,
  CardMedia,
  Button
} from '@mui/material'

const CustomerAllProducts = () => {
  const { storeID } = useParams()
  const storeProducts = useGetAllProducts(storeID)

  while (!storeProducts) {
    return (
      <LoadingScreen />
    )
  }

  return (
    <Container maxWidth='md'>
      {storeProducts.map((product) => (
        <Box
          key={product.id}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 3,
            borderRadius: 1,
            borderColor: '#e5e1e1',
            border: 'solid'
          }}>
          <Box>
            <CardMedia
              component="img"
              image={`${product.productPictureURL}`}
              alt="product"
              sx={{ height: 600, width: 450 }}
            />
          </Box>
          <Box sx={{ marginLeft: 2, marginRight: 2, display: 'flex', flexDirection: 'column', alignSelf: 'center', flex: 1 }}>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }} >
              {product.productName}
            </Typography>
            <Typography variant="h5" component="div" sx={{ marginTop: 3 }}>
              {product.productDescription}
            </Typography>
            <Typography variant="h5" component="div" sx={{ marginTop: 1 }} >
              {product.productPrice} €
            </Typography>
            <Typography variant="h5" component="div" sx={{ marginTop: 1 }}>
              {product.productStock} item in stock
            </Typography>
            <Button

              variant='contained'
              fullWidth
              onClick={() => console.log('pressed')}
              sx={{
                marginTop: 2,
                flex: 1,
                backgroundColor: '#b2afaf',
                ':hover': {
                  bgcolor: '#7f7d7d'
                }
              }}>
              Add to cart
            </Button>
          </Box>
        </Box>
      ))}
    </Container >
  )
}

export default CustomerAllProducts