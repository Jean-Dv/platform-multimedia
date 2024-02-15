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
import authConfig from '@Auth/Shared/infrastructure/config'
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware'
import { container } from './dependency-injection'
import morgan from 'morgan'

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
    this.express.use(morgan('combined'))
    this.setupAuth()
    this.setupProxies()
    this.express.use(router)
    registerRoutes(router)
    router.use(
      (err: Error, _req: Request, res: Response, _next: NextFunction) => {
        console.log(err)
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
          `Mooc Backend App is running at http://localhost:${this.port} in ${
            this.express.get('env') as string
          } mode`
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

  /**
   * Sets up the proxies for the server.
   */
  private setupProxies(): void {
    authConfig.get('routes').forEach(
      (route: {
        url: string
        auth: {
          user: boolean
          admin: boolean
        }
        proxy: {
          target: string
          changeOrigin: boolean
          pathRewrite: Record<string, string>
        }
      }) => {
        const options = {
          ...route.proxy,
          onProxyReq: fixRequestBody
        }
        this.express.use(route.url, createProxyMiddleware(options))
      }
    )
  }

  private setupAuth(): void {
    authConfig.get('routes').forEach(
      (route: {
        url: string
        auth: {
          user: boolean
          admin: boolean
        }
        proxy: {
          target: string
          changeOrigin: boolean
          pathRewrite: Record<string, string>
        }
      }) => {
        if (route.auth.user) {
          const userMiddleware = container.get(
            'Apps.auth.middlewares.AuthUserMiddleware'
          )
          this.express.use(
            route.url,
            userMiddleware.run.bind(userMiddleware),
            function (_req, _res, next) {
              next()
            }
          )
        }
        if (route.auth.admin) {
          const adminMiddleware = container.get(
            'Apps.auth.middlewares.AuthAdminMiddleware'
          )
          this.express.use(
            route.url,
            adminMiddleware.run.bind(adminMiddleware),
            function (_req, _res, next) {
              next()
            }
          )
        }
        this.express.use(route.url, function (_req, _res, next) {
          next()
        })
      }
    )
  }
}
