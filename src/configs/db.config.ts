import mongoose, { ConnectOptions } from 'mongoose'
import logger from '@/utils/logger'

const connectDatabase = async () => {
  const mongoDbUrl: string = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.gfb59qx.mongodb.net/?retryWrites=true&w=majority`

  logger.info(`Connecting to ${mongoDbUrl}`)
  try {
    await mongoose.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    } as ConnectOptions)

    logger.info('Successfully connected to the database')
  } catch (err) {
    logger.error(`Could not connect to the database. Exiting now...\n${err}`)
    process.exit()
  }
}

export default connectDatabase
