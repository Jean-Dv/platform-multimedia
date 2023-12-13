import { type CommandBus } from '@Shared/domain/CommandBus'
import { type Controller } from './Controller'
import { type Request, type Response } from 'express'
import { DeleteMovieCommand } from '@Multimedia/Movies/application/Delete/DeleteMovieCommand'
import { NotFound } from '@Shared/domain/NotFound'
import httpStatus from 'http-status'

export class MovieDeleteController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  public async run(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const deleteMovieCommand = new DeleteMovieCommand({ id })
      await this.commandBus.dispatch(deleteMovieCommand)
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
