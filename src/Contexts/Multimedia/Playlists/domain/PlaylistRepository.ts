import { type Playlist } from './Playlist'

export interface PlaylistRepository {
  save: (playlist: Playlist) => Promise<void>
}
