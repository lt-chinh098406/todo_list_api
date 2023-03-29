import * as bodyParser from 'body-parser'
import * as controllers from './controllers'
import * as http from 'http'
import { Server } from '@overnightjs/core'
import * as model from './models/index'
import { errorHandler } from '@/middleware/error.middleware'
import { notFoundHandler } from '@/middleware/notFound.middleware'
import 'reflect-metadata'
import Container from 'typedi'
import mongoose from 'mongoose'
import logger from '@/utils/logger'
import dotenv from 'dotenv'
dotenv.config()

class ApiServer extends Server {
  private readonly SERVER_STARTED = 'Server started on port: '
  private appserver: http.Server

  constructor() {
    super(true)
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
  }

  private async initServer(): Promise<void> {
    // eslint-disable-next-line
    const arrEntities: any[] = []
    for (const name in model) {
      if (Object.prototype.hasOwnProperty.call(model, name)) {
        // eslint-disable-next-line
        const entity: any = (model as any)[name]
        arrEntities.push(entity)
      }
    }

    const mongoDbUrl: string = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@todo-list-collection.vxeaiuj.mongodb.net/?retryWrites=true&w=majority`

    try {
      await mongoose.connect(mongoDbUrl)

      logger.info('Successfully connected to the database')
    } catch (err) {
      logger.error(`Could not connect to the database. Exiting now...\n${err}`)
      process.exit()
    }
    this.setupControllers()

    this.app.use(errorHandler)
    this.app.use(notFoundHandler)
  }

  private setupControllers(): void {
    const ctlrInstances = []
    for (const name in controllers) {
      if (Object.prototype.hasOwnProperty.call(controllers, name)) {
        // eslint-disable-next-line
        const controller = Container.get((controllers as any)[name])
        ctlrInstances.push(controller)
      }
    }
    super.addControllers(ctlrInstances)
  }

  public async start(port: number): Promise<void> {
    try {
      await this.initServer()

      this.appserver = this.app.listen(port, () => {
        logger.info(null, this.SERVER_STARTED + `http://localhost:${port}`)
      })
    } catch (ex: any) {
      logger.info(null, 'SERVER_STARTED FAILED: ' + ex.message)
    }
  }

  public stop(): void {
    this.appserver.close()
  }
}

export default ApiServer
