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
  mutation AddStore($name: String!, $address: String!, $city: String!, $postalNumber: String!, $country: String!, $categories: [String], $password: String!, $email: String!) {
  addStore(name: $name, address: $address, city: $city, postalNumber: $postalNumber, country: $country, categories: $categories, password: $password, email: $email) {
    email
    name
    categories
    location {
      country
      postalNumber
      city
      address
    }
  }
}
`

export const DELETE_STORE = gql`
  mutation DeleteStore($email: String!) {
    deleteStore(email: $email) {
      message
    }
  }
`

export const LOGIN_STORE = gql`
  mutation LoginStore($email: String!, $password: String!) {
    loginStore(email: $email, password: $password) {
      tokenValue
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
      email
    }
  }
`
export const LOGIN_CUSTOMER = gql`
  mutation LoginCustomer($email: String!, $password: String!) {
    loginCustomer(email: $email, password: $password) {
      tokenValue
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