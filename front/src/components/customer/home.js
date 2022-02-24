import React from 'react'
import useGetAllStores from '../../hooks/useGetStores'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  CardActionArea,
  CardMedia,
  CardContent
} from '@mui/material'

const Home = () => {
  const navigate = useNavigate()
  const allStores = useGetAllStores()

  while (!allStores) {
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

  const viewProducts = (store) => {
    navigate(`${store.id}`)
  }

  return (
    <Container maxWidth='lg'>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        {allStores.map((store) => (
          <CardActionArea
            key={store.id}
            onClick={() => viewProducts(store)}
            sx={{ marginTop: 3 }}>
            <CardMedia
              component="img"
              image={`${store.backgroundPictureURL}`}
              alt="profile"
              sx={{ maxHeight: 500 }}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {store.name}
              </Typography>
              <Typography variant="h6" component="div">
                {store.description}
              </Typography>

            </CardContent>


          </CardActionArea>
        ))}

      </Box>
    </Container>
  )
}

export default Home