import { gql } from 'apollo-server'
import { AuthenticationError } from 'apollo-server'
import Order from '../mongooseModels/orderModel.js'

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
    allOrders: [Order]
    singleOrder(orderID: ID!): Order
  }

  type Mutation {
    createOrder(
      store: ID!
      products: [ID!]!
      orderSum: String!
    ): RequestSuccessful
  }
`

export const resolvers = {
  Query: {
    allOrders: async (root, args) => {
      return Order.find({}).populate(['customer', 'store', 'products'])
    },
    singleOrder: async (root, args) => {
      return Order.findOne({ _id: args.orderID }).populate(['customer', 'store', 'products'])
    }
  },

  Mutation: {
    createOrder: async (root, args, context) => {
      try {
        if (!context.currentCustomer) {
          throw new AuthenticationError('not logged in')
        }
        const user = context.currentCustomer._id
        const orderDate = new Date()
        const newOrder = new Order({
          customer: user,
          store: args.store,
          products: args.products,
          orderSum: args.orderSum,
          date: orderDate
        })
        await newOrder.save()
        return { successful: true }
      } catch (e) {
        console.log('error', e)
        return { successful: false }
      }
    }
  }
}