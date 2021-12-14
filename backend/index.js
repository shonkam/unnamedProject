import express from 'express'
import cors from 'cors'
import connectToMongoDB from './src/connectToMongoDB.js'
import http from 'http'
import { PORT } from './src/utils/config.js'
import { schema } from './src/schema.js'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'

async function startServer() {
  try {
    await connectToMongoDB()
    const app = express()
    const httpServer = http.createServer(app)
    const server = new ApolloServer({
      schema,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    })

    await server.start()
    //todo confirm cors
    app.use(cors())
    server.applyMiddleware({ app })
    await new Promise(resolve => httpServer.listen({ port: PORT }, resolve))
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  } catch (error) {
    console.log('error while starting Apollo Server: ', error)
  }
}

startServer()