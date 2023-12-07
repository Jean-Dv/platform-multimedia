import { type UserId } from '@Auth/Shared/domain/User/UserId'
import { type MovieId } from '@Multimedia/Movies/domain/MovieId'
import { Playlist } from '@Multimedia/Playlists/domain/Playlist'
import { type PlaylistId } from '@Multimedia/Playlists/domain/PlaylistId'
import { type PlaylistName } from '@Multimedia/Playlists/domain/PlaylistName'
import { type PlaylistRepository } from '@Multimedia/Playlists/domain/PlaylistRepository'
import { type SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'
import { type EventBus } from '@Shared/domain/EventBus'

export class PlaylistCreator {
  constructor(
    private readonly repository: PlaylistRepository,
    private readonly eventBus: EventBus
  ) {}

  public async run(params: {
    id: PlaylistId
    name: PlaylistName
    userId: UserId
    seriesIds: SerieId[]
    moviesIds: MovieId[]
  }): Promise<void> {
    const playlist = Playlist.create(
      params.id,
      params.name,
      params.userId,
      params.seriesIds,
      params.moviesIds
    )
    await this.repository.save(playlist)
    await this.eventBus.publish(playlist.pullDomainEvents())
  }
}
