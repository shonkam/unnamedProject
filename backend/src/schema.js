import pkg from 'lodash';
const { merge } = pkg;
import { makeExecutableSchema } from '@graphql-tools/schema'

import {
  typeDefs as UserTypeDefs,
  resolvers as userResolvers,
} from './user.js'

//extra queries
const Query = `
  type Query {
    _empty: String
  }
`
//extra resolvers
const additionalResolvers = {}

export const schema = makeExecutableSchema({
  typeDefs: [Query, UserTypeDefs],
  resolvers: merge(additionalResolvers, userResolvers),
})