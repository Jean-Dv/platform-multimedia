import { type QueryBus } from '@Shared/domain/QueryBus'
import { type Controller } from './Controller'
import { type Request, type Response } from 'express'
import { SearchAllPlaylistsQuery } from '@Multimedia/Playlists/application/SearchAll/SearchAllPlaylistsQuery'
import { type PlaylistsResponse } from '@Multimedia/Playlists/application/PlaylistsResponse'

export class PlaylistsGetController implements Controller {
  constructor(private readonly queryBus: QueryBus) {}

  public async run(req: Request, res: Response): Promise<void> {
    const { userId } = req.params
    const query = new SearchAllPlaylistsQuery(userId)
    const response = await this.queryBus.ask<PlaylistsResponse>(query)
    res.status(200).json({
      ok: true,
      data: response.playlists
    })
  }
}
