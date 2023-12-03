import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { SeasonId } from '../../Shared/domain/Season/SeasonId'
import { SeasonReleaseDate } from './SeasonReleaseDate'
import { SeasonTitle } from './SeasonTitle'
import { SerieId } from '../../Shared/domain/Serie/SerieId'
import { SeasonCreatedDomainEvent } from './SeasonCreatedDomainEvent'

/**
 * Represents a season aggregate root entity.
 */
export class Season extends AggregateRoot {
  public readonly id: SeasonId
  public readonly serieId: SerieId
  public readonly title: SeasonTitle
  public readonly releaseDate: SeasonReleaseDate

  constructor(
    id: SeasonId,
    serieId: SerieId,
    title: SeasonTitle,
    releaseDate: SeasonReleaseDate
  ) {
    super()
    this.id = id
    this.serieId = serieId
    this.title = title
    this.releaseDate = releaseDate
  }

  /**
   * Creates a new Season instance with the provided information
   * and publishes a SeasonCreatedDomainEvent.
   *
   * @param id - The id of the season.
   * @param serieId - The id of the serie.
   * @param title - The name of the season.
   * @param releaseDate - The release date of the season.
   * @returns A new Season instance.
   */
  public static create(
    id: SeasonId,
    serieId: SerieId,
    title: SeasonTitle,
    releaseDate: SeasonReleaseDate
  ): Season {
    const season = new Season(id, serieId, title, releaseDate)
    season.record(
      new SeasonCreatedDomainEvent({
        aggregateId: id.value,
        serieId: serieId.value,
        title: title.value,
        releaseDate: releaseDate.value
      })
    )
    return season
  }

  /**
   * Create a new Season from primitives.
   *
   * @param plainData - The plain object containing the season information.
   * @returns A new Season instance.
   */
  public static fromPrimitives(plainData: {
    id: string
    serieId: string
    title: string
    releaseDate: Date
  }): Season {
    return new Season(
      new SeasonId(plainData.id),
      new SerieId(plainData.serieId),
      new SeasonTitle(plainData.title),
      new SeasonReleaseDate(plainData.releaseDate)
    )
  }

  /**
   * Convert the season to primitive values.
   *
   * @returns The plain object with the season information.
   */
  public toPrimitives(): {
    id: string
    serieId: string
    title: string
    releaseDate: Date
  } {
    return {
      id: this.id.value,
      serieId: this.serieId.value,
      title: this.title.value,
      releaseDate: this.releaseDate.value
    }
  }
}
