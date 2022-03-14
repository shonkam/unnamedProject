import dotenv from 'dotenv'
import { ApolloServer } from 'apollo-server'
import jwt from 'jsonwebtoken'
import { schema } from './schemas/schema.js'
import Store from './mongooseModels/storeModel.js'
import Customer from './mongooseModels/customerModel.js'

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET

export const server = new ApolloServer({
  schema: schema,
  context: async ({ req }) => {
    try {
      const authorization = req ? req.headers.authorization : null
      if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(authorization.substring(7), JWT_SECRET)

        if (decodedToken.type === 'store') {
          const currentStore = await Store.findById(decodedToken.id)
          return { currentStore }
        }
        if (decodedToken.type === 'customer') {
          const currentCustomer = await Customer.findById(decodedToken.id)
          return { currentCustomer }
        }
      }
    } catch (error) {
      console.log('an error occurred: ', error)
    }
  }
})