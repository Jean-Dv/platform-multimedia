import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { CreateBackofficeMultimediaMovieCommand } from './CreateBackofficeMultimediaMovieCommand'
import { type BackofficeMultimediaMovieCreator } from './BackofficeMultimediaMovieCreator'
import { type Command } from '@Shared/domain/Command'
import { BackofficeMultimediaMovieId } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieId'
import { BackofficeMultimediaMovieTitle } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieTitle'
import { BackofficeMultimediaMovieReleaseYear } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieReleaseYear'
import { BackofficeMultimediaMovieSynopsis } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieSynopsis'
import { BackofficeMultimediaVideoId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaVideoId'
import { BackofficeMultimediaCategoryId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaCategoryId'
import { type BackofficeMultimediaCategoryFinder } from '@BackofficeMultimedia/Categories/application/Find/BackofficeMultimediaCategoryFinder'

/**
 * Command handler for creating backoffice multimedia movies.
 */
export class CreateBackofficeMultimediaMovieCommandHandler
  implements CommandHandler<CreateBackofficeMultimediaMovieCommand>
{
  constructor(
    private readonly creator: BackofficeMultimediaMovieCreator,
    private readonly finderCategory: BackofficeMultimediaCategoryFinder
  ) {}

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
    const categories = command.categories.map(
      (category) => new BackofficeMultimediaCategoryId(category.id)
    )
    const videoId = new BackofficeMultimediaVideoId(command.videoId)

    // We ensure that the categories exist.
    await this.ensureCategoryExists(command.categories)

    await this.creator.run({
      id,
      title,
      releaseYear,
      synopsis,
      categories,
      videoId
    })
  }

  /**
   * Ensures that the categories exist.
   *
   * @param categories - The categories to be checked.
   */
  private async ensureCategoryExists(
    categories: Array<{ id: string }>
  ): Promise<void> {
    await Promise.all(
      categories.map(async (category) => {
        await this.finderCategory.run(
          new BackofficeMultimediaCategoryId(category.id)
        )
      })
    )
  }
}
