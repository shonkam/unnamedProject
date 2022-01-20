import { gql } from 'apollo-server-express'

// STORE QUERIES

export const ALL_STORES = gql`
  query AllStores($name: String) {
    allStores(name: $name) {
      name
    }
  }
`
export const ADD_STORE = gql`
  mutation AddStore($email: String!, $password: String!, $name: String!, $address: String!, $city: String!, $postalNumber: Int!, $country: String!) {
    addStore(email: $email, password: $password, name: $name, address: $address, city: $city, postalNumber: $postalNumber, country: $country) {
      name
      email
      location {
        country
        postalNumber
        address
        city
      }
    }
  }
`

export const DELETE_STORE = gql`
  mutation DeleteStore {
    deleteStore {
      message
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

// CUSTOMER QUERIES

export const ALL_CUSTOMERS = gql`
  query AllCustomers($email: String){
    allCustomers(email: $email) {
      email
    }
  }
`

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

export const DELETE_CUSTOMER = gql`
  mutation DeleteCustomer($email: String!) {
    deleteCustomer(email: $email) {
      message  
    }
  }
`