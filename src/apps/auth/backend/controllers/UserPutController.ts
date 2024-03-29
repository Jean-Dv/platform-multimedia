import bcrypt from 'bcrypt'
import { CreateUserCommand } from '@Auth/User/domain/CreateUserCommand'
import { type CommandBus } from '@Shared/domain/CommandBus'
import { type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { type Controller } from './Controller'
import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'

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
      const { id, firstName, lastName, email, password } = req.body
      const encryptedPassword = this.encryptPassword(password)
      const createUserCommand = new CreateUserCommand({
        id,
        firstName,
        lastName,
        email,
        password: encryptedPassword
      })
      await this.commandBus.dispatch(createUserCommand)
      res.status(httpStatus.CREATED).json({
        ok: true
      })
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        console.log(error)
        res.status(httpStatus.BAD_REQUEST).json({
          ok: false,
          message: error.message
        })
        return
      }
      console.log(error)
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false
      })
    }
  }

  /**
   * Encrypt password
   *
   * @param password - The password to be encrypted.
   * @returns The encrypted password.
   */
  private encryptPassword(password: string): string {
    return bcrypt.hashSync(password, 8)
  }
}
