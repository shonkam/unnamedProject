import React from 'react'
import useGetStores from '../../hooks/useGetStores'
import {
  Container,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent
} from '@mui/material'

const StoreProfile = () => {
  const singleStore = true
  const ownStore = useGetStores(singleStore)

  while (!ownStore) {
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
            Loading store information...
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
        paddingTop: 2
      }}>
        <Typography
          component='h1'
          variant='h5'
          alignSelf='center'
        >
          Your profile
        </Typography>
        <Card sx={{ paddingTop: 2 }}>
          <CardMedia
            component="img"
            image={`${ownStore.backgroundPictureURL}`}
            alt="profile"
            sx={{ maxHeight: 500 }}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {ownStore.name}
            </Typography>
            <Typography variant="h6" component="div">
              {ownStore.description}
            </Typography>
            <Typography variant="h6" component="div">
              {ownStore.location.city}, {ownStore.location.country}
            </Typography>
          </CardContent>


        </Card>
      </Box>
    </Container>
  )
}

export default StoreProfile