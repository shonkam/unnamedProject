import React from 'react'
import useGetAllStores from '../../hooks/useGetStores'
import LoadingScreen from '../LoadingScreen'
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
      <LoadingScreen />
    )
  }

  const viewProducts = (store) => {
    window.scroll(0, 0)
    navigate(`store/${store.id}`)
  }

  return (
    <Container maxWidth='md'>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: 3
      }}>
        {allStores.map((store) => (
          <CardActionArea
            key={store.id}
            onClick={() => viewProducts(store)}
          >
            <CardMedia
              component="img"
              image={`${store.backgroundPictureURL}`}
              alt="profile"
              sx={{ maxHeight: 500 }}
            />
            <CardContent>
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
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