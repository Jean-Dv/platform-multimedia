import { type NextFunction, type Request, type Response } from 'express'
import { type Middleware } from './Middleware'
import authConfig from '@Auth/Shared/infrastructure/config'
import jwt from 'jsonwebtoken'
import httpStatus from 'http-status'
import { type QueryBus } from '@Shared/domain/QueryBus'
import { SearchMultimediaUserByIdQuery } from '@Multimedia/Users/application/SearchById/SearchMultimediaUserByIdQuery'
import { type MultimediaUserResponse } from '@Multimedia/Users/application/MultimediaUserResponse'
import { SearchMultimediaRoleByIdQuery } from '@Multimedia/Roles/application/SearchById/SearchMultimediaRoleByIdQuery'
import { type MultimediaRoleResponse } from '@Multimedia/Roles/application/MultimediaRoleResponse'

export class AuthenticateMiddleware implements Middleware {
  constructor(private readonly queryBus: QueryBus) {}

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
      const { userId, roleId } = jwt.verify(
        token,
        authConfig.get('auth.secret')
      ) as {
        userId: string
        roleId: string
      }
      if (userId === undefined || roleId === undefined) {
        res.status(httpStatus.UNAUTHORIZED).json({
          ok: false,
          data: {
            message: 'Invalid token'
          }
        })
        return
      }
      const userExists = await this.userExists(userId)
      const roleExists = await this.roleExists(roleId)
      if (!userExists || !roleExists) {
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

  private async userExists(userId: string): Promise<boolean> {
    const query = new SearchMultimediaUserByIdQuery(userId)
    const { id } = await this.queryBus.ask<MultimediaUserResponse>(query)
    return id !== undefined
  }

  private async roleExists(roleId: string): Promise<boolean> {
    const query = new SearchMultimediaRoleByIdQuery(roleId)
    const { role } = await this.queryBus.ask<MultimediaRoleResponse>(query)
    if (role === undefined) {
      return false
    }
    return true
  }
}
