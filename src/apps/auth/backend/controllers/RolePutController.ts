import { type Response, type Request } from 'express'
import { type Controller } from './Controller'
import { CreateRoleCommand } from '@Auth/Roles/application/Create/CreateRoleCommand'
import { type CommandBus } from '@Shared/domain/CommandBus'
import httpStatus from 'http-status'
import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'

type RolePutRequest = Request & {
  body: {
    id: string
    name: string
  }
}

export class RolePutController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  public async run(req: RolePutRequest, res: Response): Promise<void> {
    try {
      const { id, name } = req.body
      const createRoleCommand = new CreateRoleCommand({
        id,
        name
      })
      await this.commandBus.dispatch(createRoleCommand)
      res.status(httpStatus.CREATED).json({
        ok: true
      })
    } catch (error) {
      console.log(error)
      if (error instanceof InvalidArgumentError) {
        res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
          ok: false,
          error: error.message
        })
        return
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false
      })
    }
  }
}
