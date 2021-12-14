import { gql } from 'apollo-server-express'
import { UserInputError } from 'apollo-server-express'
import Store from './models/storeModel.js'

export const typeDefs = gql`

  type Location {
    address: String!
    city: String!
    postalNumber: String!
    country: String!
  }

  type Store {
      name: String!
      location: Location!
      categories: [String!]
    }

  type Message {
    message: String!
  }
  
  type Query {
    allStores(name: String): [Store]
  }

  type Mutation {
    addStore(
      name: String!   
      address: String!
      city: String!
      postalNumber: String!
      country: String!  
      categories: [String!]
    ): Store

    deleteStore(
      name: String!
    ): Message

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
        const newStore = new Store({
          name: args.name,
          location: {
            address: args.address,
            city: args.city,
            postalNumber: args.postalNumber,
            country: args.country
          },
          categories: [args.categories]
        })

        return await newStore.save()
      } catch (error) {
        console.log('error occurred while adding a store: ', error)
      }
    },
    deleteStore: async (root, args) => {
      try {
        const store = await Store.findOne({ name: args.name })
        await Store.findByIdAndDelete(store.id)

        return { message: `Store ${args.name} was successfully deleted` }
      } catch (error) {
        console.log('an error occurred while deleting store', error)
      }
    }
  }
}