import mongoose from 'mongoose'
import { MONGO_URI } from './utils/config.js'

function connectToMongoDB(close) {
  //todo
  if (close) {
    try {
      console.log('closing connection')
      mongoose.connection.close()
    } catch (error) {
      console.log('an error occurred while closing the MongoDB connection: ', error)
    }
  }
  else {
    try {
      mongoose.connect(MONGO_URI)
      console.log('connected successfully to MongoDB')
    } catch (error) {
      console.log('error while connecting to MongoDB: ', error.message)
    }
  }
}

export default connectToMongoDB