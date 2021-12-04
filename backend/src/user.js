import { gql } from 'apollo-server-express'

const users = [
  {
    name: 'Heikki'
  },
  {
    name: 'Juuso'
  },
]

export const typeDef = gql`
  type User {
    name: String
  }
  
  type Query {
    users: [User]
  }
`

export const resolvers = {
  Query: {
    users: () => users,
  },
}