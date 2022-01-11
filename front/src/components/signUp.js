import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import useSignUp from '../hooks/useSignUp'

const initialValues = {
  email: '',
  password: '',
  passwordConfirmation: ''
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
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], "Passwords don't match")
    .required('Password confirmation is required')
});

const SignUp = () => {
  const [signUp] = useSignUp()

  const submitSignUp = async (values) => {
    try {
      console.log(values)
      const email = values.email
      const password = values.password

      const response = await signUp(email, password)
      // mutation returns a boolean
      // informing about the status
      // of request success
      //
      // returning true means that
      // the request was successfully
      // handled

      if (response) {
        console.log('Signed up successfully')
      }
      else {
        console.log('Something went wrong, please try again')
      }
      //todo noti
    } catch (error) {
      console.log(error)
      //todo noti
    }
  }
    return (
        <div>
        Sign up
        <Formik
          initialValues={initialValues}
          onSubmit={submitSignUp}
          //todo error message
          validationSchema={validationSchema}
        >
          <Form>
            <Field name='email' placeholder='Email' />
            <Field name='password' type='password' placeholder='Password' />
            <Field name='passwordConfirmation' type='password' placeholder='Confirm password' />
            <button type='submit' >
              Register
            </button>
          </Form>
        </Formik>
        </div>
    )
}

export default SignUp