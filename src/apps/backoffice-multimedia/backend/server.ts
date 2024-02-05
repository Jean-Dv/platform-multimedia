import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import errorHandler from 'errorhandler'
import express, {
  Router,
  type Application,
  type NextFunction,
  type Request,
  type Response
} from 'express'
import helmet from 'helmet'
import type * as http from 'http'
import httpStatus from 'http-status'
import { registerRoutes } from './routes'

/**
 * Represents a server instance using Express.js.
 */
export class Server {
  private readonly express: Application
  private readonly port: string
  private httpServer?: http.Server

  constructor(port: string) {
    this.port = port
    this.express = express()
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: true }))
    this.express.use(helmet.xssFilter())
    this.express.use(helmet.noSniff())
    this.express.use(helmet.hidePoweredBy())
    this.express.use(helmet.frameguard({ action: 'deny' }))
    this.express.use(cors())
    this.express.use(compression())
    const router = Router()
    router.use(errorHandler())
    this.express.use(router)
    registerRoutes(router)
    router.use(
      (err: Error, _req: Request, res: Response, _next: NextFunction) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
      }
    )
  }

  /**
   * Gets the HTTP server instance.
   *
   * @returns The HTTP server instance.
   */
  public getHttpServer(): http.Server | undefined {
    return this.httpServer
  }

  /**
   * Starts the server and listens on the specified port.
   */
  public async listen(): Promise<void> {
    await new Promise<void>((resolve) => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(
          `Backoffice Multimedia Backend App is running at http://localhost:${
            this.port
          } in ${this.express.get('env') as string} mode`
        )
        console.log('Press CTRL-C to stop\n')
        resolve()
      })
    })
  }

  /**
   * Stops the server.
   */
  public async stop(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      if (this.httpServer != null) {
        this.httpServer.close((error) => {
          if (error != null) {
            reject(error)
            return
          }
          resolve()
        })
      }
      resolve()
    })
  }
}
