import { BackofficeMultimediaCategoryIdMother } from './../../../Shared/domain/BackofficeMultimediaCategoryIdMother'
import { type CreateBackofficeMultimediaMovieCommand } from '@BackofficeMultimedia/Movies/application/Create/CreateBackofficeMultimediaMovieCommand'
import { type BackofficeMultimediaMovieId } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieId'
import { type BackofficeMultimediaMovieReleaseYear } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieReleaseYear'
import { type BackofficeMultimediaMovieSynopsis } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieSynopsis'
import { type BackofficeMultimediaMovieTitle } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieTitle'
import { BackofficeMultimediaMovieIdMother } from '../../domain/BackofficeMultimediaMovieIdMother'
import { BackofficeMultimediaMovieTitleMother } from '../../domain/BackofficeMultimediaMovieTitleMother'
import { BackofficeMultimediaMovieReleaseYearMother } from '../../domain/BackofficeMultimediaMovieReleaseYearMother'
import { BackofficeMultimediaMovieSynopsisMother } from '../../domain/BackofficeMultimediaMovieSynopsisMother'
import { type BackofficeMultimediaVideoId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaVideoId'
import { BackofficeMultimediaVideoIdMother } from '../../../Shared/domain/BackofficeMultimediaVideoIdMother'
import { type BackofficeMultimediaCategoryId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaCategoryId'
import { type BackofficeMultimediaCategory } from '@BackofficeMultimedia/Categories/domain/BackofficeMultimediaCategory'

/**
 * Utility class for creating `CreateBackofficeMultimediaMovieCommand` instances for testing.
 */
export class CreateBackofficeMultimediaMovieCommandMother {
  public static categories: BackofficeMultimediaCategory[] = []

  /**
   * Creates a valid `CreateBackofficeMultimediaMovieCommand`.
   *
   * @param id - The ID for the command.
   * @param title - The title for the command.
   * @param releaseYear - The release year for the command.
   * @param synopsis - The synopsis for the command.
   * @returns A valid command.
   */
  public static create(
    id: BackofficeMultimediaMovieId,
    title: BackofficeMultimediaMovieTitle,
    releaseYear: BackofficeMultimediaMovieReleaseYear,
    synopsis: BackofficeMultimediaMovieSynopsis,
    categories: BackofficeMultimediaCategoryId[],
    videoId: BackofficeMultimediaVideoId
  ): CreateBackofficeMultimediaMovieCommand {
    return {
      id: id.value,
      title: title.value,
      releaseYear: releaseYear.value,
      synopsis: synopsis.value,
      categories: categories.map((category) => {
        return {
          id: category.value
        }
      }),
      videoId: videoId.value
    }
  }

  /**
   * Creates a random valid `CreateBackofficeMultimediaMovieCommand`.
   *
   * @returns A random valid command.
   */
  public static random(
    categories: BackofficeMultimediaCategory[]
  ): CreateBackofficeMultimediaMovieCommand {
    return this.create(
      BackofficeMultimediaMovieIdMother.random(),
      BackofficeMultimediaMovieTitleMother.random(),
      BackofficeMultimediaMovieReleaseYearMother.random(),
      BackofficeMultimediaMovieSynopsisMother.random(),
      categories.map((category) => category.id),
      BackofficeMultimediaVideoIdMother.random()
    )
  }

  /**
   * Creates an invalid `CreateBackofficeMultimediaMovieCommand` with an invalid title.
   *
   * @returns An invalid command.
   */
  public static invalidTitle(): CreateBackofficeMultimediaMovieCommand {
    return {
      id: BackofficeMultimediaMovieIdMother.random().value,
      title: BackofficeMultimediaMovieTitleMother.invalid(),
      releaseYear: BackofficeMultimediaMovieReleaseYearMother.random().value,
      synopsis: BackofficeMultimediaMovieSynopsisMother.random().value,
      categories: this.categories.map((category) => {
        return { id: category.id.value }
      }),
      videoId: BackofficeMultimediaVideoIdMother.random().value
    }
  }

  /**
   * Creates an invalid `CreateBackofficeMultimediaMovieCommand` with an invalid release year.
   *
   * @returns An invalid command.
   */
  public static invalidReleaseYear(): CreateBackofficeMultimediaMovieCommand {
    return {
      id: BackofficeMultimediaMovieIdMother.random().value,
      title: BackofficeMultimediaMovieTitleMother.random().value,
      releaseYear: BackofficeMultimediaMovieReleaseYearMother.invalid(),
      synopsis: BackofficeMultimediaMovieSynopsisMother.random().value,
      categories: this.categories.map((category) => {
        return { id: category.id.value }
      }),
      videoId: BackofficeMultimediaVideoIdMother.random().value
    }
  }

  /**
   * Creates an invalid `CreateBackofficeMultimediaMovieCommand` with an invalid category.
   *
   * @returns An invalid command.
   */
  public static invalidCategory(): CreateBackofficeMultimediaMovieCommand {
    return {
      id: BackofficeMultimediaMovieIdMother.random().value,
      title: BackofficeMultimediaMovieTitleMother.random().value,
      releaseYear: BackofficeMultimediaMovieReleaseYearMother.random().value,
      synopsis: BackofficeMultimediaMovieSynopsisMother.random().value,
      categories: [{ id: BackofficeMultimediaCategoryIdMother.random().value }],
      videoId: BackofficeMultimediaVideoIdMother.random().value
    }
  }
}
