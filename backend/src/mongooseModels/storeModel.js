import mongoose from 'mongoose'

const storeSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    unique: true
  },

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

  location: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'Location',
    required: true
  },

  categories: {
    type: mongoose.Schema.Types.Mixed,
    type: ['Category']
  }

  /*
  // todo
  products: {
    type: mongoose.Schema.Types.Mixed,
    type: ['Product']
  }
  */
  // email validation won't be done here
  // again as it already done both in
  // the client and during the mutation

})

export default mongoose.model('Store', storeSchema)