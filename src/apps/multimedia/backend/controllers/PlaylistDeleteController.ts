import { type Request, type Response } from 'express'
import { type Controller } from './Controller'
import { NotFound } from '@Shared/domain/NotFound'
import { DeletePlaylistCommand } from '@Multimedia/Playlists/application/Delete/DeletePlaylistCommand'
import { type CommandBus } from '@Shared/domain/CommandBus'

export class PlaylistDeleteController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  public async run(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const deletePlaylistCommand = new DeletePlaylistCommand({ id })
      await this.commandBus.dispatch(deletePlaylistCommand)
      res.status(200).json({
        ok: true
      })
    } catch (error) {
      if (error instanceof NotFound) {
        res.status(404).json({
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
