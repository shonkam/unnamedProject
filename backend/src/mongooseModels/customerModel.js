import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema({
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
  orders: {
    type: ['Order']
  }
})

export default mongoose.model('Customer', customerSchema)