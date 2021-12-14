import dotenv from 'dotenv'
import { gql } from 'apollo-server-express'
import { UserInputError } from 'apollo-server-express'
import User from './models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET

export const typeDefs = gql`
  type User {
    username: String!
    password: String!
    id: ID!
  }

  type Token {
    tokenValue: String!
  }
  
  type Query {
    allUsers(username: String): [User]
  }

  type Message {
    message: String!
  }

  type Mutation {

    addUser(
      username: String!
      password: String!
    ): User

    deleteUser(
      username: String!
    ): Message

    login(
      username: String!
      password: String!
    ): Token
  }
`

export const resolvers = {
  Query: {
    allUsers: async (root, args) => {
      try {
        if (args.username) {
          const response = await User.findOne({ username: args.username })
          //todo better work-around
          return [response]
        }
        else {
          return await User.find({})
        }
      } catch (error) {
        //todo better error handling
        console.log(error)

        return error
      }
    }
  },

  Mutation: {
    addUser: async (root, args) => {
      try {
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
    },

    deleteUser: async (root, args) => {
      try {
        const user = await User.findOne({ username: args.username })
        await User.findByIdAndDelete(user.id)

        return { message: `Account ${args.username} was successfully deleted` }
      } catch (error) {
        //todo better error handling
        console.log('followed error occured: ', error)
      }
    },

    login: async (root, args) => {
      try {
        const user = await User.findOne({ username: args.username })

        if (!user) {
          throw new UserInputError('Check credentials')
        }

        // compare returns true if the password given by user matches with the hashed password
        const passwordIsValid = await bcrypt.compare(args.password, user.password)

        if (!passwordIsValid) {
          throw new UserInputError('Check credentials')
        }

        const userDataForToken = {
          id: user._id,
          username: user.username
        }

        const token = await jwt.sign(userDataForToken, JWT_SECRET)

        return { tokenValue: token }
      } catch (error) {
        //todo better error handling
        console.log('followed error occured while creating a new user', error)

        return error
      }
    }
  }
}