import { BackofficeMultimediaSeasonId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSeasonId'
import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { BackofficeMultimediaSeasonTitle } from './BackofficeMultimediaSeasonTitle'
import { BackofficeMultimediaSeasonReleaseYear } from './BackofficeMultimediaSeasonReleaseYear'
import { BackofficeMultimediaSerieId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSerieId'
import { BackofficeMultimediaSeasonCreatedDomainEvent } from './BackofficeMultimediaSeasonCreatedDomainEvent'

/**
 * BackofficeMultimediaSeason is an aggregate root representing a season in the backoffice.
 */
export class BackofficeMultimediaSeason extends AggregateRoot {
  public readonly id: BackofficeMultimediaSeasonId
  public readonly title: BackofficeMultimediaSeasonTitle
  public readonly releaseYear: BackofficeMultimediaSeasonReleaseYear
  public readonly serie: BackofficeMultimediaSeasonId

  constructor(
    id: BackofficeMultimediaSeasonId,
    title: BackofficeMultimediaSeasonTitle,
    releaseYear: BackofficeMultimediaSeasonReleaseYear,
    serie: BackofficeMultimediaSerieId
  ) {
    super()
    this.id = id
    this.title = title
    this.releaseYear = releaseYear
    this.serie = serie
  }

  /**
   * This method returns a new instance of the BackofficeMultimediaSeason aggregate
   * and publish domain event using the provided parameters.
   *
   * @param id - The id of the season.
   * @param title - The title of the season.
   * @param releaseYear - The release year of the season.
   * @param serie - The serie of the season.
   * @returns A new instance of the BackofficeMultimediaSeason entity and register event.
   */
  public static create(
    id: BackofficeMultimediaSeasonId,
    title: BackofficeMultimediaSeasonTitle,
    releaseYear: BackofficeMultimediaSeasonReleaseYear,
    serie: BackofficeMultimediaSerieId
  ): BackofficeMultimediaSeason {
    const season = new BackofficeMultimediaSeason(id, title, releaseYear, serie)
    season.record(
      new BackofficeMultimediaSeasonCreatedDomainEvent({
        aggregateId: season.id.value,
        title: season.title.value,
        releaseYear: season.releaseYear.value,
        serie: season.serie.value
      })
    )
    return season
  }

  /**
   * Create a new Backoffice season from primitives.
   *
   * @param plainData - The plain data to be converted to a season.
   * @returns A new instance of the season.
   */
  public static fromPrimitives(plainData: {
    id: string
    title: string
    releaseYear: number
    serie: string
  }): BackofficeMultimediaSeason {
    return new BackofficeMultimediaSeason(
      new BackofficeMultimediaSeasonId(plainData.id),
      new BackofficeMultimediaSeasonTitle(plainData.title),
      new BackofficeMultimediaSeasonReleaseYear(plainData.releaseYear),
      new BackofficeMultimediaSerieId(plainData.serie)
    )
  }

  /**
   * Convert the season to plain data.
   *
   * @returns The plain data of the season.
   */
  public toPrimitives(): {
    id: string
    title: string
    releaseYear: number
    serie: string
  } {
    return {
      id: this.id.value,
      title: this.title.value,
      releaseYear: this.releaseYear.value,
      serie: this.serie.value
    }
  }
}
