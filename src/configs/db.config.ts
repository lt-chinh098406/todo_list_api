import mongoose from 'mongoose'
import logger from '@/utils/logger'

const connectDatabase = async () => {
  const mongoDbUrl: string = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@todo-list-collection.vxeaiuj.mongodb.net/?retryWrites=true&w=majority`

  try {
    await mongoose.connect(mongoDbUrl)

    logger.info('Successfully connected to the database')
  } catch (err) {
    logger.error(`Could not connect to the database. Exiting now...\n${err}`)
    process.exit()
  }
}

export default connectDatabase
