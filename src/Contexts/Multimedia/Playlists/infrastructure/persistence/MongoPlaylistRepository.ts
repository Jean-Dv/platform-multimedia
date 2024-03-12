import { Playlist } from '@Multimedia/Playlists/domain/Playlist'
import { type PlaylistId } from '@Multimedia/Playlists/domain/PlaylistId'
import { type PlaylistRepository } from '@Multimedia/Playlists/domain/PlaylistRepository'
import { type MultimediaUserId } from '@Multimedia/Users/domain/MultimediaUserId'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'

interface PlaylistDocument {
  _id: string
  id: string
  name: string
  userId: string
  seriesIds: string[]
  moviesIds: string[]
}

export class MongoPlaylistRepository
  extends MongoRepository<Playlist>
  implements PlaylistRepository
{
  public async save(playlist: Playlist): Promise<void> {
    await this.persist(playlist.id.value, playlist)
  }

  public async search(id: PlaylistId): Promise<Playlist | null> {
    const collection = await this.collection()
    const document = await collection.findOne<PlaylistDocument>({
      id: id.value
    })
    return document !== null
      ? Playlist.fromPrimitives({
          id: document.id,
          name: document.name,
          userId: document.userId,
          seriesIds: document.seriesIds,
          moviesIds: document.moviesIds
        })
      : null
  }

  public async delete(id: PlaylistId): Promise<void> {
    await this.erase(id.value)
  }

  public async searchAllByUser(userId: MultimediaUserId): Promise<Playlist[]> {
    const collection = await this.collection()
    const documents = collection.find<PlaylistDocument>({
      userId: userId.value,
      deletedAt: null
    })
    const playlists = []
    for await (const document of documents) {
      playlists.push(
        Playlist.fromPrimitives({
          id: document.id,
          name: document.name,
          userId: document.userId,
          seriesIds: document.seriesIds,
          moviesIds: document.moviesIds
        })
      )
    }
    return playlists
  }

  public collectionName(): string {
    return 'playlists'
  }
}
