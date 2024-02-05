import { type Response, type Request } from 'express'
import { type Controller } from './Controller'
import { type CommandBus } from '@Shared/domain/CommandBus'
import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'
import httpStatus from 'http-status'
import { NotFound } from '@Shared/domain/NotFound'
import { CreateBackofficeMultimediaSerieCommand } from '@BackofficeMultimedia/Series/application/Create/CreateBackofficeMultimediaSerieCommand'

type SeriePutRequest = Request & {
  body: {
    id: string
    title: string
    releaseYear: string
    synopsis: string
    categories: Array<{
      id: string
    }>
  }
}

export class SeriePutController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  public async run(req: SeriePutRequest, res: Response): Promise<void> {
    try {
      const { id, title, releaseYear, synopsis, categories } = req.body
      const createSerieCommand = new CreateBackofficeMultimediaSerieCommand({
        id,
        title,
        releaseYear,
        synopsis,
        categories
      })
      await this.commandBus.dispatch(createSerieCommand)
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
