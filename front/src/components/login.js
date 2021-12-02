import React from 'react';
import { Formik, Form, Field } from 'formik';

const initialValues = {
    username: '',
    password: ''
}

function Login() {

    //submit login credentials
    function submitLogin(values) {     
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
            login
            <Formik
                initialValues={initialValues}
                onSubmit={submitLogin}
            >
                <Form>
                    <Field name='username' placeholder='Username'/>
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