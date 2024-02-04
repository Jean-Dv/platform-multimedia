import { Season } from '@Multimedia/Season/domain/Season'
import { SeasonReleaseYear } from '@Multimedia/Season/domain/SeasonReleaseYear'
import { type SeasonRepository } from '@Multimedia/Season/domain/SeasonRepository'
import { SeasonTitle } from '@Multimedia/Season/domain/SeasonTitle'
import { SeasonId } from '@Multimedia/Shared/domain/Season/SeasonId'
import { SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'

/**
 * Service for creating a new season.
 */
export class SeasonCreator {
  constructor(private readonly repository: SeasonRepository) {}

  /**
   * Creates a new season with the provided information, saves it to the repository,
   * and publishes any domain events associated with user creation.
   *
   * @param params - The parameters needed to create the season.
   */
  public async run(
    id: string,
    serieId: string,
    title: string,
    releaseYear: number
  ): Promise<void> {
    const season = new Season(
      new SeasonId(id),
      new SerieId(serieId),
      new SeasonTitle(title),
      new SeasonReleaseYear(releaseYear)
    )
    await this.repository.save(season)
  }
}
