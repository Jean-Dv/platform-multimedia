import { Season } from '@Multimedia/Season/domain/Season'
import { type SeasonReleaseDate } from '@Multimedia/Season/domain/SeasonReleaseDate'
import { type SeasonRepository } from '@Multimedia/Season/domain/SeasonRepository'
import { type SeasonTitle } from '@Multimedia/Season/domain/SeasonTitle'
import { type SeasonId } from '@Multimedia/Shared/domain/Season/SeasonId'
import { type SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'
import { type EventBus } from '@Shared/domain/EventBus'

export class SeasonCreator {
  constructor(
    private readonly repository: SeasonRepository,
    private readonly eventBus: EventBus
  ) {}

  /**
   * Creates a new season with the provided information, saves it to the repository,
   * and publishes any domain events associated with user creation.
   *
   * @param params - The parameters needed to create the season.
   */
  public async run(params: {
    id: SeasonId
    serieId: SerieId
    title: SeasonTitle
    releaseDate: SeasonReleaseDate
  }): Promise<void> {
    const season = Season.create(
      params.id,
      params.serieId,
      params.title,
      params.releaseDate
    )
    await this.repository.save(season)
    await this.eventBus.publish(season.pullDomainEvents())
  }
}
