import { CreateUserCommand } from '@Auth/User/domain/CreateUserCommand'
import { type CommandBus } from '@Shared/domain/CommandBus'
import { type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { type Controller } from './Controller'

type UserPutRequest = Request & {
  body: {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    repeatPassword: string
  }
}

/**
 * Controller for handling PUT requests related to user updates.
 */
export class UserPutController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  /**
   * Executes the logic for handling a PUT request to update user information.
   * Validates the request body and dispatches a CreateUserCommand.
   * Responds with a success message or an error message if an exception occurs.
   *
   * @param req - The Express request object containing the user update information.
   * @param res - The Express response object.
   */
  public async run(req: UserPutRequest, res: Response): Promise<void> {
    try {
      const { id, firstName, lastName, email, password, repeatPassword } =
        req.body
      const createUserCommand = new CreateUserCommand({
        id,
        firstName,
        lastName,
        email,
        password,
        repeatPassword
      })
      await this.commandBus.dispatch(createUserCommand)
      res.status(httpStatus.CREATED).json({
        ok: true
      })
    } catch (error) {
      console.log(error)
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false
      })
    }
  }
}
