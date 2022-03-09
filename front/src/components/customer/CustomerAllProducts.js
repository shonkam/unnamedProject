import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart, emptyCart } from '../../redux/reducers/shoppingCartReducer'
import { setStore } from '../../redux/reducers/currentStoreReducer'
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
  const dispatch = useDispatch()
  const { storeID } = useParams()
  const currentStore = useSelector(state => state.currentStore)
  const storeProducts = useGetAllProducts(storeID)

  const addToCart = (product, storeID) => {
    // if no current store, then cart is empty
    if (currentStore) {
      // confirm to remove existing products from the cart
      if (currentStore !== storeID) {
        if (window.confirm('You have already added products from other store into your cart. Do you wish to remove those products and add this one instead?')) {
          dispatch(emptyCart())
          dispatch(setStore(storeID))
          dispatch(addProductToCart(product))
        }
        // products are from the same store
      } else {
        dispatch(addProductToCart(product))
      }
    } else {
      dispatch(setStore(storeID))
      dispatch(addProductToCart(product))
    }
  }

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
            marginBottom: 3,
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
          <Box sx={{ marginLeft: 2, marginRight: 2, display: 'flex', flexDirection: 'column', alignSelf: 'center' }}>
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
              onClick={() => addToCart(product, storeID)}
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
      <Box sx={{ display: 'flex', flex: 1, marginBottom: 39 }} />
    </Container >
  )
}

export default CustomerAllProducts