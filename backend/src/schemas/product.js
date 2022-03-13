import { gql } from 'apollo-server'
import { AuthenticationError } from 'apollo-server'
import Store from '../mongooseModels/storeModel.js'
import Product from '../mongooseModels/productModel.js'

export const typeDefs = gql`
  type Product {
    _id: ID!
    productName: String!
    productPrice: String!
    productStock: Int!
    productPictureURL: String!
    productDescription: String!
    productStore: Store!
  }

  type RequestSuccessful {
    successful: Boolean!
  }

  type Query {
    allProducts(storeID: ID): [Product]
    singleProduct(productID: ID!): Product
  }

  type Mutation {
    addProduct(
      productName: String!
      productPrice: String!
      productStock: Int!
      productPictureURL: String!
      productDescription: String!
    ): RequestSuccessful

    updateProduct(
      productID: ID!
      productName: String!
      productPrice: String!
      productStock: Int!
      productPictureURL: String!
      productDescription: String!
    ): RequestSuccessful

    deleteProduct(
      productID: ID!
    ): RequestSuccessful
  }
`

export const resolvers = {
  Query: {
    allProducts: async (root, args, context) => {
      try {
        // for store's own products
        if (context.currentStore) {
          return await Product.find({ productStore: context.currentStore.id })
        }
        // for viewing all the products of a single store
        else if (args.storeID) {
          // todo error handling for not valid store id
          return await Product.find({ productStore: args.storeID })
        }
        // all products
        else {
          return await Product.find({}).populate('productStore')
        }
      } catch (error) {
        //todo
        console.log('an error occurred while fetching products: ', error)
      }
    },
    singleProduct: async (root, args) => {
      try {
        return await Product.findOne({ _id: args.productID })
      } catch (error) {
        //todo
        console.log('an error occurred while fetching a single product: ', error)
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
          productDescription: args.productDescription,
          productPictureURL: args.productPictureURL,
          productStore: context.currentStore.id
        })
        const savedProduct = await newProduct.save()

        const addingStore = await Store.findOne({ _id: context.currentStore.id })
        addingStore.products = addingStore.products.concat(savedProduct)
        await addingStore.save()

        return { successful: true }
      }
      catch (error) {
        console.log('an error occurred while adding a new product: ', error)
        return { successful: false }
      }
    },
    updateProduct: async (root, args, context) => {
      try {
        if (!context.currentStore) {
          throw new AuthenticationError('not authorized')
        }

        const updatedProduct = await Product.findOne({
          _id: args.productID
        })
        const storeID = context.currentStore._id.toString()
        const productID = updatedProduct.productStore.toString()

        if (storeID !== productID) {
          throw new AuthenticationError('not authorized')
        }

        await Product.findOneAndUpdate(
          { '_id': args.productID },
          {
            'productName': `${args.productName}`,
            'productPrice': `${args.productPrice}`,
            'productStock': args.productStock,
            'productDescription': `${args.productDescription}`,
            'productPictureURL': `${args.productPictureURL}`
          })
        return { successful: true }
      } catch (error) {
        console.log('an error occurred while adding a new product: ', error)
        return { successful: false }
      }
    },
    deleteProduct: async (root, args, context) => {
      try {
        if (!context.currentStore) {
          throw new AuthenticationError('not authorized')
        }
        const product = await Product.findById(args.productID)
        const reqStoreID = context.currentStore._id.toString()
        const productStoreID = product.productStore._id.toString()

        if (reqStoreID !== productStoreID) {
          throw new AuthenticationError('not authorized')
        } else {
          await Product.findByIdAndDelete(args.productID)
          return { successful: true }
        }
      } catch (error) {
        console.log('an error occurred while deleting a product: ', error)
        return { successful: false }
      }
    }
  }
}