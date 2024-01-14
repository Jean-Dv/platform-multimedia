import { type CommandBus } from '@Shared/domain/CommandBus'
import { type Controller } from './Controller'
import { type Request, type Response } from 'express'
import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'
import { CreateBackofficeMultimediaVideoCommand } from '@BackofficeMultimedia/Videos/application/Create/CreateBackofficeMultimediaVideoCommand'
import httpStatus from 'http-status'
import { NotFound } from '@Shared/domain/NotFound'

type VideoPostRequest = Request & {
  id?: string
  file?: {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    destination: string
    filename: string
    path: string
    size: number
  }
}

export class VideoPostController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  public async run(req: VideoPostRequest, res: Response): Promise<void> {
    try {
      if (req.file === undefined) {
        throw new InvalidArgumentError('Video file is required')
      }
      if (req.id === undefined) {
        throw new InvalidArgumentError('Video id is required')
      }
      const createVideoCommand = new CreateBackofficeMultimediaVideoCommand({
        id: req.id,
        path: req.file.path
      })
      await this.commandBus.dispatch(createVideoCommand)
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
