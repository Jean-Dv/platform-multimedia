import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { CreateBackofficeMultimediaMovieCommand } from './CreateBackofficeMultimediaMovieCommand'
import { type BackofficeMultimediaMovieCreator } from './BackofficeMultimediaMovieCreator'
import { type Command } from '@Shared/domain/Command'
import { BackofficeMultimediaMovieId } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieId'
import { BackofficeMultimediaMovieTitle } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieTitle'
import { BackofficeMultimediaMovieReleaseYear } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieReleaseYear'
import { BackofficeMultimediaMovieSynopsis } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieSynopsis'

/**
 * Command handler for creating backoffice multimedia movies.
 */
export class CreateBackofficeMultimediaMovieCommandHandler
  implements CommandHandler<CreateBackofficeMultimediaMovieCommand>
{
  constructor(private readonly creator: BackofficeMultimediaMovieCreator) {}

  public subscribedTo(): Command {
    return CreateBackofficeMultimediaMovieCommand
  }

  public async handle(
    command: CreateBackofficeMultimediaMovieCommand
  ): Promise<void> {
    const id = new BackofficeMultimediaMovieId(command.id)
    const title = new BackofficeMultimediaMovieTitle(command.title)
    const releaseYear = new BackofficeMultimediaMovieReleaseYear(
      command.releaseYear
    )
    const synopsis = new BackofficeMultimediaMovieSynopsis(command.synopsis)
    await this.creator.run({
      id,
      title,
      releaseYear,
      synopsis
    })
  }
}
