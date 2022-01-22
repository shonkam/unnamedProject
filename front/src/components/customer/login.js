import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'
import { useDispatch } from 'react-redux'
import { setUserLoggedIn } from '../../reducers/userReducer'
import {
  Button,
  Container,
  Box,
  Typography,
  TextField
} from '@mui/material'

const validationSchema = yup.object().shape({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(7, 'Password should be atleast 7 characters long')
    .required('Password is required'),
})

const Login = () => {
  const [login] = useLogin()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      submitLogin(values)
    }
  })

  //submit login credentials
  const submitLogin = async (values) => {
    try {
      const email = values.email
      const password = values.password

      const response = await login(email, password)

      // login hook returns false
      // if the response from the
      // server doesn't include
      // token
      if (!response) {
        console.log('Login failed, please check your credentials')
      }
      else {
        console.log('Your token is: ', response)
        await localStorage.setItem('userToken', response)
        await localStorage.setItem('userType', 'customer')
        navigate('/')
        await dispatch(setUserLoggedIn())
      }
      //todo noti
    } catch (error) {
      console.log(error)
      //todo noti
    }
  }

  return (
    <Container maxWidth='xs'>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 15
      }}>
        <Typography
          component='h1'
          variant='h5'
          alignSelf='center'
        >
          Login
        </Typography>
        <Box
          component='form'
          onSubmit={loginForm.handleSubmit}
        >
          <TextField
            margin='normal'
            fullWidth
            id='email'
            name='email'
            label='Email'
            value={loginForm.values.email}
            onChange={loginForm.handleChange}
            error={loginForm.touched.email && Boolean(loginForm.errors.email)}
            helperText={loginForm.touched.email && loginForm.errors.email}
          />
          <TextField
            margin='normal'
            fullWidth
            id='password'
            name='password'
            label='Password'
            type='password'
            value={loginForm.values.password}
            onChange={loginForm.handleChange}
            error={loginForm.touched.password && Boolean(loginForm.errors.password)}
            helperText={loginForm.touched.password && loginForm.errors.password}
          />
          <Button
            color='primary'
            variant='contained'
            fullWidth
            type='submit'
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Login