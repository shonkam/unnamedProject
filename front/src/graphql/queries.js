import { gql } from '@apollo/client'

export const ADD_CUSTOMER = gql`
  mutation AddCustomer($email: String!, $password: String!) {
    addCustomer(email: $email, password: $password) {
      successful
    }
  }
`