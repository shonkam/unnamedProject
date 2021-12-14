import mongoose from 'mongoose'

const storeModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'Location',
    required: true
  },
  categories: {
    type: mongoose.Schema.Types.Array,
    required: true
  }
})

export default mongoose.model('Store', storeModel)