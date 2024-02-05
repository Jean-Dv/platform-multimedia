import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { CreateBackofficeMultimediaChapterCommand } from './CreateBackofficeMultimediaChapterCommand'
import { type BackofficeMultimediaChapterCreator } from './BackofficeMultimediaChapterCreator'
import { type BackofficeMultimediaSeasonFinder } from '@BackofficeMultimedia/Seasons/application/Find/BackofficeMultimediaSeasonFinder'
import { type Command } from '@Shared/domain/Command'
import { BackofficeMultimediaChapterId } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterId'
import { BackofficeMultimediaChapterTitle } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterTitle'
import { BackofficeMultimediaChapterReleaseYear } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterReleaseYear'
import { BackofficeMultimediaSeasonId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSeasonId'
import { BackofficeMultimediaVideoId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaVideoId'

/**
 * Command handler for creating backoffice multimedia chapters.
 */
export class CreateBackofficeMultimediaChapterCommandHandler
  implements CommandHandler<CreateBackofficeMultimediaChapterCommand>
{
  constructor(
    private readonly creator: BackofficeMultimediaChapterCreator,
    private readonly finderSeason: BackofficeMultimediaSeasonFinder
  ) {}

  public subscribedTo(): Command {
    return CreateBackofficeMultimediaChapterCommand
  }

  public async handle(
    command: CreateBackofficeMultimediaChapterCommand
  ): Promise<void> {
    const id = new BackofficeMultimediaChapterId(command.id)
    const title = new BackofficeMultimediaChapterTitle(command.title)
    const releaseYear = new BackofficeMultimediaChapterReleaseYear(
      command.releaseYear
    )
    const season = new BackofficeMultimediaSeasonId(command.season)
    const video = new BackofficeMultimediaVideoId(command.video)

    // We find the season to check if it exists.
    await this.ensureSeasonExists(season)

    await this.creator.run({
      id,
      title,
      releaseYear,
      season,
      video
    })
  }

  /**
   * Ensures that the season exists.
   *
   * @param seasonId - The season to be checked.
   */
  private async ensureSeasonExists(
    seasonId: BackofficeMultimediaSeasonId
  ): Promise<void> {
    await this.finderSeason.run(seasonId)
  }
}
