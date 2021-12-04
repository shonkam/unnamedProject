import pkg from 'lodash';
const { merge } = pkg;
import { makeExecutableSchema } from '@graphql-tools/schema'

import {
  typeDef as User,
  resolvers as userResolvers,
} from './user.js'

//extra queries
const Query = `
  type Query {
    _empty: String
  }
`

const additionalResolvers = {}

export const schema = makeExecutableSchema({
  typeDefs: [Query, User],
  resolvers: merge(additionalResolvers, userResolvers),
})