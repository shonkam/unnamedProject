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
    productName: String!
    productPrice: Float!
    productStock: Int!
    productCategory: String
    productStore: Store!
  }

  type Message {
    message: String!
  }

  type Token {
    token: String!
  }

  type Query {
    allStores(name: String): [Store]
    allProducts(store: String, category: String): [Product]
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
    ): Store

    deleteStore: Message

    loginStore(
      email: String!
      password: String!
    ): Token

    addProduct(
      productName: String!
      productPrice: Float!
      productStock: Int!
      productCategory: String
    ): Product
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
    },

    allProducts: async (root, args) => {
      try {
        if (args.store && args.category) {

        }
        else if (args.store) {
          const store = await Store.findOne({ name: args.store })
          return await Product.find({ productStore: store.id }).populate('productStore')
        }
        else if (args.category) {
          return await Product.find({ productCategory: args.category }).populate('productStore')
        }
        else {
          return await Product.find({}).populate('productStore')
        }
      } catch (error) {
        //todo
        console.log('an error occurred while fetching products: ', error)
      }
    }
  },

  Mutation: {
    addProduct: async (root, args, context) => {
      if (!context.currentStore) {
        throw new AuthenticationError('not authorized')
      }
      try {

        const newProduct = new Product({
          productName: args.productName,
          productPrice: args.productPrice,
          productStock: args.productStock,
          productCategory: args.productCategory,
          productStore: context.currentStore.id
        })
        const savedProduct = await newProduct.save()

        const addingStore = await Store.findOne({ id: context.currentStore.id })
        addingStore.products = addingStore.products.concat(savedProduct)
        await addingStore.save()

        return savedProduct.populate('productStore')
      }
      catch (error) {
        console.log('an error occurred while adding a product: ', error)
      }
    },


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

        return await newStore.save()
      } catch (error) {
        console.log('error occurred while adding a store: ', error)
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