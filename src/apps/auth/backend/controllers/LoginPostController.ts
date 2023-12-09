import { type CommandBus } from '@Shared/domain/CommandBus'
import { type Controller } from './Controller'
import { type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { AuthenticateUserCommand } from '@Auth/UserAuth/domain/AuthenticateUserCommand'
import { InvalidAuthEmail } from '@Auth/UserAuth/domain/InvalidAuthEmail'
import jwt from 'jsonwebtoken'
import authConfig from '@Auth/Shared/infrastructure/config'

type LoginPostRequest = Request & {
  body: {
    email: string
    password: string
  }
}

/**
 * Represents a controller for handling login requests.
 */
export class LoginPostController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  /**
   * Handles a login request, dispatches the authentication command, and adds a token to the response.
   *
   * @param req - The login post request containing email and password.
   * @param res - The response object to send back to the client.
   * @returns A promise that resolves once the operation is complete.
   */
  public async run(req: LoginPostRequest, res: Response): Promise<void> {
    try {
      const { email, password } = req.body
      const loginCommand = new AuthenticateUserCommand({ email, password })
      await this.commandBus.dispatch(loginCommand)

      await this.addTokenToResponse(email, res)
    } catch (error) {
      console.log(error)
      if (error instanceof InvalidAuthEmail) {
        res
          .status(httpStatus.BAD_REQUEST)
          .json({ ok: false, error: error.message })
        return
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ ok: false })
    }
  }

  /**
   * Adds a token to the response for successful authentication.
   *
   * @param email - The user's email for token generation.
   * @param res - The response object to send back to the client.
   * @returns A promise that resolves once the token is added to the response.
   */
  private async addTokenToResponse(
    email: string,
    res: Response
  ): Promise<void> {
    const token = jwt.sign({ email }, authConfig.get('auth.secret'), {
      expiresIn: authConfig.get('auth.expiresIn')
    })
    res.status(httpStatus.OK).json({
      ok: true,
      data: {
        refreshToken: token
      }
    })
  }
}
