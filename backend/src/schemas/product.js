import { gql } from 'apollo-server'
import { UserInputError, AuthenticationError } from 'apollo-server'
import Store from '../mongooseModels/storeModel.js'
import Product from '../mongooseModels/productModel.js'

export const typeDefs = gql`
  type Product {
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
  }
`

export const resolvers = {
  Query: {
    allProducts: async (root, args) => {
      try {
        if (args.store) {
          const store = await Store.findOne({ name: args.store })
          return await Product.find({ productStore: store.id }).populate('productStore')
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
      console.log(args.productID)
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

        const addingStore = await Store.findOne({ id: context.currentStore.id })
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
      console.log('update')
      try {
        console.log('update')
        // todo validate store
        /*
        let product = await Product.findOne({ _id: args.productID })

        

        await product.save()
*/

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
    }
  }
}