import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import useLogin from '../hooks/useLogin'

const initialValues = {
  email: '',
  password: ''
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required('Email is required'),
  password: yup
    .string()
    .min(5)
    .max(32)
    .required('Password is required'),
})

const Login = () => {
  const [login] = useLogin()

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
      }
        //todo noti
      } catch (error) {
        console.log(error)
        //todo noti
      }
    }

    return (
      <div>
        login
        <Formik
          initialValues={initialValues}
          onSubmit={submitLogin}
          validationSchema={validationSchema}
        >
          <Form>
            <Field name='email' placeholder='Email' />
            <Field name='password' type='password' placeholder='Password' />
            <button type='submit' >
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    )
  }

export default Login