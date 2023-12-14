import { type MultimediaUserId } from '@Multimedia/Users/domain/MultimediaUserId'
import { type Playlist } from './Playlist'
import { type PlaylistId } from './PlaylistId'

export interface PlaylistRepository {
  save: (playlist: Playlist) => Promise<void>
  search: (id: PlaylistId) => Promise<Playlist | null>
  delete: (id: PlaylistId) => Promise<void>
  searchAllByUser: (userId: MultimediaUserId) => Promise<Playlist[]>
}
