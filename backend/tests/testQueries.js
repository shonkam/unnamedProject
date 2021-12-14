import { gql } from 'apollo-server-express'

export const ALL_STORES = gql`
  query AllStores($name: String) {
    allStores(name: $name) {
      name
    }
  }
`
export const ADD_STORE = gql`
  mutation AddStore($name: String!, $address: String!, $city: String!, $postalNumber: String!, $country: String!, $categories: [String!]) {
    addStore(name: $name, address: $address, city: $city, postalNumber: $postalNumber, country: $country, categories: $categories) {
      name
    }
  }
`

export const DELETE_STORE = gql`
  mutation DeleteStore($name: String!) {
    deleteStore(name: $name) {
      message
    }
  }
`

export const ALL_USERS = gql`
  query AllUsers($username: String){
    allUsers(username: $username) {
      username
    }
  }
`

export const ADD_USER = gql`
  mutation AddUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      username
    }
  }
`
export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      tokenValue
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($username: String!) {
    deleteUser(username: $username) {
      message  
    }
  }
`