import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv'
import { Request, Response } from 'express'
dotenv.config()

import logger from '@/utils/logger'
// import connectDatabase from '@/configs/db.config'

// connectDatabase()

const port = process.env.PORT || 3001
// const isProd = process.env.NODE_ENV === 'prod'
const app = express()

app.use(helmet())
app.use(morgan('tiny'))
// app.use(cors)
app.use(express.json())

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

app.listen(port, () => {
  logger.info(`App available at http://localhost:${port}`)
})
