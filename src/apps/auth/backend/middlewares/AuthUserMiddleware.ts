import { type QueryBus } from '@Shared/domain/QueryBus'
import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from 'http-status'
import jwt, { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken'
import { type Middleware } from './Middleware'
import authConfig from '@Auth/Shared/infrastructure/config'
import { NotFound } from '@Shared/domain/NotFound'
import { SearchUserByIdQuery } from '@Auth/User/application/SearchById/SearchUserByIdQuery'
import { type UserResponse } from '@Auth/User/application/UserResponse'
import { SearchRoleByIdQuery } from '@Auth/Roles/application/SearchById/SearchRoleByIdQuery'
import { type RoleResponse } from '@Auth/Roles/application/RoleResponse'

interface PayloadAutorization {
  userId: string
  roleId: string
}

export class AuthUserMiddleware implements Middleware {
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
      ) as PayloadAutorization
      if (userId === undefined || roleId === undefined) {
        res.status(httpStatus.UNAUTHORIZED).json({
          ok: false,
          data: {
            message: 'Invalid token'
          }
        })
        return
      }
      if (!(await this.validateRoleUser(userId, roleId))) {
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
      if (
        error instanceof TokenExpiredError ||
        error instanceof JsonWebTokenError ||
        error instanceof NotFound
      ) {
        res.status(httpStatus.UNAUTHORIZED).json({
          ok: false,
          error: 'Token expired'
        })
        return
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false,
        error: 'Internal server error'
      })
    }
  }

  private async validateRoleUser(
    userId: string,
    roleId: string
  ): Promise<boolean> {
    const queryUser = new SearchUserByIdQuery(userId)
    const { roleName } = await this.queryBus.ask<UserResponse>(queryUser)

    const queryRole = new SearchRoleByIdQuery(roleId)
    const { role } = await this.queryBus.ask<RoleResponse>(queryRole)

    return roleName === role.name && role.name === 'registered'
  }
}
