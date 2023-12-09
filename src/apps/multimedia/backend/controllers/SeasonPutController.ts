import { type Request, type Response } from 'express'
import { type Controller } from './Controller'
import { type CommandBus } from '@Shared/domain/CommandBus'
import { CreateSeasonCommand } from '@Multimedia/Season/application/Create/CreateSeasonCommand'
import httpStatus from 'http-status'
import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'
import { NotFound } from '@Shared/domain/NotFound'

type SeasonPutRequest = Request & {
  body: {
    id: string
    serieId: string
    title: string
    releaseDate: Date
  }
}

export class SeasonPutController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  public async run(req: SeasonPutRequest, res: Response): Promise<void> {
    try {
      const { id, serieId, title, releaseDate } = req.body
      const releaseDateParse = new Date(releaseDate)
      const createSeasonCommand = new CreateSeasonCommand({
        id,
        serieId,
        title,
        releaseDate: releaseDateParse
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
