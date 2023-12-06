import { type NextFunction, type Request, type Response } from 'express'
import { type Middleware } from './Middleware'
import authConfig from '@Auth/Shared/infrastructure/config'
import jwt from 'jsonwebtoken'
import httpStatus from 'http-status'

export class AuthenticateMiddleware implements Middleware {
  public async run(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.authorization?.split(' ')[1]
      if (token === undefined) {
        res.status(httpStatus.UNAUTHORIZED).json({
          ok: false,
          data: {
            message: 'No token provided'
          }
        })
        return
      }
      const { userId } = jwt.verify(token, authConfig.get('auth.secret')) as {
        userId: string
      }
      if (userId === undefined) {
        res.status(httpStatus.UNAUTHORIZED).json({
          ok: false,
          data: {
            message: 'Invalid token'
          }
        })
        return
      }
      next()
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(httpStatus.UNAUTHORIZED).json({
          ok: false,
          error: 'Token expired'
        })
        return
      }
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(httpStatus.UNAUTHORIZED).json({
          ok: false,
          error: 'Invalid token'
        })
        return
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false
      })
    }
  }
}
