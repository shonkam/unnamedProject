import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LoadingScreen from '../LoadingScreen'
import { emptyCart } from '../../redux/reducers/shoppingCartReducer'
import {
  Container,
  Box,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material'

const ShoppingCart = () => {
  const dispatch = useDispatch()
  const productsInCart = useSelector(state => state.shoppingCart)

  let totalSum = 0
  if (productsInCart) {
    productsInCart.map((product) => {
      totalSum += parseFloat(product.productPrice)
    })
    totalSum = totalSum.toFixed(2)
  }

  const removeItems = () => {
    dispatch(emptyCart())
  }

  const createOrder = async () => {
    console.log('order')
  }

  while (!productsInCart) {
    return (
      <LoadingScreen />
    )
  }

  return (
    <Container maxWidth='md'>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Preview</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsInCart.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.productName}</TableCell>
                <TableCell align="center">
                  <img style={{ maxHeight: 100, maxWidth: 80 }} src={product.productPictureURL} />
                </TableCell>
                <TableCell align="right">{product.productPrice}€</TableCell>
              </TableRow>
            ))}
            <TableRow key='kmvölwde'>
              <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>{totalSum} €</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button
          variant='contained'
          color='error'
          onClick={removeItems}
          sx={{
            marginTop: 2,
            float: 'left',
            alignSelf: 'end'
          }}>
          Remove items
        </Button>
        <Button
          variant='contained'
          onClick={createOrder}
          sx={{
            marginTop: 2,
            float: 'right',
            alignSelf: 'end',
            backgroundColor: '#b2afaf',
            ':hover': {
              bgcolor: '#7f7d7d'
            }
          }}>
          Purchase
        </Button>
      </Box>
    </Container>
  )
}

export default ShoppingCart