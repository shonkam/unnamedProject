import React from 'react'
//import useAddProduct from '../hooks/useAddProduct'
//import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {
  Button,
  Container,
  Box,
  Typography,
  TextField,
} from '@mui/material'

const validationSchema = yup.object().shape({
  productName: yup
    .string('Enter the product name')
    .required('Product name is required'),
  productPrice: yup
    .number('Enter the price of the product in euros')
    .required('Product price is required')
    .positive('Price can not be negative')
    .typeError('Price can only contain numbers (use dot as a decimal separator)'),
  productStock: yup
    .number('Enter the number of available stock')
    .required('Product stock is required')
    .positive('Stock can not be negative')
    .integer('Stock must be an integer')
    .typeError('Postal number can only contain numbers')
})

const AddProduct = () => {

  const addProductForm = useFormik({
    initialValues: {
      productName: '',
      productPrice: '',
      productStock: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      submitAddProduct(values)
    }
  })

  const submitAddProduct = async (values) => {
    console.log('submitProduct', values)
  }

  return (
    <Container maxWidth='xs'>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 15,
        alignItems: 'center'
      }}>
        <Typography
          component='h1'
          variant='h5'
          alignSelf='center'
        >
          Add product
        </Typography>
        <Box
          component='form'
          onSubmit={addProductForm.handleSubmit}
        >

          <Typography
            sx={{ paddingTop: 3 }}
            variant='subtitle1'
            align='left'
          >
            Please fill in the information about the product
          </Typography>

          <TextField
            margin='normal'
            fullWidth
            id='productName'
            name='productName'
            label='Name'
            onSubmit={addProductForm.handleSubmit}
            value={addProductForm.values.productName}
            onChange={addProductForm.handleChange}
            error={addProductForm.touched.productName && Boolean(addProductForm.errors.productName)}
            helperText={addProductForm.touched.productName && addProductForm.errors.productName}
          />
          <TextField
            margin='normal'
            fullWidth
            id='productPrice'
            name='productPrice'
            label='Price'
            onSubmit={addProductForm.handleSubmit}
            value={addProductForm.values.productPrice}
            onChange={addProductForm.handleChange}
            error={addProductForm.touched.productPrice && Boolean(addProductForm.errors.productPrice)}
            helperText={addProductForm.touched.productPrice && addProductForm.errors.productPrice}
          />
          <TextField
            margin='normal'
            fullWidth
            id='productStock'
            name='productStock'
            label='Stock'
            onSubmit={addProductForm.handleSubmit}
            value={addProductForm.values.productStock}
            onChange={addProductForm.handleChange}
            error={addProductForm.touched.productStock && Boolean(addProductForm.errors.productStock)}
            helperText={addProductForm.touched.productStock && addProductForm.errors.productStock}
          />

          <Button
            color='primary'
            variant='contained'
            fullWidth
            type='submit'
            sx={{
              marginTop: 2
            }}
          >
            Add product
          </Button>
        </Box>
      </Box>
    </Container >
  )
}

export default AddProduct