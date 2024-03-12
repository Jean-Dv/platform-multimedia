import { type Playlist } from '@Multimedia/Playlists/domain/Playlist'
import { type PlaylistRepository } from '@Multimedia/Playlists/domain/PlaylistRepository'
import { type MultimediaUserId } from '@Multimedia/Users/domain/MultimediaUserId'

export class PlaylistFinder {
  constructor(private readonly repository: PlaylistRepository) {}

  public async run(id: MultimediaUserId): Promise<Playlist[]> {
    const playlist = await this.repository.searchAllByUser(id)
    return playlist
  }
}
