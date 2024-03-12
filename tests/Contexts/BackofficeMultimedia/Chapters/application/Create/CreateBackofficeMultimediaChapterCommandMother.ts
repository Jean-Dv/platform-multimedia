import { BackofficeMultimediaSeasonIdMother } from './../../../Shared/domain/BackofficeMultimediaSeasonIdMother'
import { type CreateBackofficeMultimediaChapterCommand } from '@BackofficeMultimedia/Chapters/application/Create/CreateBackofficeMultimediaChapterCommand'
import { type BackofficeMultimediaChapterId } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterId'
import { type BackofficeMultimediaChapterTitle } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterTitle'
import { type BackofficeMultimediaChapterReleaseYear } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterReleaseYear'
import { type BackofficeMultimediaSeasonId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSeasonId'
import { type BackofficeMultimediaVideoId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaVideoId'
import { BackofficeMultimediaChapterIdMother } from '../../domain/BackofficeMultimediaChapterIdMother'
import { BackofficeMultimediaChapterTitleMother } from '../../domain/BackofficeMultimediaChapterTitleMother'
import { BackofficeMultimediaChapterReleaseYearMother } from '../../domain/BackofficeMultimediaChapterReleaseYearMother'
import { BackofficeMultimediaVideoIdMother } from '../../../Shared/domain/BackofficeMultimediaVideoIdMother'

/**
 * Utility class for creating `CreateBackofficeMultimediaChapterCommand` instances for testing.
 */
export class CreateBackofficeMultimediaChapterCommandMother {
  public static season: BackofficeMultimediaSeasonId

  /**
   * Creates a valid `CreateBackofficeMultimediaChapterCommand`.
   *
   * @param id - The ID for the command.
   * @param title - The title for the command.
   * @param releaseYear - The release year for the command.
   * @param season - The season for the command.
   * @param video - The video for the command.
   * @returns A valid command.
   */
  public static create(
    id: BackofficeMultimediaChapterId,
    title: BackofficeMultimediaChapterTitle,
    releaseYear: BackofficeMultimediaChapterReleaseYear,
    season: BackofficeMultimediaSeasonId,
    video: BackofficeMultimediaVideoId
  ): CreateBackofficeMultimediaChapterCommand {
    return {
      id: id.value,
      title: title.value,
      releaseYear: releaseYear.value,
      season: season.value,
      video: video.value
    }
  }

  /**
   * Creates a random valid `CreateBackofficeMultimediaChapterCommand`.
   *
   * @returns A random valid command.
   */
  public static random(): CreateBackofficeMultimediaChapterCommand {
    return this.create(
      BackofficeMultimediaChapterIdMother.random(),
      BackofficeMultimediaChapterTitleMother.random(),
      BackofficeMultimediaChapterReleaseYearMother.random(),
      this.season,
      BackofficeMultimediaVideoIdMother.random()
    )
  }

  /**
   * Creates an invalid `CreateBackofficeMultimediaChapterCommand` with an invalid title.
   *
   * @returns A invalid command.
   */
  public static invalidTitle(): CreateBackofficeMultimediaChapterCommand {
    return {
      id: BackofficeMultimediaChapterIdMother.random().value,
      title: BackofficeMultimediaChapterTitleMother.invalid(),
      releaseYear: BackofficeMultimediaChapterReleaseYearMother.random().value,
      season: this.season.value,
      video: BackofficeMultimediaVideoIdMother.random().value
    }
  }

  /**
   * Creates an invalid `CreateBackofficeMultimediaChapterCommand` with an invalid release year.
   *
   * @returns A invalid command.
   */
  public static invalidReleaseYear(): CreateBackofficeMultimediaChapterCommand {
    return {
      id: BackofficeMultimediaChapterIdMother.random().value,
      title: BackofficeMultimediaChapterTitleMother.random().value,
      releaseYear: BackofficeMultimediaChapterReleaseYearMother.invalid(),
      season: this.season.value,
      video: BackofficeMultimediaVideoIdMother.random().value
    }
  }

  /**
   * Creates an invalid `CreateBackofficeMultimediaChapterCommand` with an invalid season.
   *
   * @returns A invalid command.
   */
  public static invalidSeason(): CreateBackofficeMultimediaChapterCommand {
    return {
      id: BackofficeMultimediaChapterIdMother.random().value,
      title: BackofficeMultimediaChapterTitleMother.random().value,
      releaseYear: BackofficeMultimediaChapterReleaseYearMother.random().value,
      season: BackofficeMultimediaSeasonIdMother.random().value,
      video: BackofficeMultimediaVideoIdMother.random().value
    }
  }
}
