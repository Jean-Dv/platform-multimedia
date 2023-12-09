import { type Response, type Request } from 'express'
import { type Controller } from './Controller'
import { type CommandBus } from '@Shared/domain/CommandBus'
import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'
import httpStatus from 'http-status'
import { NotFound } from '@Shared/domain/NotFound'
import { CreateChapterCommand } from '@Multimedia/Chapter/application/Create/CreateChapterCommand'

type ChapterPutRequest = Request & {
  body: {
    id: string
    seasonId: string
    title: string
    duration: number
    releaseDate: Date
    url: string
  }
}

export class ChapterPutController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  public async run(req: ChapterPutRequest, res: Response): Promise<void> {
    try {
      const { id, seasonId, title, duration, releaseDate, url } = req.body
      const releaseDateParse = new Date(releaseDate)
      const createChapterCommand = new CreateChapterCommand({
        id,
        seasonId,
        title,
        duration,
        releaseDate: releaseDateParse,
        url
      })
      await this.commandBus.dispatch(createChapterCommand)
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
