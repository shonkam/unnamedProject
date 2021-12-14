import pkg from 'lodash';
const { merge } = pkg;
import { makeExecutableSchema } from '@graphql-tools/schema'

import {
  typeDefs as UserTypeDefs,
  resolvers as userResolvers,
} from './user.js'

import {
  typeDefs as StoreTypeDefs,
  resolvers as storeResolvers,
} from './store.js'

export const schema = makeExecutableSchema({
  typeDefs: [UserTypeDefs, StoreTypeDefs],
  resolvers: merge(userResolvers, storeResolvers),
})