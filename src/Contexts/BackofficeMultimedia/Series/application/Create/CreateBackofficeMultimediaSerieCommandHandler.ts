import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { CreateBackofficeMultimediaSerieCommand } from './CreateBackofficeMultimediaSerieCommand'
import { type BackofficeMultimediaSerieCreator } from './BackofficeMultimediaSerieCreator'
import { type BackofficeMultimediaCategoryFinder } from '@BackofficeMultimedia/Categories/application/Find/BackofficeMultimediaCategoryFinder'
import { type Command } from '@Shared/domain/Command'
import { BackofficeMultimediaSerieId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSerieId'
import { BackofficeMultimediaSerieTitle } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieTitle'
import { BackofficeMultimediaSerieReleaseYear } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieReleaseYear'
import { BackofficeMultimediaSerieSynopsis } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieSynopsis'
import { BackofficeMultimediaCategoryId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaCategoryId'

/**
 * Command handler for creating backoffice multimedia series.
 */
export class CreateBackofficeMultimediaSerieCommandHandler
  implements CommandHandler<CreateBackofficeMultimediaSerieCommand>
{
  constructor(
    private readonly creator: BackofficeMultimediaSerieCreator,
    private readonly finderCategory: BackofficeMultimediaCategoryFinder
  ) {}

  public subscribedTo(): Command {
    return CreateBackofficeMultimediaSerieCommand
  }

  public async handle(
    command: CreateBackofficeMultimediaSerieCommand
  ): Promise<void> {
    const id = new BackofficeMultimediaSerieId(command.id)
    const title = new BackofficeMultimediaSerieTitle(command.title)
    const releaseYear = new BackofficeMultimediaSerieReleaseYear(
      command.releaseYear
    )
    const synopsis = new BackofficeMultimediaSerieSynopsis(command.synopsis)
    const categories = command.categories.map(
      (category) => new BackofficeMultimediaCategoryId(category.id)
    )

    // We ensure that the categories exist.
    await this.ensureCategoryExists(command.categories)

    await this.creator.run({
      id,
      title,
      releaseYear,
      synopsis,
      categories
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
