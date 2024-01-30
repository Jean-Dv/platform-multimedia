import { type Response, type Request } from 'express'
import { type Controller } from './Controller'
import { type CommandBus } from '@Shared/domain/CommandBus'
import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'
import httpStatus from 'http-status'
import { NotFound } from '@Shared/domain/NotFound'
import { CreateBackofficeMultimediaChapterCommand } from '@BackofficeMultimedia/Chapters/application/Create/CreateBackofficeMultimediaChapterCommand'

type ChapterPutRequest = Request & {
  body: {
    id: string
    title: string
    releaseYear: string
    season: {
      id: string
    }
    video: {
      id: string
    }
  }
}

export class ChapterPutController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  public async run(req: ChapterPutRequest, res: Response): Promise<void> {
    try {
      const { id, title, releaseYear, season, video } = req.body
      const createChapterCommand = new CreateBackofficeMultimediaChapterCommand(
        {
          id,
          title,
          releaseYear,
          season: season.id,
          video: video.id
        }
      )
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
