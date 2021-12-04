import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import http from 'http'
import cors from 'cors'

import { schema } from "./src/schema.js"

async function startApolloServer(schema) {
  const app = express()
  const httpServer = http.createServer(app)
  //todo confirm cors
  app.use(cors())
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()
  server.applyMiddleware({ app })
  await new Promise(resolve => httpServer.listen({ port: 3030 }, resolve))
  console.log(`🚀 Server ready at http://localhost:3030${server.graphqlPath}`)
}

startApolloServer(schema)