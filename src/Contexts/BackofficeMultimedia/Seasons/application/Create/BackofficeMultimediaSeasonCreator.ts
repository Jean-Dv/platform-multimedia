import { BackofficeMultimediaSeason } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeason'
import { type BackofficeMultimediaSeasonReleaseYear } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonReleaseYear'
import { type BackofficeMultimediaSeasonRepository } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonRepository'
import { type BackofficeMultimediaSeasonTitle } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonTitle'
import { type BackofficeMultimediaSeasonId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSeasonId'
import { type BackofficeMultimediaSerieId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSerieId'
import { type EventBus } from '@Shared/domain/EventBus'

/**
 * Service for creating backoffice multimedia seasons.
 */
export class BackofficeMultimediaSeasonCreator {
  constructor(
    private readonly repository: BackofficeMultimediaSeasonRepository,
    private readonly eventBus: EventBus
  ) {}

  /**
   * Runs the season creation process.
   *
   * @param params - Parameters for creating the season.
   * @returns A Promise that resolves when the season is successfully created and saved.
   */
  public async run(params: {
    id: BackofficeMultimediaSeasonId
    title: BackofficeMultimediaSeasonTitle
    releaseYear: BackofficeMultimediaSeasonReleaseYear
    serie: BackofficeMultimediaSerieId
  }): Promise<void> {
    const season = BackofficeMultimediaSeason.create(
      params.id,
      params.title,
      params.releaseYear,
      params.serie
    )

    await this.repository.save(season)
    await this.eventBus.publish(season.pullDomainEvents())
  }
}
