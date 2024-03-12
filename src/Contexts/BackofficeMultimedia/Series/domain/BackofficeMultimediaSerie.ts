import { BackofficeMultimediaSerieId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSerieId'
import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { BackofficeMultimediaSerieTitle } from './BackofficeMultimediaSerieTitle'
import { BackofficeMultimediaSerieReleaseYear } from './BackofficeMultimediaSerieReleaseYear'
import { BackofficeMultimediaSerieSynopsis } from './BackofficeMultimediaSerieSynopsis'
import { BackofficeMultimediaCategoryId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaCategoryId'
import { BackofficeMultimediaSerieCreatedDomainEvent } from './BackofficeMultimediaSerieCreatedDomainEvent'
import { BackofficeMultimediaSerieDeletedDomainEvent } from './BackofficeMultimediaSerieDeletedDomainEvent'

/**
 * BackofficeMultimediaSerie is an aggregate root representing a serie in the backoffice.
 */
export class BackofficeMultimediaSerie extends AggregateRoot {
  public readonly id: BackofficeMultimediaSerieId
  public readonly title: BackofficeMultimediaSerieTitle
  public readonly releaseYear: BackofficeMultimediaSerieReleaseYear
  public readonly synopsis: BackofficeMultimediaSerieSynopsis
  public readonly categories: BackofficeMultimediaCategoryId[] = []

  constructor(
    id: BackofficeMultimediaSerieId,
    title: BackofficeMultimediaSerieTitle,
    releaseYear: BackofficeMultimediaSerieReleaseYear,
    synopsis: BackofficeMultimediaSerieSynopsis,
    categories: BackofficeMultimediaCategoryId[]
  ) {
    super()
    this.id = id
    this.title = title
    this.releaseYear = releaseYear
    this.synopsis = synopsis
    this.categories = categories
  }

  /**
   * This method returns a new instance of the BackofficeMultimediaSerie aggregate
   * and publish domain event using the provided parameters.
   *
   * @param id - The id of the serie.
   * @param title - The title of the serie.
   * @param releaseYear - The release year of the serie.
   * @param synopsis - The synopsis of the serie.
   * @param categories - The categories of the serie.
   * @returns A new instance of the BackofficeMultimediaSerie entity and register event.
   */
  public static create(
    id: BackofficeMultimediaSerieId,
    title: BackofficeMultimediaSerieTitle,
    releaseYear: BackofficeMultimediaSerieReleaseYear,
    synopsis: BackofficeMultimediaSerieSynopsis,
    categories: BackofficeMultimediaCategoryId[]
  ): BackofficeMultimediaSerie {
    const serie = new BackofficeMultimediaSerie(
      id,
      title,
      releaseYear,
      synopsis,
      categories
    )
    serie.record(
      new BackofficeMultimediaSerieCreatedDomainEvent({
        aggregateId: serie.id.value,
        title: serie.title.value,
        releaseYear: serie.releaseYear.value,
        synopsis: serie.synopsis.value,
        categories: serie.categories.map((category) => category.value)
      })
    )
    return serie
  }

  /**
   * This method delete the current instance of the BackofficeMultimediaSerie aggregate
   */
  public delete(): void {
    this.record(
      new BackofficeMultimediaSerieDeletedDomainEvent({
        aggregateId: this.id.value
      })
    )
  }

  /**
   * Create a new BackofficeMultimediaSerie instance from primitives.
   *
   * @param plainData - The plain data to be converted to a BackofficeMultimediaSerie instance.
   * @returns A new instance of the BackofficeMultimediaSerie entity.
   */
  public static fromPrimitives(plainData: {
    id: string
    title: string
    releaseYear: number
    synopsis: string
    categories: string[]
  }): BackofficeMultimediaSerie {
    return new BackofficeMultimediaSerie(
      new BackofficeMultimediaSerieId(plainData.id),
      new BackofficeMultimediaSerieTitle(plainData.title),
      new BackofficeMultimediaSerieReleaseYear(plainData.releaseYear),
      new BackofficeMultimediaSerieSynopsis(plainData.synopsis),
      plainData.categories.map(
        (categoryId) => new BackofficeMultimediaCategoryId(categoryId)
      )
    )
  }

  /**
   * Converts the BackofficeMultimediaSerie instance to plain data.
   *
   * @returns The plain data from the BackofficeMultimediaSerie instance.
   */
  public toPrimitives(): {
    id: string
    title: string
    releaseYear: number
    synopsis: string
    categories: string[]
  } {
    return {
      id: this.id.value,
      title: this.title.value,
      releaseYear: this.releaseYear.value,
      synopsis: this.synopsis.value,
      categories: this.categories.map((category) => category.value)
    }
  }
}
