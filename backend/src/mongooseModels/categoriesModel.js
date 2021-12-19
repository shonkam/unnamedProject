import mongoose from 'mongoose'

export const categorySchema = new mongoose.Schema({
  genre: {
    type: String,
    trim: true,
    lovercase: true
  }
})

export default mongoose.model('Category', categorySchema)