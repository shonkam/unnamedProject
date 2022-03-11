import React from 'react'
import LoadingScreen from '../LoadingScreen'
import useGetOrders from '../../hooks/useGetOrders'
import {
  Container,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material'

const Orders = () => {
  const allOrders = useGetOrders()

  while (!allOrders) {
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
              <TableCell sx={{ fontWeight: 'bold' }}>Store</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Number of products</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allOrders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.store.name}</TableCell>
                <TableCell>{order.date.substr(0, 25)}</TableCell>
                <TableCell align="center">{order.products.length}</TableCell>
                <TableCell align="right">{order.orderSum} €</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  )
}

export default Orders