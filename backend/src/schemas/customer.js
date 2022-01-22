import dotenv from 'dotenv'
import { gql } from 'apollo-server-express'
import { UserInputError } from 'apollo-server-express'
import Customer from '../mongooseModels/customerModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET

export const typeDefs = gql`
  type Customer {
    email: String!
    id: ID!
  }

  type Token {
    token: String!
  }
  
  type Query {
    allCustomers(email: String): [Customer]
  }

  type Message {
    message: String!
  }

  type RequestSuccessful {
    successful: Boolean!
  }

  type Mutation {

    addCustomer(
      email: String!
      password: String!
    ): RequestSuccessful

    deleteCustomer(
      email: String!
    ): Message

    loginCustomer(
      email: String!
      password: String!
    ): Token
  }
`

export const resolvers = {
  Query: {
    allCustomers: async (root, args) => {
      try {
        if (args.email) {
          const response = await Customer.findOne({ email: args.email })
          //todo better work-around
          return [response]
        }
        else {
          return await Customer.find({})
        }
      } catch (error) {
        //todo better error handling
        console.log(error)

        return error
      }
    }
  },

  Mutation: {
    addCustomer: async (root, args) => {
      try {
        const hashedPassword = await bcrypt.hash(args.password, 10)
        const newCustomer = new Customer({
          email: args.email,
          password: hashedPassword
        })
        await newCustomer.save()
        return { successful: true }

      } catch (error) {
        //todo better error handling
        console.log('followed error occured while creating a new user', error)

        return { successful: false }
      }
    },

    deleteCustomer: async (root, args) => {
      try {
        const customer = await Customer.findOne({ email: args.email })
        await Customer.findByIdAndDelete(customer.id)

        return { message: `Account "${args.email}" was successfully deleted` }
      } catch (error) {
        //todo better error handling
        console.log('followed error occured: ', error)
      }
    },

    loginCustomer: async (root, args) => {
      try {
        const customer = await Customer.findOne({ email: args.email })

        if (!customer) {
          throw new UserInputError('Check credentials')
        }

        // compare returns true if the password given by user matches with the hashed password
        const passwordIsValid = await bcrypt.compare(args.password, customer.password)

        if (!passwordIsValid) {
          throw new UserInputError('Check credentials')
        }

        const customerDataForToken = {
          id: customer._id,
          email: customer.email,
          type: 'customer'
        }

        const token = await jwt.sign(customerDataForToken, JWT_SECRET)

        return { token: token }
      } catch (error) {
        //todo better error handling
        console.log('followed error occured while logging in as a customer', error)

        return error
      }
    }
  }
}