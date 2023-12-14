import { type Request, type Response } from 'express'
import { type Controller } from './Controller'
import { DeleteSerieCommand } from '@Multimedia/Serie/application/Delete/DeleteSerieCommand'
import httpStatus from 'http-status'
import { NotFound } from '@Shared/domain/NotFound'
import { type CommandBus } from '@Shared/domain/CommandBus'

export class SerieDeleteController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  public async run(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const deleteSerieCommand = new DeleteSerieCommand({ id })
      await this.commandBus.dispatch(deleteSerieCommand)
      res.status(httpStatus.OK).json({
        ok: true
      })
    } catch (error) {
      if (error instanceof NotFound) {
        res.status(httpStatus.NOT_FOUND).json({
          ok: false,
          error: error.message
        })
        return
      }
      console.log(error)
      res.status(500).json({
        ok: false
      })
    }
  }
}
