import { type CommandBus } from '@Shared/domain/CommandBus'
import { type Controller } from './Controller'
import { type Request, type Response } from 'express'
import { CreateCategoryCommand } from '@Multimedia/Categories/application/Create/CreateCategoryCommand'
import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'
import httpStatus from 'http-status'

type CategoryPutRequest = Request & {
  body: {
    id: string
    name: string
  }
}

export class CategoryPutController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  public async run(req: CategoryPutRequest, res: Response): Promise<void> {
    try {
      const { id, name } = req.body
      const createCategoryCommand = new CreateCategoryCommand({
        id,
        name
      })
      await this.commandBus.dispatch(createCategoryCommand)
      res.status(httpStatus.CREATED).json({
        ok: true
      })
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
          ok: false,
          error: error.message
        })
        return
      }
      console.log(error)
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false
      })
    }
  }
}
