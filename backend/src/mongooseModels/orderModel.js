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
  items: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ['Product'],
    required: true
  },
  date: {
    //todo
    date: new Date()
  },
  orderSum: {
    type: Number,
    required: true
  }
})

export default mongoose.model('Order', orderSchema)