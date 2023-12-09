import { UserId } from '@Auth/Shared/domain/User/UserId'
import { MovieId } from '@Multimedia/Movies/domain/MovieId'
import { type CreatePlaylistCommand } from '@Multimedia/Playlists/application/Create/CreatePlaylistCommand'
import { Playlist } from '@Multimedia/Playlists/domain/Playlist'
import { PlaylistId } from '@Multimedia/Playlists/domain/PlaylistId'
import { PlaylistName } from '@Multimedia/Playlists/domain/PlaylistName'
import { SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'
import { PlaylistIdMother } from './PlaylistIdMother'
import { PlaylistNameMother } from './PlaylistNameMother'
import { UserIdMother } from '../../../Auth/Shared/User/domain/UserIdMother'
import { SerieIdMother } from '../../Shared/domain/SerieIdMother'
import { MovieIdMother } from '../../Movies/domain/MovieIdMother'

export class PlaylistMother {
  public static create(
    id: PlaylistId,
    name: PlaylistName,
    userId: UserId,
    serieIds: SerieId[],
    movieIds: MovieId[]
  ): Playlist {
    return new Playlist(id, name, userId, serieIds, movieIds)
  }

  public static from(command: CreatePlaylistCommand): Playlist {
    return this.create(
      new PlaylistId(command.id),
      new PlaylistName(command.name),
      new UserId(command.userId),
      command.seriesIds.map((id: string) => new SerieId(id)),
      command.moviesIds.map((id: string) => new MovieId(id))
    )
  }

  public static random(): Playlist {
    return this.create(
      PlaylistIdMother.random(),
      PlaylistNameMother.random(),
      UserIdMother.random(),
      [SerieIdMother.random(), SerieIdMother.random()],
      [MovieIdMother.random(), MovieIdMother.random()]
    )
  }
}
