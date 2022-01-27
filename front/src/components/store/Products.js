import React from 'react'
import useGetProducts from '../../hooks/useGetProducts'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'

const Products = () => {
  const navigate = useNavigate()
  const ownProducts = useGetProducts()
  console.log(ownProducts)

  while (!ownProducts) {
    return (
      <div>loading...</div>
    )
  }

  const customizeProduct = (item) => {
    console.log('pressed', item)
    navigate(`/products/${item.id}`)
  }

  return (
    <Container maxWidth='lg'>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Typography
          component='h1'
          variant='h5'
          alignSelf='center'
        >
          Your products
        </Typography>
        <ImageList
          variant='quilted'
          cols={2}
          gap={10}
          sx={{ overflow: 'hidden' }}
        >
          {ownProducts.allProducts.map((item) => (
            <ImageListItem key={item.productName}>
              <img
                src={`${item.productPictureURL}`}
                alt={item.productName}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.productName}
                subtitle={item.productDescription}
                actionIcon={
                  <IconButton onClick={() => customizeProduct(item)}>
                    <SettingsIcon sx={{ color: 'white' }} />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Container>
  )
}

export default Products