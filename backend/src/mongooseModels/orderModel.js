import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({

  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  products: {
    type: Array,
    ref: 'Product',
    required: true
  },
  date: {
    type: String,
    required: true
  },
  orderSum: {
    type: String,
    required: true
  }
})

export default mongoose.model('Order', orderSchema)