import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { CreateBackofficeMultimediaSeasonCommand } from './CreateBackofficeMultimediaSeasonCommand'
import { type BackofficeMultimediaSeasonCreator } from './BackofficeMultimediaSeasonCreator'
import { type BackofficeMultimediaSerieFinder } from '@BackofficeMultimedia/Series/application/Find/BackofficeMultimediaSerieFinder'
import { type Command } from '@Shared/domain/Command'
import { BackofficeMultimediaSeasonId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSeasonId'
import { BackofficeMultimediaSeasonTitle } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonTitle'
import { BackofficeMultimediaSeasonReleaseYear } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonReleaseYear'
import { BackofficeMultimediaSerieId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSerieId'

/**
 * Command handler for creating backoffice multimedia seasons.
 */
export class CreateBackofficeMultimediaSeasonCommandHandler
  implements CommandHandler<CreateBackofficeMultimediaSeasonCommand>
{
  constructor(
    private readonly creator: BackofficeMultimediaSeasonCreator,
    private readonly finderSeason: BackofficeMultimediaSerieFinder
  ) {}

  public subscribedTo(): Command {
    return CreateBackofficeMultimediaSeasonCommand
  }

  public async handle(
    command: CreateBackofficeMultimediaSeasonCommand
  ): Promise<void> {
    const id = new BackofficeMultimediaSeasonId(command.id)
    const title = new BackofficeMultimediaSeasonTitle(command.title)
    const releaseYear = new BackofficeMultimediaSeasonReleaseYear(
      command.releaseYear
    )
    const serie = new BackofficeMultimediaSerieId(command.serie)

    // We ensure that the serie exists.
    await this.ensureSerieExists(serie)

    await this.creator.run({
      id,
      title,
      releaseYear,
      serie
    })
  }

  /**
   * Ensures that the serie exists.
   *
   * @param serieId - The serie to be checked.
   */
  private async ensureSerieExists(
    serieId: BackofficeMultimediaSerieId
  ): Promise<void> {
    await this.finderSeason.run(serieId)
  }
}
