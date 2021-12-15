import mongoose from 'mongoose'

const locationModel = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  postalNumber: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
})

export default mongoose.model('Location', locationModel)