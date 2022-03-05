import React from 'react'
import { useParams } from 'react-router-dom'
import useGetAllProducts from '../../hooks/useGetAllProducts'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  ImageList,
  CardActionArea,
  CardMedia,
  CardContent
} from '@mui/material'

const CustomerAllProducts = () => {
  const navigate = useNavigate()
  const { storeID } = useParams()
  const storeProducts = useGetAllProducts(storeID)

  const viewProduct = (product) => {
    navigate(`${product.id}`)
  }

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
        marginTop: 1
      }}>
        <ImageList
          cols={2}
          gap={50}
          sx={{ overflow: 'hidden' }}
        >
          {storeProducts.map((product) => (
            <CardActionArea
              key={product.id}
              onClick={() => viewProduct(product)}
            >
              <CardMedia
                component="img"
                image={`${product.productPictureURL}`}
                alt="product"
                sx={{ maxHeight: 700 }}
              />
              <CardContent
                sx={{ backgroundColor: "Snow" }}
              >
                <div style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: 'space-between',
                  marginBottom: 10
                }} >
                  <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    {product.productName}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {product.productPrice}
                  </Typography>
                </div>
                <Typography variant="h6" component="div">
                  {product.productDescription}
                </Typography>
              </CardContent>
            </CardActionArea>
          ))}
        </ImageList>
      </Box>
    </Container >
  )
}

export default CustomerAllProducts