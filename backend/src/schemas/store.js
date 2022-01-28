import dotenv from 'dotenv'
import { gql } from 'apollo-server'
import { UserInputError, AuthenticationError } from 'apollo-server'
import Store from '../mongooseModels/storeModel.js'
import Product from '../mongooseModels/productModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET

export const typeDefs = gql`

  type Location {
    address: String!
    city: String!
    postalNumber: String!
    country: String!
  }

  type Store {
    email: String!
    name: String!
    location: Location!
    products: [Product]
  }

  type Product {
    id: ID!
    productName: String!
    productPrice: String!
    productStock: Int!
    productPictureURL: String!
    productDescription: String!
    productStore: Store!
  }

  type Message {
    message: String!
  }

  type Token {
    token: String!
  }

  type RequestSuccessful {
    successful: Boolean!
  }

  type Query {
    allStores(name: String): [Store]
  }

  type Mutation {
    addStore(
      email: String!
      password: String!
      name: String!   
      address: String!
      city: String!
      postalNumber: Int!
      country: String!
    ): RequestSuccessful

    deleteStore: Message

    loginStore(
      email: String!
      password: String!
    ): Token
  }
`

export const resolvers = {
  Query: {
    allStores: async (root, args) => {
      try {
        if (args.name) {
          const response = await Store.findOne({ name: args.name })
          //todo better
          return [response]
        }
        else {
          return await Store.find({})
        }
      } catch (error) {
        //todo better error handling
        console.log(error)

        return error
      }
    }
  },

  Mutation: { 
    addStore: async (root, args) => {
      try {
        const hashedPassword = await bcrypt.hash(args.password, 10)
        const newStore = new Store({
          email: args.email,
          password: hashedPassword,
          name: args.name,
          location: {
            address: args.address,
            city: args.city,
            postalNumber: args.postalNumber,
            country: args.country
          }
        })

        await newStore.save()
        return { successful: true }
      } catch (error) {
        console.log('error occurred while adding a store: ', error)
        return { successful: false }
      }
    },

    deleteStore: async (root, args, context) => {
      if (!context.currentStore) {

        throw new AuthenticationError('not authorized')
      }
      try {
        console.log('ON STORE')
        const store = context.currentStore
        console.log(store)
        await Store.findByIdAndDelete(store.id)

        return { message: `Store was successfully deleted` }
      } catch (error) {
        console.log('an error occurred while deleting store', error)
      }
    },

    loginStore: async (root, args) => {
      try {
        const store = await Store.findOne({ email: args.email })

        if (!store) {
          console.log('eka')
          throw new UserInputError('Check credentials')
        }

        // compare returns true if the password given by user matches with the hashed password
        const passwordIsValid = await bcrypt.compare(args.password, store.password)

        if (!passwordIsValid) {
          throw new UserInputError('Check credentials')
        }

        const storeDataForToken = {
          id: store._id,
          email: store.email,
          type: 'store'
        }

        const token = await jwt.sign(storeDataForToken, JWT_SECRET)

        return { token: token }
      } catch (error) {
        //todo better error handling
        console.log('followed error occured while logging in', error)

        return error
      }
    }
  }
}