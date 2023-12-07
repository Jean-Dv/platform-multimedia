import { Playlist } from '@Multimedia/Playlists/domain/Playlist'
import { type PlaylistId } from '@Multimedia/Playlists/domain/PlaylistId'
import { PlaylistNotFound } from '@Multimedia/Playlists/domain/PlaylistNotFound'
import { type PlaylistRepository } from '@Multimedia/Playlists/domain/PlaylistRepository'
import { type EventBus } from '@Shared/domain/EventBus'

export class PlaylistDeletor {
  constructor(
    private readonly repository: PlaylistRepository,
    private readonly eventBus: EventBus
  ) {}

  public async run(id: PlaylistId): Promise<void> {
    const playlist = await this.repository.search(id)
    if (playlist === null) {
      throw new PlaylistNotFound(`The playlist <${id.value}> does not exist`)
    }
    const playlistToDelete = Playlist.delete(
      playlist.id,
      playlist.name,
      playlist.userId,
      playlist.seriesIds,
      playlist.moviesIds
    )
    await this.repository.delete(playlistToDelete.id)
    await this.eventBus.publish(playlistToDelete.pullDomainEvents())
  }
}
