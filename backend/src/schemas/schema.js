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

export const schema = makeExecutableSchema({
  typeDefs: [CustomerTypeDefs, StoreTypeDefs],
  resolvers: merge(customerResolvers, storeResolvers),
})