import { gql } from 'apollo-server-express'

export const ALL_USERS = gql`
  query allUsers($username: String){
    allUsers(username: $username) {
      username
    }
  }
`

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
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