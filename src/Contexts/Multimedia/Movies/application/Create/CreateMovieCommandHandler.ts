import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { CreateMovieCommand } from '../../domain/CreateMovieCommand'
import { type MovieCreator } from './MovieCreator'
import { type Command } from '@Shared/domain/Command'
import { MovieId } from '../../domain/MovieId'
import { MovieTitle } from '../../domain/MovieTitle'
import { MovieReleaseDate } from '../../domain/MovieReleaseDate'
import { MovieDuration } from '../../domain/MovieDuration'

/**
 * Command handler for the CreateMovieCommand.
 */
export class CreateMovieCommandHandler
  implements CommandHandler<CreateMovieCommand>
{
  constructor(private readonly movieCreator: MovieCreator) {}

  /**
   * Returns the command type that this handler is subscribed to.
   *
   * @returns The CreateMovieCommand class.
   */
  public subscribedTo(): Command {
    return CreateMovieCommand
  }

  /**
   * Handles the CreateMovieCommand by creating a new movie using the provided command parameters.
   *
   * @param command - The CreateMovieCommand instance containing the details for creating a new movie.
   * @returns A Promise that resolves once the movie is successfully created.
   */
  public async handle(command: CreateMovieCommand): Promise<void> {
    const id = new MovieId(command.id)
    const title = new MovieTitle(command.title)
    const releaseDate = new MovieReleaseDate(command.releaseDate)
    const duration = new MovieDuration(command.duration)
    await this.movieCreator.run({
      id,
      title,
      releaseDate,
      duration
    })
  }
}
