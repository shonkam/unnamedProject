import React from 'react'
import { useParams } from 'react-router-dom'
import useGetSingleProduct from '../../hooks/useGetSingleProduct'
import {
  Container,
  Box,
  Typography,
  CardMedia,
  Button
} from '@mui/material'
const CustomerSingleProduct = () => {
  const { productID } = useParams()
  const product = useGetSingleProduct(productID)

  while (!product) {
    return (
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
            Loading results...
          </Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth='lg'>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: 3
      }}>
        <Box>
          <CardMedia
            component="img"
            image={`${product.productPictureURL}`}
            alt="product"
            sx={{ maxHeight: 700 }}
          />
        </Box>
        <Box sx={{ marginLeft: 5, display: 'flex', flexDirection: 'column', alignSelf: 'center' }}>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }} >
            {product.productName}
          </Typography>
          <Typography variant="h5" component="div" >
            {product.productDescription}
          </Typography>
          <Typography variant="h5" component="div" >
            {product.productPrice} €
          </Typography>
          <Typography variant="h5" component="div" >
            {product.productStock} item in stock
          </Typography>
          <Button
            color='primary'
            variant='contained'
            fullWidth
            onClick={() => console.log('pressed')}
            sx={{
              marginTop: 2,
              alignSelf: 'flex-end'
            }}>
            Add to cart
          </Button>
        </Box>
      </Box>
    </Container >
  )
}

export default CustomerSingleProduct