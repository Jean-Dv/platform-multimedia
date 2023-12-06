import { type QueryBus } from '@Shared/domain/QueryBus'
import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { type Controller } from './Controller'
import authConfig from '@Auth/Shared/infrastructure/config'
import { SearchUserByEmailQuery } from '@Auth/User/application/SearchByEmail/SearchUserByEmailQuery'
import httpStatus from 'http-status'
import { UserNotFound } from '@Auth/User/domain/UserNotFound'

/**
 * Controller for handling GET requests related to access tokens.
 */
export class AccessTokenGetController implements Controller {
  constructor(private readonly queryBus: QueryBus) {}

  public async run(req: Request, res: Response): Promise<void> {
    try {
      const { query: queryParams } = req
      const { refreshToken } = queryParams
      const userEmail = this.getUserEmailFromRefreshToken(
        refreshToken as string
      )
      const query = new SearchUserByEmailQuery(userEmail)
      const userId = await this.queryBus.ask(query)
      const accessToken = jwt.sign({ userId }, authConfig.get('auth.secret'), {
        expiresIn: 15 * 60 * 1000
      })
      res.status(httpStatus.OK).json({
        ok: true,
        data: {
          refreshToken,
          accessToken
        }
      })
    } catch (error) {
      console.log(error)
      if (error instanceof jwt.TokenExpiredError) {
        res.status(httpStatus.UNAUTHORIZED).json({
          ok: false,
          error: 'Token expired'
        })
        return
      }
      if (
        error instanceof jwt.JsonWebTokenError ||
        error instanceof UserNotFound
      ) {
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

  /**
   * Obtains the user email from a refresh token.
   *
   * @param refreshToken - The refresh token to be validated.
   * @returns The user email.
   */
  private getUserEmailFromRefreshToken(refreshToken: string): string {
    const payload = jwt.verify(refreshToken, authConfig.get('auth.secret')) as {
      email: string
    }
    return payload.email
  }
}
