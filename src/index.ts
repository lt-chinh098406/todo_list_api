import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { Request, Response } from 'express'
dotenv.config()

import logger from '@/utils/logger'
import connectDatabase from '@/configs/db.config'

const port = process.env.PORT || 3001
const app = express()

app.use(helmet())
app.use(morgan('tiny'))

// parse application/json
app.use(bodyParser.json())

app.use('/api', require('./routes').default)

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Todo List API by ChinhLT',
  })
})

app.get('*', (req: Request, res: Response) => {
  res.json({
    message: 'Todo List API by ChinhLT',
  })
})

// db
connectDatabase()

app.listen(port, () => {
  logger.info(`App available at http://localhost:${port}`)
})
