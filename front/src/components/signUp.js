import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: ''
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4)
    .max(15)
    .required('Username is required'),
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

function SignUp() {

  function submitSignUp(values) {
    try {
      console.log(values)
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
            <Field name='username' placeholder='Username' />
            <Field name='password' type='password' placeholder='Password' />
            <Field name='passwordConfirmation' type='password' placeholder='Confirm password' />
            <button type='submit' >
              Submit
            </button>
          </Form>
        </Formik>
        </div>
    )
}

export default SignUp