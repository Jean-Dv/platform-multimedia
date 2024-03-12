import { BackofficeMultimediaSerieIdMother } from './../../../Shared/domain/BackofficeMultimediaSerieIdMother'
import { BackofficeMultimediaSeasonReleaseYearMother } from './../../domain/BackofficeMultimediaSeasonReleaseYearMother'
import { BackofficeMultimediaSeasonTitleMother } from './../../domain/BackofficeMultimediaSeasonTitleMother'
import { BackofficeMultimediaSeasonIdMother } from './../../../Shared/domain/BackofficeMultimediaSeasonIdMother'
import { type CreateBackofficeMultimediaSeasonCommand } from '@BackofficeMultimedia/Seasons/application/Create/CreateBackofficeMultimediaSeasonCommand'
import { type BackofficeMultimediaSeasonReleaseYear } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonReleaseYear'
import { type BackofficeMultimediaSeasonTitle } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonTitle'
import { type BackofficeMultimediaSeasonId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSeasonId'
import { type BackofficeMultimediaSerieId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSerieId'

/**
 * Utility class for creating `CreateBackofficeMultimediaSeasonCommand` instances for testing.
 */
export class CreateBackofficeMultimediaSeasonCommandMother {
  public static serie: BackofficeMultimediaSerieId

  /**
   * Creates a valid `CreateBackofficeMultimediaSeasonCommand`.
   *
   * @param id - The ID for the command.
   * @param title - The title for the command.
   * @param releaseYear - The release year for the command.
   * @param synopsis - The synopsis for the command.
   * @param categories - The categories for the command.
   * @returns A valid command.
   */
  public static create(
    id: BackofficeMultimediaSeasonId,
    title: BackofficeMultimediaSeasonTitle,
    releaseYear: BackofficeMultimediaSeasonReleaseYear,
    serie: BackofficeMultimediaSerieId
  ): CreateBackofficeMultimediaSeasonCommand {
    return {
      id: id.value,
      title: title.value,
      releaseYear: releaseYear.value,
      serie: serie.value
    }
  }

  /**
   * Creates a random valid `CreateBackofficeMultimediaSeasonCommand`.
   *
   * @returns A random valid command.
   */
  public static random(): CreateBackofficeMultimediaSeasonCommand {
    return this.create(
      BackofficeMultimediaSeasonIdMother.random(),
      BackofficeMultimediaSeasonTitleMother.random(),
      BackofficeMultimediaSeasonReleaseYearMother.random(),
      this.serie
    )
  }

  /**
   * Creates an invalid `CreateBackofficeMultimediaSeasonCommand` with an invalid title.
   *
   * @returns A invalid command.
   */
  public static invalidTitle(): CreateBackofficeMultimediaSeasonCommand {
    return {
      id: BackofficeMultimediaSeasonIdMother.random().value,
      title: BackofficeMultimediaSeasonTitleMother.invalid(),
      releaseYear: BackofficeMultimediaSeasonReleaseYearMother.random().value,
      serie: this.serie.value
    }
  }

  /**
   * Creates an invalid `CreateBackofficeMultimediaSeasonCommand` with an invalid release year.
   *
   * @returns A invalid command.
   */
  public static invalidReleaseYear(): CreateBackofficeMultimediaSeasonCommand {
    return {
      id: BackofficeMultimediaSeasonIdMother.random().value,
      title: BackofficeMultimediaSeasonTitleMother.random().value,
      releaseYear: BackofficeMultimediaSeasonReleaseYearMother.invalid(),
      serie: this.serie.value
    }
  }

  /**
   * Creates an invalid `CreateBackofficeMultimediaSeasonCommand` with an invalid category.
   *
   * @returns A invalid command.
   */
  public static invalidCategory(): CreateBackofficeMultimediaSeasonCommand {
    return {
      id: BackofficeMultimediaSeasonIdMother.random().value,
      title: BackofficeMultimediaSeasonTitleMother.random().value,
      releaseYear: BackofficeMultimediaSeasonReleaseYearMother.random().value,
      serie: BackofficeMultimediaSerieIdMother.random().value
    }
  }
}
