import mongoose from 'mongoose'

export const locationSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  city: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  postalNumber: {
    type: Number,
    required: true
  },
  country: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  }
})

export default mongoose.model('Location', locationSchema)