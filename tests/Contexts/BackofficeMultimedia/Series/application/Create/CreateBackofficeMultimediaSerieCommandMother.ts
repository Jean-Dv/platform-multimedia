import { type CreateBackofficeMultimediaSerieCommand } from '@BackofficeMultimedia/Series/application/Create/CreateBackofficeMultimediaSerieCommand'
import { type BackofficeMultimediaSerieReleaseYear } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieReleaseYear'
import { type BackofficeMultimediaSerieSynopsis } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieSynopsis'
import { type BackofficeMultimediaSerieTitle } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieTitle'
import { type BackofficeMultimediaCategoryId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaCategoryId'
import { type BackofficeMultimediaSerieId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSerieId'
import { BackofficeMultimediaCategoryIdMother } from '../../../Shared/domain/BackofficeMultimediaCategoryIdMother'
import { BackofficeMultimediaSerieIdMother } from '../../../Shared/domain/BackofficeMultimediaSerieIdMother'
import { BackofficeMultimediaSerieReleaseYearMother } from '../../domain/BackofficeMultimediaSerieReleaseYearMother'
import { BackofficeMultimediaSerieSynopsisMother } from '../../domain/BackofficeMultimediaSerieSynopsisMother'
import { BackofficeMultimediaSerieTitleMother } from '../../domain/BackofficeMultimediaSerieTitleMother'
import { type BackofficeMultimediaCategory } from '@BackofficeMultimedia/Categories/domain/BackofficeMultimediaCategory'

/**
 * Utility class for creating `CreateBackofficeMultimediaSerieCommand` instances for testing.
 */
export class CreateBackofficeMultimediaSerieCommandMother {
  public static categories: BackofficeMultimediaCategory[] = []

  /**
   * Creates a valid `CreateBackofficeMultimediaSerieCommand`.
   *
   * @param id - The ID for the command.
   * @param title - The title for the command.
   * @param releaseYear - The release year for the command.
   * @param synopsis - The synopsis for the command.
   * @param categories - The categories for the command.
   * @returns A valid command.
   */
  public static create(
    id: BackofficeMultimediaSerieId,
    title: BackofficeMultimediaSerieTitle,
    releaseYear: BackofficeMultimediaSerieReleaseYear,
    synopsis: BackofficeMultimediaSerieSynopsis,
    categories: BackofficeMultimediaCategoryId[]
  ): CreateBackofficeMultimediaSerieCommand {
    return {
      id: id.value,
      title: title.value,
      releaseYear: releaseYear.value,
      synopsis: synopsis.value,
      categories: categories.map((category) => category.value)
    }
  }

  /**
   * Creates a random valid `CreateBackofficeMultimediaSerieCommand`.
   *
   * @returns A random valid command.
   */
  public static random(): CreateBackofficeMultimediaSerieCommand {
    return this.create(
      BackofficeMultimediaSerieIdMother.random(),
      BackofficeMultimediaSerieTitleMother.random(),
      BackofficeMultimediaSerieReleaseYearMother.random(),
      BackofficeMultimediaSerieSynopsisMother.random(),
      this.categories.map((category) => category.id)
    )
  }

  /**
   * Creates an invalid `CreateBackofficeMultimediaSerieCommand` with an invalid title.
   *
   * @returns A invalid command.
   */
  public static invalidTitle(): CreateBackofficeMultimediaSerieCommand {
    return {
      id: BackofficeMultimediaSerieIdMother.random().value,
      title: BackofficeMultimediaSerieTitleMother.invalid(),
      releaseYear: BackofficeMultimediaSerieReleaseYearMother.random().value,
      synopsis: BackofficeMultimediaSerieSynopsisMother.random().value,
      categories: this.categories.map((category) => category.id.value)
    }
  }

  /**
   * Creates an invalid `CreateBackofficeMultimediaSerieCommand` with an invalid release year.
   *
   * @returns A invalid command.
   */
  public static invalidReleaseYear(): CreateBackofficeMultimediaSerieCommand {
    return {
      id: BackofficeMultimediaSerieIdMother.random().value,
      title: BackofficeMultimediaSerieTitleMother.random().value,
      releaseYear: BackofficeMultimediaSerieReleaseYearMother.invalid(),
      synopsis: BackofficeMultimediaSerieSynopsisMother.random().value,
      categories: this.categories.map((category) => category.id.value)
    }
  }

  /**
   * Creates an invalid `CreateBackofficeMultimediaSerieCommand` with an invalid category.
   *
   * @returns A invalid command.
   */
  public static invalidCategory(): CreateBackofficeMultimediaSerieCommand {
    return {
      id: BackofficeMultimediaSerieIdMother.random().value,
      title: BackofficeMultimediaSerieTitleMother.random().value,
      releaseYear: BackofficeMultimediaSerieReleaseYearMother.random().value,
      synopsis: BackofficeMultimediaSerieSynopsisMother.random().value,
      categories: [BackofficeMultimediaCategoryIdMother.random().value]
    }
  }
}
