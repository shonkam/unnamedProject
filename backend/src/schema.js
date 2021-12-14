import pkg from 'lodash';
const { merge } = pkg;
import { makeExecutableSchema } from '@graphql-tools/schema'

import {
  typeDefs as UserTypeDefs,
  resolvers as userResolvers,
} from './user.js'


//extra resolvers
const additionalResolvers = {}

export const schema = makeExecutableSchema({
  typeDefs: [UserTypeDefs],
  resolvers: merge(additionalResolvers, userResolvers),
})