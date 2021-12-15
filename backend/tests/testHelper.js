import connectToMongoDB from '../src/connectToMongoDB.js'

export const testHelper = () => {
  beforeAll(async () => {
    await connectToMongoDB()
  })
  afterAll(async () => {
    const close = true
    await connectToMongoDB(close)
  })
}