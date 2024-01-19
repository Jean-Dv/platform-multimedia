import { type CreateBackofficeMultimediaSerieCommand } from '@BackofficeMultimedia/Series/application/Create/CreateBackofficeMultimediaSerieCommand'
import { BackofficeMultimediaSerie } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerie'
import { BackofficeMultimediaSerieReleaseYear } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieReleaseYear'
import { BackofficeMultimediaSerieSynopsis } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieSynopsis'
import { BackofficeMultimediaSerieTitle } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieTitle'
import { BackofficeMultimediaCategoryId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaCategoryId'
import { BackofficeMultimediaSerieId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSerieId'
import { BackofficeMultimediaSerieIdMother } from '../../Shared/domain/BackofficeMultimediaSerieIdMother'
import { BackofficeMultimediaSerieTitleMother } from './BackofficeMultimediaSerieTitleMother'
import { BackofficeMultimediaSerieReleaseYearMother } from './BackofficeMultimediaSerieReleaseYearMother'
import { BackofficeMultimediaSerieSynopsisMother } from './BackofficeMultimediaSerieSynopsisMother'
import { BackofficeMultimediaCategoryIdMother } from '../../Shared/domain/BackofficeMultimediaCategoryIdMother'

/**
 * Factory class for creating instances of `BackofficeMultimediaSerie` for testing.
 */
export class BackofficeMultimediaSerieMother {
  /**
   * Creates a `BackofficeMultimediaSerie` with the specified values.
   *
   * @param id - The ID to be used for creating the instance.
   * @param title - The title to be used for creating the instance.
   * @param releaseYear - The release year to be used for creating the instance.
   * @param synopsis - The synopsis to be used for creating the instance.
   * @param categories - The categories to be used for creating the instance.
   * @returns An instance of `BackofficeMultimediaSerie`.
   */
  public static create(
    id: BackofficeMultimediaSerieId,
    title: BackofficeMultimediaSerieTitle,
    releaseYear: BackofficeMultimediaSerieReleaseYear,
    synopsis: BackofficeMultimediaSerieSynopsis,
    categories: BackofficeMultimediaCategoryId[]
  ): BackofficeMultimediaSerie {
    return new BackofficeMultimediaSerie(
      id,
      title,
      releaseYear,
      synopsis,
      categories
    )
  }

  /**
   * Creates a `BackofficeMultimediaSerie` with the specified command.
   *
   * @param command - The command to be used for creating the instance.
   * @returns An instance of `BackofficeMultimediaSerie`.
   */
  public static from(
    command: CreateBackofficeMultimediaSerieCommand
  ): BackofficeMultimediaSerie {
    return this.create(
      new BackofficeMultimediaSerieId(command.id),
      new BackofficeMultimediaSerieTitle(command.title),
      new BackofficeMultimediaSerieReleaseYear(command.releaseYear),
      new BackofficeMultimediaSerieSynopsis(command.synopsis),
      command.categories.map(
        (categoryId) => new BackofficeMultimediaCategoryId(categoryId)
      )
    )
  }

  /**
   * Creates a random `BackofficeMultimediaSerie`.
   *
   * @returns A random instance of `BackofficeMultimediaSerie`.
   */
  public static random(): BackofficeMultimediaSerie {
    return this.create(
      BackofficeMultimediaSerieIdMother.random(),
      BackofficeMultimediaSerieTitleMother.random(),
      BackofficeMultimediaSerieReleaseYearMother.random(),
      BackofficeMultimediaSerieSynopsisMother.random(),
      Array.from({ length: 3 }, () =>
        BackofficeMultimediaCategoryIdMother.random()
      )
    )
  }
}
