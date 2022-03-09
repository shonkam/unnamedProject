import { gql } from 'apollo-server'
import { UserInputError, AuthenticationError } from 'apollo-server'
import Store from '../mongooseModels/storeModel.js'
import Product from '../mongooseModels/productModel.js'
import Order from '../mongooseModels/orderModel.js'
import Customer from '../mongooseModels/customerModel.js'

export const typeDefs = gql`
  type Order {
    _id: ID!
    customer: Customer!
    store: Store!
    products: [Product]!
    date: String!
    orderSum: String!
  }

  type RequestSuccessful {
    successful: Boolean!
  }

  type Query {
    allOrders(orderID: ID): [Order]
    singleOrder(orderID: ID!): Order
  }

  type Mutation {
    createOrder(
      customer: ID!
      store: ID!
      products: [ID!]!
      orderSum: String!
    ): RequestSuccessful
  }
`

export const resolvers = {
  Query: {
    allOrders: async (root, args) => {
      return true
    },
    singleOrder: async (root, args) => {
      return true
    }
  },

  Mutation: {
    createOrder: async (root, args) => {
      try {
        const orderDate = new Date()
        const newOrder = new Order({
          customer: args.customer,
          store: args.store,
          products: args.products,
          orderSum: args.orderSum,
          date: orderDate
        })
        await newOrder.save()
        return true
      } catch (e) {
        console.log('error', e)
      }
    }
  }
}