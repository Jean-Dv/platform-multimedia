import { type Response, type Request } from 'express'
import { type Controller } from './Controller'
import { type CommandBus } from '@Shared/domain/CommandBus'
import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'
import httpStatus from 'http-status'
import { NotFound } from '@Shared/domain/NotFound'
import { CreateBackofficeMultimediaCategoryCommand } from '@BackofficeMultimedia/Categories/application/Create/CreateBackofficeMultimediaCategoryCommand'

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
      const createCategoryCommand =
        new CreateBackofficeMultimediaCategoryCommand({
          id,
          name
        })
      await this.commandBus.dispatch(createCategoryCommand)
      res.status(httpStatus.CREATED).json({
        ok: true
      })
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        res.status(httpStatus.BAD_REQUEST).json({
          ok: false,
          error: error.message
        })
        return
      }
      if (error instanceof NotFound) {
        res.status(httpStatus.NOT_FOUND).json({
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
