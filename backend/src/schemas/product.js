import { gql } from 'apollo-server'
import { UserInputError, AuthenticationError } from 'apollo-server'
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
    allProducts: [Product]
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
        if (context.currentStore) {
          //const hue = Store.findById(context.currentStore.id).populate('products')
          //console.log(hue)
          //const storeWithProducts = await Store.findById(context.currentStore._id).populate('products')
          //const allProducts = storeWithProducts.products
          //console.log('jvilkdsjvdskljkvdsljvdlskjlvds', allProducts)

          return await Product.find({ productStore: context.currentStore.id })
        }
        else {
          return await Product.find({}).populate('productStore')
        }
      } catch (error) {
        //todo
        console.log('an error occurred while fetching products: ', error)
      }
    },
    singleProduct: async (root, args, context) => {
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
        // todo validate store
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