import { type CreateBackofficeMultimediaChapterCommand } from '@BackofficeMultimedia/Chapters/application/Create/CreateBackofficeMultimediaChapterCommand'
import { BackofficeMultimediaChapter } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapter'
import { BackofficeMultimediaChapterId } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterId'
import { BackofficeMultimediaChapterReleaseYear } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterReleaseYear'
import { BackofficeMultimediaChapterTitle } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterTitle'
import { BackofficeMultimediaSeasonId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSeasonId'
import { BackofficeMultimediaVideoId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaVideoId'
import { BackofficeMultimediaChapterIdMother } from './BackofficeMultimediaChapterIdMother'
import { BackofficeMultimediaChapterTitleMother } from './BackofficeMultimediaChapterTitleMother'
import { BackofficeMultimediaChapterReleaseYearMother } from './BackofficeMultimediaChapterReleaseYearMother'
import { BackofficeMultimediaVideoIdMother } from '../../Shared/domain/BackofficeMultimediaVideoIdMother'

/**
 * Factory class for creating instances of `BackofficeMultimediaChapter` for testing.
 */
export class BackofficeMultimediaChapterMother {
  public static season: BackofficeMultimediaSeasonId

  /**
   * Creates a `BackofficeMultimediaChapter` with the specified values.
   *
   * @param id - The ID to be used for creating the instance.
   * @param title - The title to be used for creating the instance.
   * @param releaseYear - The release year to be used for creating the instance.
   * @param season - The season to be used for creating the instance.
   * @param video - The video to be used for creating the instance.
   * @returns An instance of `BackofficeMultimediaChapter`.
   */
  public static create(
    id: BackofficeMultimediaChapterId,
    title: BackofficeMultimediaChapterTitle,
    releaseYear: BackofficeMultimediaChapterReleaseYear,
    season: BackofficeMultimediaSeasonId,
    video: BackofficeMultimediaVideoId
  ): BackofficeMultimediaChapter {
    return new BackofficeMultimediaChapter(
      id,
      title,
      releaseYear,
      season,
      video
    )
  }

  /**
   * Creates a `BackofficeMultimediaChapter` with the specified command.
   *
   * @param command - The command to be used for creating the instance.
   * @returns An instance of `BackofficeMultimediaChapter`.
   */
  public static from(
    command: CreateBackofficeMultimediaChapterCommand
  ): BackofficeMultimediaChapter {
    return this.create(
      new BackofficeMultimediaChapterId(command.id),
      new BackofficeMultimediaChapterTitle(command.title),
      new BackofficeMultimediaChapterReleaseYear(command.releaseYear),
      new BackofficeMultimediaSeasonId(command.season),
      new BackofficeMultimediaVideoId(command.video)
    )
  }

  /**
   * Creates a random `BackofficeMultimediaChapter`.
   *
   * @returns A random instance of `BackofficeMultimediaChapter`.
   */
  public static random(): BackofficeMultimediaChapter {
    return this.create(
      BackofficeMultimediaChapterIdMother.random(),
      BackofficeMultimediaChapterTitleMother.random(),
      BackofficeMultimediaChapterReleaseYearMother.random(),
      this.season,
      BackofficeMultimediaVideoIdMother.random()
    )
  }
}
