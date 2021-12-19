import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({

  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store'
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    //todo
    // ref: 'Product'
  }],
  date: {
    //todo
    date: new Date()
  }
})

export default mongoose.model('Order', orderSchema)