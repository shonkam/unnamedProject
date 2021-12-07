import { gql } from 'apollo-server-express'
import User from './models/userModel.js'
import bcrypt from 'bcryptjs'

export const typeDefs = gql`
  type User {
    username: String!
    password: String!
    id: ID!
  }
  
  type Query {
    allUsers(username: String): [User]
  }

  type Mutation {
    addUser(
      username: String!
      password: String!
    ): User
  }
`

export const resolvers = {
  Query: {
    allUsers: async (root, args) => {
      try {
        if (args.username) {
          return await User.find({ username: args.username })
        }
        else {
          return await User.find({})
        }
      } catch (error) {
        console.log(error)
        return error
      }
    }
  },

  Mutation: {
    addUser: async (root, args) => {
      try {
        console.log(args)
        const hashedPassword = await bcrypt.hash(args.password, 10)

        const newUser = new User({
          username: args.username,
          password: hashedPassword
        })

        return await newUser.save()

      } catch (error) {
        //todo better error handling
        console.log('followed error occured while creating a new user', error)

        return error
      }
    }
  }
}