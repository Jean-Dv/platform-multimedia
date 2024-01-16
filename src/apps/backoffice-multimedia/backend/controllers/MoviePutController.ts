import { type CommandBus } from '@Shared/domain/CommandBus'
import { type Controller } from './Controller'
import { type Request, type Response } from 'express'
import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'
import httpStatus from 'http-status'
import { NotFound } from '@Shared/domain/NotFound'
import { CreateBackofficeMultimediaMovieCommand } from '@BackofficeMultimedia/Movies/application/Create/CreateBackofficeMultimediaMovieCommand'

type MoviePutRequest = Request & {
  body: {
    id?: string
    title: string
    releaseYear: string
    synopsis: string
    categories: Array<{
      id: string
    }>
    videoId: string
  }
}

export class MoviePutController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  public async run(req: MoviePutRequest, res: Response): Promise<void> {
    try {
      const { id, title, releaseYear, synopsis, videoId } = req.body
      const createMovieCommand = new CreateBackofficeMultimediaMovieCommand({
        id,
        title,
        releaseYear,
        synopsis,
        categories: req.body.categories.map(
          (category: { id: string }) => category.id
        ),
        videoId
      })
      await this.commandBus.dispatch(createMovieCommand)
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
