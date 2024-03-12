import { type CommandBus } from '@Shared/domain/CommandBus'
import { type Controller } from './Controller'
import { type Request, type Response } from 'express'
import { DeleteBackofficeMultimediaSeasonCommand } from '@BackofficeMultimedia/Seasons/application/Delete/DeleteBackofficeMultimediaSeasonCommand'
import httpStatus from 'http-status'
import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'
import { NotFound } from '@Shared/domain/NotFound'

/**
 * Controller for the delete season endpoint
 */
export class SeasonDeleteController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  public async run(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const deleteSeasonCommand = new DeleteBackofficeMultimediaSeasonCommand({
        id
      })
      await this.commandBus.dispatch(deleteSeasonCommand)
      res.status(httpStatus.OK).json({
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
