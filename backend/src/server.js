import { ApolloServer } from 'apollo-server'
//import cors from 'cors'
import { schema } from './schemas/schema.js'

export const server = new ApolloServer({
  schema: schema,
  cors: true
})