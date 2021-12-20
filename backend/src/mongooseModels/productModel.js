import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({

  productName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  productPrice: {
    type: Number,
    required: true
  },

  productStock: {
    type: Number,
    required: true
  },

  productCategory: {
    type: String,
    lowercase: true,
    trim: true
  },

  productStore: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  }
})

export default mongoose.model('Product', productSchema)