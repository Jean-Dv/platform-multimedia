import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { SeasonId } from '../../Shared/domain/Season/SeasonId'
import { SeasonReleaseYear } from './SeasonReleaseYear'
import { SeasonTitle } from './SeasonTitle'
import { SerieId } from '../../Shared/domain/Serie/SerieId'

/**
 * Represents a season aggregate root entity.
 */
export class Season extends AggregateRoot {
  public readonly id: SeasonId
  public readonly serieId: SerieId
  public readonly title: SeasonTitle
  public readonly releaseYear: SeasonReleaseYear

  constructor(
    id: SeasonId,
    serieId: SerieId,
    title: SeasonTitle,
    releaseYear: SeasonReleaseYear
  ) {
    super()
    this.id = id
    this.serieId = serieId
    this.title = title
    this.releaseYear = releaseYear
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
    releaseYear: number
  }): Season {
    return new Season(
      new SeasonId(plainData.id),
      new SerieId(plainData.serieId),
      new SeasonTitle(plainData.title),
      new SeasonReleaseYear(plainData.releaseYear)
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
    releaseYear: number
  } {
    return {
      id: this.id.value,
      serieId: this.serieId.value,
      title: this.title.value,
      releaseYear: this.releaseYear.value
    }
  }
}
