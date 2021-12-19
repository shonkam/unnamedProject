import { server } from './src/server.js'
import { PORT } from './src/utils/config.js'
import connectToMongoDB from './src/connectToMongoDB.js'

await connectToMongoDB()

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}graphql`)
})