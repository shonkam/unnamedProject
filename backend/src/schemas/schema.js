import pkg from 'lodash'
const { merge } = pkg
import { makeExecutableSchema } from '@graphql-tools/schema'

import {
  typeDefs as CustomerTypeDefs,
  resolvers as customerResolvers,
} from './customer.js'

import {
  typeDefs as StoreTypeDefs,
  resolvers as storeResolvers,
} from './store.js'

import {
  typeDefs as ProductTypeDefs,
  resolvers as productResolvers,
} from './product.js'

import {
  typeDefs as OrderTypeDefs,
  resolvers as orderResolvers,
} from './order.js'

export const schema = makeExecutableSchema({
  typeDefs: [CustomerTypeDefs, StoreTypeDefs, ProductTypeDefs, OrderTypeDefs],
  resolvers: merge(customerResolvers, storeResolvers, productResolvers, orderResolvers),
})