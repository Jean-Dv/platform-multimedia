import { type Playlist } from '../domain/Playlist'

interface PlaylistResponse {
  id: string
  name: string
  userId: string
  seriesIds: string[]
  moviesIds: string[]
}

export class PlaylistsResponse {
  public readonly playlists: PlaylistResponse[]

  constructor(playlists: Playlist[]) {
    this.playlists = playlists.map((playlist) => {
      return playlist.toPrimitives()
    })
  }
}
