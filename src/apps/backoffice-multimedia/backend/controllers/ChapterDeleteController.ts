import { type Request, type Response } from 'express'
import { type Controller } from './Controller'
import { type CommandBus } from '@Shared/domain/CommandBus'
import { DeleteBackofficeMultimediaChapterCommand } from '@BackofficeMultimedia/Chapters/application/Delete/DeleteBackofficeMultimediaChapterCommand'
import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'
import httpStatus from 'http-status'
import { NotFound } from '@aws-sdk/client-s3'

/**
 * Controller for the delete chapter endpoint
 */
export class ChapterDeleteController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  public async run(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const deleteChapterCommand = new DeleteBackofficeMultimediaChapterCommand(
        { id }
      )
      await this.commandBus.dispatch(deleteChapterCommand)
      res.status(httpStatus.OK).json({
        ok: true
      })
    } catch (error) {
      console.log(error)
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
