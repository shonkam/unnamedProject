import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  postalNumber: {
    type: Number,
    required: true
  },
  country: {
    type: String,
    required: true
  }
})

export default mongoose.model('Location', locationSchema)