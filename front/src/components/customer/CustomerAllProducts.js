import React from 'react'
import { useParams } from 'react-router-dom'
import useGetAllProducts from '../../hooks/useGetAllProducts'
import {
  Container,
  Box,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar
} from '@mui/material'
const CustomerAllProducts = () => {

  const { storeID } = useParams()
  const storeProducts = useGetAllProducts(storeID)

  while (!storeProducts) {
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
        flexDirection: 'column',
        paddingTop: 1
      }}>
        <ImageList
          variant='quilted'
          cols={2}
          gap={10}
          sx={{ overflow: 'hidden' }}
        >
          {storeProducts.map((product) => (
            <ImageListItem key={product.id}>
              <img
                src={`${product.productPictureURL}`}
                alt={product.productName}
                loading="lazy"
              />
              <ImageListItemBar
                title={product.productName}
                subtitle={product.productDescription}

              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Container>

  )
}

export default CustomerAllProducts