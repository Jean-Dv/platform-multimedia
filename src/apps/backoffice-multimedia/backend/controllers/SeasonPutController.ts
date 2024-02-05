import { type Response, type Request } from 'express'
import { type Controller } from './Controller'
import { type CommandBus } from '@Shared/domain/CommandBus'
import { CreateBackofficeMultimediaSeasonCommand } from '@BackofficeMultimedia/Seasons/application/Create/CreateBackofficeMultimediaSeasonCommand'
import httpStatus from 'http-status'
import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'
import { NotFound } from '@Shared/domain/NotFound'

type SeasonPutRequest = Request & {
  body: {
    id?: string
    title: string
    releaseYear: string
    serie: {
      id: string
    }
  }
}

export class SeasonPutController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  public async run(req: SeasonPutRequest, res: Response): Promise<void> {
    try {
      const { id, title, releaseYear, serie } = req.body
      const createSeasonCommand = new CreateBackofficeMultimediaSeasonCommand({
        id,
        title,
        releaseYear,
        serie: serie.id
      })
      await this.commandBus.dispatch(createSeasonCommand)
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
