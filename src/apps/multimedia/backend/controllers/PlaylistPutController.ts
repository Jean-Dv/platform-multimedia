import { CreatePlaylistCommand } from '@Multimedia/Playlists/application/Create/CreatePlaylistCommand'
import { type CommandBus } from '@Shared/domain/CommandBus'
import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'
import { type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { type Controller } from './Controller'

type PlaylistPutRequest = Request & {
  body: {
    id: string
    name: string
    userId: string
    series: string[]
    movies: string[]
  }
}

export class PlaylistPutController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  public async run(req: PlaylistPutRequest, res: Response): Promise<void> {
    try {
      const { id, name, userId, series, movies } = req.body
      const createPlaylistCommand = new CreatePlaylistCommand({
        id,
        name,
        userId,
        seriesIds: series,
        moviesIds: movies
      })
      await this.commandBus.dispatch(createPlaylistCommand)
      res.status(httpStatus.CREATED).json({
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
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false
      })
    }
  }
}
