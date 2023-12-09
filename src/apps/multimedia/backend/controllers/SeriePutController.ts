import { CreateSerieCommand } from '@Multimedia/Serie/application/Create/CreateSerieCommand'
import { type CommandBus } from '@Shared/domain/CommandBus'
import { NotFound } from '@Shared/domain/NotFound'
import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'
import { type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { type Controller } from 'src/apps/auth/backend/controllers/Controller'

type SeriePutRequest = Request & {
  body: {
    id: string
    category: string
    title: string
    releaseDate: Date
  }
}

export class SeriePutController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  public async run(req: SeriePutRequest, res: Response): Promise<void> {
    try {
      const { id, category, title, releaseDate } = req.body
      const releaseDateParse = new Date(releaseDate)
      const createSerieCommand = new CreateSerieCommand({
        id,
        category,
        title,
        releaseDate: releaseDateParse
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
