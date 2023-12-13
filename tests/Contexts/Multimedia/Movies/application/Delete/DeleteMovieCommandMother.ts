import { type DeleteMovieCommand } from '@Multimedia/Movies/application/Delete/DeleteMovieCommand'
import { type PlaylistId } from '@Multimedia/Playlists/domain/PlaylistId'
import { MovieIdMother } from '../../domain/MovieIdMother'

export class DeleteMovieCommandMother {
  public static create(id: PlaylistId): DeleteMovieCommand {
    return {
      id: id.value
    }
  }

  public static random(): DeleteMovieCommand {
    return this.create(MovieIdMother.random())
  }
}
