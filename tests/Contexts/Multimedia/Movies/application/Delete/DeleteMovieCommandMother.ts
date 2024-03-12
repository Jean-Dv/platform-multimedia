import { type DeleteMovieCommand } from '@Multimedia/Movies/application/Delete/DeleteMovieCommand'
import { MovieIdMother } from '../../domain/MovieIdMother'
import { type MovieId } from '@Multimedia/Movies/domain/MovieId'

export class DeleteMovieCommandMother {
  public static create(id: MovieId): DeleteMovieCommand {
    return {
      id: id.value
    }
  }

  public static random(): DeleteMovieCommand {
    return this.create(MovieIdMother.random())
  }
}
