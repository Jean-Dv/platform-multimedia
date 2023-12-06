import { type Playlist } from '@Multimedia/Playlists/domain/Playlist'
import { type PlaylistRepository } from '@Multimedia/Playlists/domain/PlaylistRepository'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'

export class MongoPlaylistRepository
  extends MongoRepository<Playlist>
  implements PlaylistRepository
{
  public async save(playlist: Playlist): Promise<void> {
    await this.persist(playlist.id.value, playlist)
  }

  public collectionName(): string {
    return 'playlists'
  }
}
