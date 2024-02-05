import { type CreateBackofficeMultimediaSeasonCommand } from '@BackofficeMultimedia/Seasons/application/Create/CreateBackofficeMultimediaSeasonCommand'
import { BackofficeMultimediaSeason } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeason'
import { BackofficeMultimediaSeasonReleaseYear } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonReleaseYear'
import { BackofficeMultimediaSeasonTitle } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonTitle'
import { BackofficeMultimediaSeasonId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSeasonId'
import { BackofficeMultimediaSerieId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSerieId'
import { BackofficeMultimediaSeasonIdMother } from '../../Shared/domain/BackofficeMultimediaSeasonIdMother'
import { BackofficeMultimediaSeasonTitleMother } from './BackofficeMultimediaSeasonTitleMother'
import { BackofficeMultimediaSeasonReleaseYearMother } from './BackofficeMultimediaSeasonReleaseYearMother'

/**
 * Factory class for creating instances of `BackofficeMultimediaSeason` for testing.
 */
export class BackofficeMultimediaSeasonMother {
  public static serie: BackofficeMultimediaSerieId

  /**
   * Creates a `BackofficeMultimediaSeason` with the specified values.
   *
   * @param id - The ID to be used for creating the instance.
   * @param title - The title to be used for creating the instance.
   * @param releaseYear - The release year to be used for creating the instance.
   * @param serie - The serie to be used for creating the instance.
   * @returns An instance of `BackofficeMultimediaSeason`.
   */
  public static create(
    id: BackofficeMultimediaSeasonId,
    title: BackofficeMultimediaSeasonTitle,
    releaseYear: BackofficeMultimediaSeasonReleaseYear,
    serie: BackofficeMultimediaSerieId
  ): BackofficeMultimediaSeason {
    return new BackofficeMultimediaSeason(id, title, releaseYear, serie)
  }

  /**
   * Creates a `BackofficeMultimediaSeason` with the specified command.
   *
   * @param command - The command to be used for creating the instance.
   * @returns An instance of `BackofficeMultimediaSeason`.
   */
  public static from(
    command: CreateBackofficeMultimediaSeasonCommand
  ): BackofficeMultimediaSeason {
    return this.create(
      new BackofficeMultimediaSeasonId(command.id),
      new BackofficeMultimediaSeasonTitle(command.title),
      new BackofficeMultimediaSeasonReleaseYear(command.releaseYear),
      new BackofficeMultimediaSerieId(command.serie)
    )
  }

  /**
   * Creates a random `BackofficeMultimediaSeason`.
   *
   * @returns A random instance of `BackofficeMultimediaSeason`.
   */
  public static random(): BackofficeMultimediaSeason {
    return this.create(
      BackofficeMultimediaSeasonIdMother.random(),
      BackofficeMultimediaSeasonTitleMother.random(),
      BackofficeMultimediaSeasonReleaseYearMother.random(),
      this.serie
    )
  }
}
