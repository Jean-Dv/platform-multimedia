import { type CommandBus } from '@Shared/domain/CommandBus'
import { type Controller } from './Controller'
import { type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { AuthenticateUserCommand } from '@Auth/UserAuth/domain/AuthenticateUserCommand'
import { InvalidAuthEmail } from '@Auth/UserAuth/domain/InvalidAuthEmail'

type LoginPostRequest = Request & {
  body: {
    email: string
    password: string
  }
}
export class LoginPostController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  public async run(req: LoginPostRequest, res: Response): Promise<void> {
    try {
      const { email, password } = req.body
      const loginCommand = new AuthenticateUserCommand({ email, password })
      await this.commandBus.dispatch(loginCommand)
      res.status(httpStatus.OK).json({ ok: true })
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
}
