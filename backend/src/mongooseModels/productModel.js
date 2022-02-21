import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({

  productName: {
    type: String,
    required: true,
    trim: true
  },

  productPrice: {
    type: String,
    required: true
  },

  productStock: {
    type: Number,
    required: true
  },

  productPictureURL: {
    type: String,
    trim: true,
    required: true
  },

  productDescription: {
    type: String,
    trim: true,
    required: true
  },

  productStore: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  }
})

export default mongoose.model('Product', productSchema)