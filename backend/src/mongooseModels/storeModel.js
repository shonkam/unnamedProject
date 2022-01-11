import mongoose from 'mongoose'
import { locationSchema } from './locationModel.js'
const storeSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  // email validation won't be done here
  // again as it already done both in
  // the client and during the mutation
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  // password will be hashed 
  // during the mutation
  password: {
    type: String,
    required: true
  },

  location: locationSchema,

  products: {
    type: mongoose.Schema.Types.ObjectId,
    type: ['Product']
  }

})

export default mongoose.model('Store', storeSchema)