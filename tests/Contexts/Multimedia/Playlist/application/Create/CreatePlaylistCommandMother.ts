import { type UserId } from '@Auth/Shared/domain/User/UserId'
import { type MovieId } from '@Multimedia/Movies/domain/MovieId'
import { type CreatePlaylistCommand } from '@Multimedia/Playlists/application/Create/CreatePlaylistCommand'
import { type PlaylistId } from '@Multimedia/Playlists/domain/PlaylistId'
import { type PlaylistName } from '@Multimedia/Playlists/domain/PlaylistName'
import { type SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'
import { PlaylistIdMother } from '../../domain/PlaylistIdMother'
import { PlaylistNameMother } from '../../domain/PlaylistNameMother'
import { UserIdMother } from '../../../../Auth/Shared/User/domain/UserIdMother'
import { SerieIdMother } from '../../../Shared/domain/SerieIdMother'
import { MovieIdMother } from '../../../Movies/domain/MovieIdMother'

export class CreatePlaylistCommandMother {
  public static create(
    id: PlaylistId,
    name: PlaylistName,
    userId: UserId,
    seriesIds: SerieId[],
    moviesIds: MovieId[]
  ): CreatePlaylistCommand {
    return {
      id: id.value,
      name: name.value,
      userId: userId.value,
      seriesIds: seriesIds.map((serieId) => serieId.value),
      moviesIds: moviesIds.map((movieId) => movieId.value)
    }
  }

  public static random(): CreatePlaylistCommand {
    return this.create(
      PlaylistIdMother.random(),
      PlaylistNameMother.random(),
      UserIdMother.random(),
      [SerieIdMother.random(), SerieIdMother.random()],
      [MovieIdMother.random(), MovieIdMother.random()]
    )
  }

  public static invalid(): CreatePlaylistCommand {
    return {
      id: PlaylistIdMother.random().value,
      name: PlaylistNameMother.invalid(),
      userId: UserIdMother.random().value,
      seriesIds: [SerieIdMother.random().value, SerieIdMother.random().value],
      moviesIds: [MovieIdMother.random().value, MovieIdMother.random().value]
    }
  }
}
