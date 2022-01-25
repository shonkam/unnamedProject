import { gql } from '@apollo/client'

export const ADD_CUSTOMER = gql`
  mutation AddCustomer($email: String!, $password: String!) {
    addCustomer(email: $email, password: $password) {
      successful
    }
  }
`

export const LOGIN_CUSTOMER = gql`
  mutation LoginCustomer($email: String!, $password: String!) {
    loginCustomer(email: $email, password: $password) {
      token
    }
  }
`

export const ADD_STORE = gql`
  mutation AddStore($email: String!, $password: String!, $name: String!, $address: String!, $city: String!, $postalNumber: Int!, $country: String!) {
    addStore(email: $email, password: $password, name: $name, address: $address, city: $city, postalNumber: $postalNumber, country: $country) {
      successful
    }
  }
`

export const LOGIN_STORE = gql`
  mutation LoginStore($email: String!, $password: String!) {
    loginStore(email: $email, password: $password) {
      token
    }
  }
`

export const ADD_PRODUCT = gql`
  mutation AddProduct($productName: String!, $productPrice: Float!, $productStock: Int!, $productPictureURL: String!, $productDescription: String!) {
    addProduct(productName: $productName, productPrice: $productPrice, productStock: $productStock, productPictureURL: $productPictureURL, productDescription: $productDescription) {
      successful
    }
  }
`