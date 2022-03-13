import dotenv from 'dotenv'
dotenv.config()

export const MONGO_URI = (process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGO_URI
  : process.env.PROD_MONGO_URI
)

export const PORT = (process.env.NODE_ENV === 'test'
  ? process.env.TEST_PORT
  : process.env.PROD_PORT
)