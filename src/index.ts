import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import * as dotenv from 'dotenv'
import ApiServer from './ApiServer'
//------------------------------------------------------------------
dotenv.config()

//------------------------------------------------------------------
/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1)
}
const PORT: number = parseInt(process.env.PORT as string, 10)

//------------------------------------------------------------------
const app = express()

//------------------------------------------------------------------
/**
 *  App Configuration
 */
app.use(helmet())
app.use(morgan('combined'))

//------------------------------------------------------------------
/**
 * Server Activation
 */
const apiServer: ApiServer = new ApiServer()
apiServer.start(PORT)
