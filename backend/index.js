import dotenv from 'dotenv'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import http from 'http'
import cors from 'cors'
import mongoose from 'mongoose'
import { schema } from "./src/schema.js"

dotenv.config()

function connectMongoDB() {
  try {
    mongoose.connect(process.env.MONGO_URI)
    console.log('connected successfully to MongoDB')
  } catch (error) {
    console.log('error while connecting to MongoDB:', error.message)
  }
}

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

connectMongoDB()
startApolloServer(schema)